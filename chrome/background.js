


function saveLeadsToCSV() {


  document.addEventListener("DOMContentLoaded", function(){

    alert("dom");
    let intervalId;
    let container = document.getElementById("search-results-container");
    
    function scrollDown() {
      if (container.scrollHeight - container.scrollTop <= container.offsetHeight) {
        clearInterval(intervalId);
      } else {
        container.scrollBy(0, 10); // Scroll down by 10 pixels each time
      }
    }
    
    intervalId = setInterval(scrollDown, 50); // Start the scrolling
  
  });
  
  photos = document.querySelectorAll("[data-anonymize='headshot-photo']");
  lead_panels = document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']");
  person_names = document.querySelectorAll("span[data-anonymize='person-name']");
  spans = document.querySelectorAll("span[style='display: inline;']");
  job_titles = document.querySelectorAll("[data-anonymize='job-title']");
  locations = document.querySelectorAll("[data-anonymize='location']");
  titles = document.querySelectorAll("[data-anonymize='title']");

  


  for (i = 0; i < person_names.length; i++) {
    try{
      if ((photos[i]!=undefined) && (lead_panels[i]!=undefined) && (person_names[i]!=undefined) && (spans[i]!=undefined) && (job_titles[i]!=undefined) && (locations[i]!=undefined)&& (titles[i]!=undefined)){ 
        photo = photos[i].innerText;
        lead_panel = lead_panels[i].innerText;
        person_name = person_names[i].innerText;
        span = spans[i].innerText;
        job_title = job_titles[i].innerText;
        location = locations[i].innerText;
        title = titles[i].innerText;
        
        line = photo + ',' + lead_panel + ',' + person_name + ',' + span + ',' + job_title + ',' + location + ',' + title + '\n';
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/?line=" +line, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
          }
        };
        xhr.send(stringValue);


        // Write the modified text
        fileWriter.write(line);
        alert("Hola locao : " + line);
      }
    }
    catch (TypeError) {
      alert("Error ");
    }
    
  
  }
  document.querySelector("#ember130 > span").click();


}



chrome.action.onClicked.addListener((tab) => {
  if(!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: saveLeadsToCSV
    });
  }
});


