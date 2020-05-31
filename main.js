// keys 



var dataManager;
var savedFileEntry, fileDisplayPath;

var maxPPTId = 0;

var selectedPPTId = 0;
 
var bp = null; 

var dataCreator = new DataCreator();
var divCreator = new DivCreator();

chrome.runtime.getBackgroundPage(function (backgroundPage) {
//     console.log(backgroundPage.cow); // Displays "mooh".
   console.log("retrieving background page");
   bp = backgroundPage;	
   dataManager = backgroundPage.dataManager;
	if(dataManager.data.length>0)
	{
   selectedPPTId = dataManager.data[0].id; 
	}
   createNoteManager(dataManager.data);
});

window.onload = function() 
{

	document.getElementById("importjson").addEventListener("click", importFile);
	document.getElementById("exportjson").addEventListener("click", save);
	document.getElementById("addppt").addEventListener("click", addToManagerClickListener);
	document.getElementById("addNote").addEventListener("click", addNote);
};

function updateUI()
{	

	createNoteManager(dataManager.data);
		
}

function importFile() {
	chrome.fileSystem.chooseEntry({
		type : 'openFile',
		accepts : [ {
			extensions : [ 'txt' ]
		} ]
	}, function(fileEntry) {
		if (!fileEntry) {
			showStatus("User did not choose a file");
			return;
		}
		fileEntry.file(function(file) {
			var reader = new FileReader();

			reader.onload = function(e) {
				var e = JSON.parse(e.target.result);
				dataManager.mergePPT(maxPPTId, e.noteManagerDB);
				createNoteManager(dataManager.data);
				bp.saveTOLocalDB()
			};
			reader.readAsText(file);
		});
	});

}

chrome.app.window.onClosed.addListener(function ()
{
      	window = null;
});
 




function exportPPT() {
	console.log("hi");
}

function reload()
{
	createNoteManager(dataManager.data);
}



function showStatus(text) {
	var div = document.getElementById("status");
	div.innerText = text;
}

function save() {

	if (savedFileEntry) {

		exportToFileEntry(savedFileEntry);

	} else {

		chrome.fileSystem.chooseEntry({
			type : 'saveFile',
			suggestedName : 'backup.txt',
			accepts : [ {
				description : 'Text files (*.txt)',
				extensions : [ 'txt' ]
			} ],
			acceptsAllTypes : true
		}, exportToFileEntry);

	}
}

function pptClicked(event) {
	

	var srcDiv = event.srcElement;
	selectedPPTId = srcDiv.getAttribute("id");
	if(!isNaN(selectedPPTId))
	{
	var pptData = dataManager.getPPTById(selectedPPTId);
	
	createNoteDisplayUI(pptData.notes);
	}
}

function addPPTToManager(data)
{
	++bp.maxPPTId;
	var ppt = dataCreator.createPPTStructure(bp.maxPPTId, data.text,data);		
  	dataManager.addPPT(ppt.id,ppt);
  	createNoteManager(dataManager.data);

}



function addToManagerClickListener()
{
  createPop("Add PPT", addPPTToManager, {});	
}

function getTodosAsText(callback) {
	chrome.storage.local.get(function(storedData) {
		var text = JSON.stringify(storedData);
		callback(text);

	}.bind(this));
}

