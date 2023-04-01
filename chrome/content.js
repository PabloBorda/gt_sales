
    



  function attach_event_listeners(){
    // Save selectors to cookies
    // document.getElementById("saveButton").addEventListener("click", function() {
    //   console.log("saved");
    //   var selectors = document.getElementById("selectors").value;
    //   chrome.cookies.set({
    //     name: "selectors",
    //     value: selectors
    //   });
    //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //     chrome.runtime.sendMessage({ action: "saveButton", tab: tabs[0] });
    //   });
    // });

    // // Clear selectors from cookies and text area
    // document.getElementById("clearButton").addEventListener("click", function() {
    //   console.log("clear");
    //   document.getElementById("selectors").value = "";
    //   chrome.cookies.remove({
    //     name: "selectors"
    //   });
    //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //     chrome.runtime.sendMessage({ action: "clearButton", tab: tabs[0] });
    //   });
    // });

    // Start button logic
    document.getElementById("startButton").addEventListener("click", function() {
      console.log("start");
      this.style.backgroundColor = "#f44336";
      this.innerHTML = "Stop";

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.runtime.sendMessage({ action: "runOnPage", tab: tabs[0] });
      });
      

    });
}



document.addEventListener("DOMContentLoaded", function() {
  console.log("DOMContentLoaded");
 
 //document.getElementById("selectors").value =  chrome.cookies.getAll({name:"selectors"});
  


  attach_event_listeners();
});


  





/*
    let photos = document.querySelectorAll("[data-anonymize='headshot-photo']");
    let lead_panels = document.querySelectorAll("[data-control-name='view_lead_panel_via_search_lead_name']");
    let person_names = document.querySelectorAll("span[data-anonymize='person-name']");
    let spans = document.querySelectorAll("span[style='display: inline;']");
    let job_titles = document.querySelectorAll("[data-anonymize='job-title']");
    let locations = document.querySelectorAll("[data-anonymize='location']");
    let titles = document.querySelectorAll("[data-anonymize='title']");


[data-anonymize='headshot-photo']
[data-control-name='view_lead_panel_via_search_lead_name']
span[data-anonymize='person-name']
span[style='display: inline;']
[data-anonymize='job-title']
[data-anonymize='location']
[data-anonymize='title']

*/