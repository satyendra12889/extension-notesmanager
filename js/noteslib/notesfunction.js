
// var b = chrome.extension.getBackgroundPage();


// document.getElementById("addnote").addEventListener("click",addNote);

// var laserExtensionId = "mmjiehdfjnepfifmfdnmadmmcbccbfdb";

// // Make a simple request:
// chrome.runtime.sendMessage(laserExtensionId, {getTargetData: true},
//   function(response) {
//     if (targetInRange(response.targetData))
//       chrome.runtime.sendMessage(laserExtensionId, {activateLasers: true});
//   });


var divcreator = new DivCreator();

function createNoteDisplayUI(data)
{
   
    var notesDiv = document.getElementById("notes");
    // resetting the  div 
    notesDiv.innerHtml = "";
    removeAllChildOfDiv(notesDiv);
    var notesData = data;
    
    for(var i=0;i < notesData.length;i++)
    {
        var perNotes = notesData[i];
        var noteDiv = createNote(perNotes);
        notesDiv.appendChild(noteDiv);

        var pointWrapper = getChildComponent(noteDiv, "div", "class", "pointsWrapperClass" ); 
         
        for(var j=0 ; j < perNotes.points.length ; j++)
        {
            var perPoint =  perNotes.points[j];
            var pointdiv = createPoint(perPoint);
            pointWrapper.appendChild(pointdiv);
        }
         
    }
}

// manager code 
function createNoteManager(allppt){
    
    var pptContainerDiv = document.getElementById("pptContainer");
    removeAllChildOfDiv(pptContainerDiv);
    for(var i =0; i<allppt.length;i++)
    {
      var ppt = allppt[i];
      var pptdiv = createPPTNode(ppt);
      pptdiv.addEventListener("click", pptClicked);
      pptContainerDiv.appendChild(pptdiv);
    }
}



function createPPTNode(notePPT){
  
   // var  htmlNoteId = idCreator("ppt",note.id);
    var innerDiv = divcreator.createPPTDiv(notePPT.id, notePPT.title, notePPT);
   
	
    var deleteBtn =    getChildComponent(innerDiv, "img", "id", "delete");
	var editBtn =    getChildComponent(innerDiv, "img", "id", "edit");

	deleteBtn.addEventListener("click",deleteOperation)  
	editBtn.addEventListener("click",editOperation);
    return innerDiv; 
}


function createNote(note)
{
   
    var innerDiv = divcreator.createNoteDiv(note.id, note.title);
      var addPointBtn =    getChildComponent(innerDiv, "img", "id", "addpoint");
	var addCloseBtn =    getChildComponent(innerDiv, "img", "id", "close");

	addCloseBtn.addEventListener("click",deleteOperation)  
	addPointBtn.addEventListener("click",addPoint);
    return innerDiv; 
}

function createPoint(point)
{
    
    var innerDiv = divcreator.createPointsDiv(point.id, point.data.text);
    var deleteBtn =    getChildComponent(innerDiv, "img", "id", "delete");
	var editBtn =    getChildComponent(innerDiv, "img", "id", "edit");

	deleteBtn.addEventListener("click",deleteOperation);  
	editBtn.addEventListener("click",editOperation);
    return innerDiv;
}







function deleteOperation(event)
{		
	var div = event.srcElement;
	var type = div.getAttribute("type");

	var parentDiv = getParentDiv(div, "type", type);

	var id = parentDiv.id;

	switch(type)
	{
		case "ppt":
		dataManager.deletePPT(id);  	
		createNoteManager(dataManager.data);
		
		var lastSelectedPPT = dataManager.getLastPPT();
		if(lastSelectedPPT != -1)
		{
			createNoteDisplayUI(lastSelectedPPT.notes);
			selectedPPTId = lastSelectedPPT.id;	
		} else 
		{
			selectedPPTId = -1;
			createNoteDisplayUI([]);
		}

  		
		break;
		
		case "note":
		dataManager.deleteNote(id, selectedPPTId);
		createNoteDisplayUI(dataManager.getPPTById(selectedPPTId).notes);
		break;
		
		case "point":
		var noteid =  getParentDiv(div, "type", "note").id;
		dataManager.deletePoint(id, noteid, selectedPPTId);
		createNoteDisplayUI(dataManager.getPPTById(selectedPPTId).notes);
		break;
		
		default:
}
	bp.saveTOLocalDB();
}


 function editPPTTitle(data)
 {
	var ppt = dataManager.getPPTById(data.pptId);
	ppt.title = data.text;

	createNoteManager(dataManager.data);
 	if(selectedPPTId == data.pptId)
 	{
 		selectedPPTId = dataManager.data[0].id;
 	}
 }

 function editNotesTitle(data)
{
	var note = dataManager.getNoteById(data.noteId, data.pptId);
	note.title = data.title;
	createNoteDisplayUI(dataManager.getPPTById(selectedPPTId).notes);

}

function editPointTitle(data)
{
	var point = dataManager.getPointById(data.pointId, data.noteId, data.pptId);
	point.title = data.title;
	point.data.title = data.title;
	createNoteDisplayUI(dataManager.getPPTById(selectedPPTId).notes);

}


function editOperation(event){

	var div = event.srcElement;
	var type = div.getAttribute("type");

	var parentDiv = getParentDiv(div, "type", type);
	var id = parentDiv.id;
	
	var popupTitle = "Edit "+type +" Title";

	
	switch(type)
	{
		case "ppt":
		createPop(popupTitle, editPPTTitle, {"event":event,type:"edit",text:dataManager.getPPTById(id).title, "pptId":id});
  	
		break;
		
		case "note":

		createPop(popupTitle, editNoteTitle, {"event":event, type:"edit", text:dataManager.getNoteById(id, selectedPPTId).title, "pptId": selectedPPTId, "noteId":id});
		break;
		
		case "point":
		
		var noteid =  getParentDiv(div, "type", "note").id;
		createPop(popupTitle, editPointTitle, {"event":event,type:"edit", text:dataManager.getPointById(id, noteid, selectedPPTId).title, "pptId":selectedPPTId, "noteId":noteid, "pointId":id});
		break;
		
		default:


	}
	
	bp.saveTOLocalDB();

	




}