function createPop(title, listener, data)
{
	var popdiv =document.getElementById("pop");
	var titleDiv   = getChildComponent(popdiv, "div", "id", "title");
	var input = getChildComponent(popdiv, "input", "id", "popInput");
	var okBtn  = getChildComponent(popdiv, "button", "id", "okBtn");
	var cancelBtn  = getChildComponent(popdiv, "button", "id", "cancelBtn");
	
	if(data.type == "edit")
	{
		
		input.value = data.text;
	}else
	{
		input.value ="";
	}
	titleDiv.innerHtml = title;
	titleDiv.textContent = title;
	var okBtnListener = function(event)
	{
		var src = event.srcElement;
		var parentDiv = getParentDiv(src, "id", "pop");
		var input = getChildComponent(parentDiv, "input", "id", "popInput");
		
		data["text"] = input.value;
		document.body.removeChild(dimmer);   
		popdiv.style.visibility = 'hidden';
		listener(data);
		okBtn.removeEventListener("click", okBtnListener);


	}

	var cancellistener = function(event){
		
		document.body.removeChild(dimmer);   
		popdiv.style.visibility = 'hidden';
	}; 
	
	okBtn.addEventListener("click", okBtnListener);
	cancelBtn.addEventListener("click", cancellistener);
	
    dimmer = document.createElement("div");
    
    dimmer.style.width =  window.innerWidth + 'px';
    dimmer.style.height = window.innerHeight + 'px';
    dimmer.className = 'dimmer';
    
    
    dimmer.onclick = cancellistener;
        
    document.body.appendChild(dimmer);

    popdiv.style.visibility = 'visible';
    popdiv.style.top = window.innerHeight/2 - 50 + 'px';
    popdiv.style.left = window.innerWidth/2 - 100 + 'px';
}


function exportToFileEntry(fileEntry) {
	savedFileEntry = fileEntry;

	var status = document.getElementById('status');

	// Use this to get a file path appropriate for displaying
	chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
		fileDisplayPath = path;
		status.innerText = 'Exporting to ' + path;
	});

	getTodosAsText(function(contents) {

		fileEntry.createWriter(function(fileWriter) {

			var truncated = false;
			var blob = new Blob([ contents ]);

			fileWriter.onwriteend = function(e) {
				if (!truncated) {
					truncated = true;
					// You need to explicitly set the file size to truncate
					// any content that might have been there before
					this.truncate(blob.size);
					return;
				}
				status.innerText = 'Export to ' + fileDisplayPath
						+ ' completed';
			};

			fileWriter.onerror = function(e) {
				status.innerText = 'Export failed: ' + e.toString();
			};

			fileWriter.write(blob);

		});
	});
}




// shoulld come from notefunction.js





function addNote()
{
	createPop("Add Note", submitNote,{})
}

function submitNote(data)
{
	var notesDiv = document.getElementById("notes");
    // creating id
   
    var pptData = dataManager.getPPTById(selectedPPTId);
    var noteId = ++(pptData.maxNoteId);

    var currentNote = dataCreator.createNoteStructure(noteId, data.title, data);
   	dataManager.addNoteToPPT(selectedPPTId, currentNote)
   
    
    var innerDiv = divCreator.createNoteDiv(noteId, data.title);
    var addPointBtn =    getChildComponent(innerDiv, "img", "id", "addpoint");
	var addCloseBtn =    getChildComponent(innerDiv, "img", "id", "close");

	addCloseBtn.addEventListener("click",deleteOperation)  
	addPointBtn.addEventListener("click",addPoint);
    notesDiv.appendChild(innerDiv);

    bp.saveTOLocalDB();

}

function addPoint(evnt)
{
   createPop("Add Point", submitPoint, {"event":evnt});
}

function submitPoint(data)
{
	 	var btn = data.event.srcElement;
	    var noteDiv = getParentDiv(btn, "class", "note");
	    var pointWrapper = getChildComponent(noteDiv, "div", "class", "pointsWrapperClass");
	    var notesDiv = noteDiv;
	    // creating id
	     

	    var pptData = dataManager.getPPTById(selectedPPTId);
	    var noteData = dataManager.getNotesById(noteDiv.id,selectedPPTId);           
	    var pointId = ++(noteData.maxPointId);
	    var pointData = dataCreator.createPointStructure(pointId, noteDiv.id, data);
		// updating ui	
	   
	    var innerDiv = divcreator.createPointsDiv(pointId, data.title);
		noteData.points.push(pointData);
	    pointWrapper.appendChild(innerDiv);
		
		// saving 
		bp.saveTOLocalDB();
}
