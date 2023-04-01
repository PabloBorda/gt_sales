

function runOnPage(tab) {
  function saveLeadsToCSV() {

    alert("savwLead");
    let intervalId;
    let container = document.getElementById("search-results-container");

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
    var photos = document.querySelectorAll("[data-anonymize='headshot-photo']");
    var lead_panels = document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']");
    var person_names = document.querySelectorAll("span[data-anonymize='person-name']");
    var spans = document.querySelectorAll("span[style='display: inline;']");
    var job_titles = document.querySelectorAll("[data-anonymize='job-title']");
    var locations = document.querySelectorAll("[data-anonymize='location']");
    var titles = document.querySelectorAll("[data-anonymize='title']");


    for (i = 0; i < person_names.length; i++) {
      try{
        if ((photos[i]!=undefined) && (lead_panels[i]!=undefined) && (person_names[i]!=undefined) && (spans[i]!=undefined) && (job_titles[i]!=undefined) && (locations[i]!=undefined)&& (titles[i]!=undefined)){ 
          var photo = photos[i].src;
          var lead_panel = lead_panels[i].innerText;
          var person_name = person_names[i].innerText;
          var span = spans[i].innerText;
          var job_title = job_titles[i].innerText;
          var location = locations[i].innerText;
          var title = titles[i].outerText;
          
          var line = photo + ',' + lead_panel + ',' + person_name + ',' + span + ',' + job_title + ',' + location + ',' + title + '\n';
          alert(line);
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "http://127.0.0.1:8080/index?line=" + encodeURIComponent(line), true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              console.log(xhr.innerText);
            }
         

          };
          xhr.send(line);
        }
      }
      catch (TypeError) {
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
    document.querySelector("#ember130 > span").click();
  }

chrome.runtime.getBackgroundPage(function(backgroundPage) {
  backgroundPage.chrome.tabs.executeScript({
    code: '(' + saveLeadsToCSV + ')();'
  });
});

}




// Call the runOnPage function when the active tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    runOnPage(tab);
  });
});
