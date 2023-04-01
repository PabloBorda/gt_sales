chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "runOnPage") {
    let tab = message.tab.id;

    chrome.scripting.executeScript({
      target: {tabId: tab},
      function: async () => {
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function scrollDown() {
          let container = document.getElementById("search-results-container");
          if (container.scrollHeight - container.scrollTop <= container.offsetHeight) {
            clearInterval(intervalId);
          } else {
            container.scrollBy(0, 10); // Scroll down by 10 pixels each time
          }
        }

        console.log("get_all_values");

        // Wait for the search results to load
        while (document.querySelector(".search-results__loading-area")) {
          await sleep(5000);
        }
        await sleep(3000);

        let currentPage = 1;
        let totalPages = 1;

        // Get the total number of pages
        let pageLinks = document.querySelectorAll(".artdeco-pagination__pages .artdeco-pagination__indicator");
        if (pageLinks.length > 0) {
          totalPages = parseInt(pageLinks[pageLinks.length - 1].innerText);
        }

        let results = [];

        // Loop through all pages
        while (currentPage <= totalPages) {


          function wait_until_new_content(){
            return new Promise(resolve => {
              let container = document.getElementById("search-results-container");
              let observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                  if (mutation.addedNodes.length > 0) {
                    observer.disconnect();
                    resolve();
                  }
                });
              });
              observer.observe(container, { childList: true });
            });
          } 

          wait_until_new_content().then(result=>{ scrollDown()} ).catch(error=>alert("Erros scrollDown not working"));


          // Extract data from the search results on this page
          let photos = document.querySelectorAll("[data-anonymize='headshot-photo']");
          let leadPanels = document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']");
          let personNames = document.querySelectorAll("span[data-anonymize='person-name']");
          let titles = document.querySelectorAll("[data-anonymize='title']");
          let jobTitles = document.querySelectorAll("[data-anonymize='job-title']");
          let locations = document.querySelectorAll("[data-anonymize='location']");

          // Merge data from multiple arrays into a single array of objects
          for (let i = 0; i < personNames.length; i++) {
            let result = {
              photo: photos[i].getAttribute("src"),
              leadPanel: leadPanels[i].getAttribute("href"),
              name: personNames[i].innerText,
              title: titles[i].innerText,
              jobTitle: jobTitles[i].innerText,
              location: locations[i].innerText
            };
            console.log(JSON.stringify(result));

            let line = JSON.stringify(result) + "\n";


            let xhr = new XMLHttpRequest();
            xhr.open("GET", "http://127.0.0.1:8080/index?line=" + encodeURIComponent(line), true);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(xhr.innerText);
              }
            };
            xhr.send();



            console.log(JSON.stringify(result)); // Log each object obtained
            results.push(result);
          }

          // sleep randomly in between 2 and 8 seconds not to get blocked

          setTimeout(() => console.log(`Slept for ${Math.floor(Math.random() * 6000) + 2000} milliseconds`), Math.floor(Math.random() * 6000) + 2000);


          // Navigate to the next page
          let nextPageButton = document.querySelector(".artdeco-pagination__button--next");
          if (nextPageButton) {
            let nextPageLoading = document.querySelector(".next-text-loading");
            if (!nextPageLoading) {
              await nextPageButton.click();
              currentPage++;
              // Wait for the next page to load
              while (document.querySelector(".search-results__loading-area")) {
                await sleep(5000);
              }
              await sleep(3000);
            }
          } else {
            break; // No more pages
          }
        }

        // Send the results back to the extension
        chrome.runtime.sendMessage({action: "gotAllValues", values: results});
      }
    });
  }
});
