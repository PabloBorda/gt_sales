function runOnPage(tab) {
  function saveLeadsToCSV() {
    let container = document.getElementById("search-results-container");
    let intervalId;

    function scrollDown() {
      if (container.scrollHeight - container.scrollTop <= container.offsetHeight) {
        clearInterval(intervalId);
      } else {
        container.scrollBy(0, 10); // Scroll down by 10 pixels each time
      }
    }

    setTimeout(function() {
      intervalId = setInterval(scrollDown, 50); // Start the scrolling
    }, 3000); // Wait for 3 seconds after the page has loaded

    // Your code for saving leads to CSV
    let photos = document.querySelectorAll("[data-anonymize='headshot-photo']");
    let lead_panels = document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']");
    let person_names = document.querySelectorAll("span[data-anonymize='person-name']");
    let spans = document.querySelectorAll("span[style='display: inline;']");
    let job_titles = document.querySelectorAll("[data-anonymize='job-title']");
    let locations = document.querySelectorAll("[data-anonymize='location']");
    let titles = document.querySelectorAll("[data-anonymize='title']");

    for (let i = 0; i < person_names.length; i++) {
      try {
        if (photos[i] && lead_panels[i] && person_names[i] && spans[i] && job_titles[i] && locations[i] && titles[i]) {
          let photo = photos[i].src;
          let lead_panel = lead_panels[i].innerText;
          let person_name = person_names[i].innerText;
          let span = spans[i].innerText;
          let job_title = job_titles[i].innerText;
          let location = locations[i].innerText;
          let title = titles[i].outerText;

          let line = photo + ',' + lead_panel + ',' + person_name + ',' + span + ',' + job_title + ',' + location + ',' + title + '\n';

          let xhr = new XMLHttpRequest();
          xhr.open("GET", "http://127.0.0.1:8080/index?line=" + encodeURIComponent(line), true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              console.log(xhr.innerText);
            }
          };
          xhr.send();
       

        }
      } catch (TypeError) {
        alert("Error ");
        alert("FIELD: "+photo);
        alert("FIELD: "+lead_panel);
        alert("FIELD: "+person_name);
        alert("FIELD: "+span);
        alert("FIELD: "+job_title);
        alert("FIELD: "+location);
        alert("FIELD: "+title);
      }
        }
      } 
    }
    document.querySelector("#ember130 > span").click();


  chrome.runtime.getBackgroundPage(function(backgroundPage) {
    backgroundPage.chrome.tabs.executeScript({
      code: '(' + saveLeadsToCSV + ')();'
    });
  });



// Call the runOnPage function when the active tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    runOnPage(tab);
  });
});
