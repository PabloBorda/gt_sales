chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "runOnPage") {

    console.log("execute runOnPage ");

    


    let tab = message.tab.id;

    chrome.scripting.executeScript({
      target: {tabId: tab},
      function: () => {

        let intervalId;
        function scrollDown() {
          let container = document.getElementById("search-results-container"); 
          if (container.scrollHeight - container.scrollTop <= container.offsetHeight) {
            clearInterval(intervalId);
          } else {
            container.scrollBy(0, 10); // Scroll down by 10 pixels each time
          }
        }
        
        
        setTimeout(function() {
        
          intervalId = setInterval(scrollDown, 50); // Start the scrolling
        }, 3000); // Wait for 3 seconds after the page has loaded
        
        console.log("get_all_values");
        let container = document.getElementById("search-results-container");  
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
            console.log("Error ");
            console.log("FIELD: "+photo);
            console.log("FIELD: "+lead_panel);
            console.log("FIELD: "+person_name);
            console.log("FIELD: "+span);
            console.log("FIELD: "+job_title);
            console.log("FIELD: "+location);
            console.log("FIELD: "+title);
          }
        }
      
        var nextButton = document.getElementById("ember1540");
        nextButton.click();
        // Get the inner HTML code
        var html = document.documentElement.innerHTML;
        console.log(html);
      }
    });

}
  
}); 