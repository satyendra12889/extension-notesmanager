/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */


// TO Do 
// implement data with websql 
// implement data fetching and syncing with web sql 




var localWindow = null;
var contentWindow = null;
var maxPPTId = 0;

var published = "lbgkaekedicjcffidghkgjmllnddkjgh";
var develop = "omlkohdflcenkmcjmbhgemcpcpjkfefk";

var dataManager;
var noteManagerDB = "noteManagerDB";


var noteExtensionId = published;



chrome.runtime.onStartup.addListener(function(){
	console.log("on startup");

	
});

chrome.runtime.onInstalled.addListener(function()
{
	console.log("on install");
	

	
});


chrome.runtime.onSuspendCanceled.addListener(function()
{
	console.log("on suspend canceled");
});


chrome.runtime.onUpdateAvailable.addListener(function(){
	console.log("on update available");
})



chrome.app.runtime.onLaunched.addListener(function(launchData) {

	 chrome.app.window.create(
    'index.html',
    {
      id: 'mainWindow',
      bounds: {width: 800, height: 600}
    },
    function (myWindow) {
      localWindow = myWindow;
      contentWindow = localWindow.contentWindow;
     
      chrome.app.window.onClosed.addListener(function ()
       {
       	localWindow = null;
       	contentWindow = null;
       });
       });
});


chrome.runtime.onMessageExternal.addListener(function(request, sender,
		sendResponse) {

	if (sender.id == noteExtensionId) {

		var pptId = ++maxPPTId;
		request.title.id = pptId;
		dataManager.addPPT(pptId, request.title, 0);
		dataManager.resetWithData(dataManager.data);
		if(contentWindow)
		contentWindow.updateUI();
		
		saveTOLocalDB();
		sendResponse("success");
	}
});


chrome.runtime.onSuspend.addListener(function() {
  // Do some simple clean-up tasks.

	localWindow = null;
	contentWindow = null;
  console.log("suspended");
});


function saveTOLocalDB() {
	chrome.storage.local.set({
		noteManagerDB : dataManager.data,
		"maxPPTId" : maxPPTId
	}, function() {
		// Notify that we saved.
// 		showStatus('Settings saved');
	});
}

function getDataFromLocalDB() {
	
	chrome.storage.local.get(function(items) {
		// Notify that we saved.
		if (items[noteManagerDB]) 
		{
			maxPPTId = isNaN(items["maxPPTId"]) ? 0 : items["maxPPTId"];
			dataManager.resetWithData(items[noteManagerDB]);
// 			
		}

// 		showStatus('Fetched Data');
	});
}
dataManager = new DataManipulator(notePadData);

getDataFromLocalDB();
