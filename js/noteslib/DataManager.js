//var DataManager = function DataManager(pptData)
//{

//this.manipulator = new DataManipulator(pptData);
//if(pptData != null)
//this.maxNoteid = pptData.maxNoteId;
//this.maxPointId = [];

//};

//DataManager.prototype.addNote = function (text, data)
//{

//}

//DataManager.prototype.addPoint = function (text, data, noteId)
//{

//}









var DataCreator = function ()
{

	// this.noteId = noteId;
	// this.pointId = pointId;

};



DataCreator.prototype.createPointStructure = function(id,noteId,data)
{

	var obj = {};
	obj.type = "point";
	obj.data = data;
	obj.title = data.title; 
	obj.id = id;
	obj.noteId = noteId;
	obj.index = 0;

	return obj;

};

DataCreator.prototype.createPPTStructure = function(id,title,data)
{
	

	var obj = {};
	obj.type = "ppt";
	obj.data = data;
	obj.title = title;
	obj.id = id;
	obj.maxNoteId = 0;
	obj.maxPointId = 0;
	obj.index = 0;
	obj.notes = [];
	return obj;

};

DataCreator.prototype.createNoteStructure = function(id, title, data)
{
	var obj = {};
	obj.type = "note";
	obj.data = data;
	obj.id = id;
	obj.title  = title;
	obj.points = [];

	obj.maxPointId = 0;
	obj.index = 0;

	return obj; 
};

DataCreator.prototype.createIdObjStructure = function(id, title, note)
{


	var obj = {};    
	obj.id = id;
	obj.name  = title;

	obj.ref = note;
	return obj; 
};

DataCreator.prototype.addToIdStructure = function(IdMap, note)
{
	IdMap[note.id] = note;
};


var notePadData = [];
//[
//{
//"id":0,
//"title":"main title 1",
//"maxNoteId":2,

//"notes":[
//{
//"id" : 1,
//"type" : "note",
//"data":{},
//"index":1,
//"maxPointId":1,
//"title":"title 1",
//"points" : [
//{
//"id" : 1,
//"type" : "point",
//"index":0,
//"data"  : {
//"text":"point1"} 
//}]
//},
//{
//"id" : 2,
//"type" : "note",
//"data":{},
//"index":2,
//"title":"title 2",
//"points" : [
//{
//"id" : 2,
//"index":0,
//"type" : "point",
//"data"  : {
//"text":"point2"
//} 
//}]
//}]},
//{ "id":1,
//"title":" main title 2",
//"maxNoteId":2,
//"notes" : [
//{
//"id" : 1,
//"type" : "note",
//"data":{},
//"index":1,
//"maxPointId":1,
//"title":"title 3",
//"points" : [
//{
//"id" : 1,
//"type" : "point",
//"index":2,
//"data"  : {
//"text":"point3"} 
//}]
//},
//{
//"id" : 2,
//"type" : "note",
//"data":{},
//"index":2,
//"title":"title 4",
//"points" : [
//{
//"id" : 4,
//"index":0,
//"type" : "point",
//"data"  : {
//"text":"point4"
//} 
//}]
//}]   
//}
//];

var DataManipulator = function(pptData)
{
	this.dataCreator = new DataCreator();

	this.data = pptData;

	this.noteIdMap = {};
	this.noteIds = [];

	this.pptIdMap = {};
	this.pptIds = [];

	this.pointIdMap = {};
	this.pointIds = [];

	this.resetWithData(pptData);


};

DataManipulator.prototype.reset  = function()
{
	this.noteIdMap = {};
	this.noteIds = [];

	this.pptIdMap = {};
	this.pptIds = [];

	this.pointIdMap = {};
	this.pointIds = [];

};

DataManipulator.prototype.resetWithData = function(pptData)
{
	this.data = pptData;
	this.noteIdMap = {};
	this.noteIds = [];

	

	this.pptIdMap = {};
	this.pptIds = [];

	this.pointIdMap = {};
	this.pointIds = [];

	this.createIdsMap(pptData);

};

DataManipulator.prototype.addPPT = function(pptId, ppt, index)
{
	this.pptIdMap[pptId] = ppt;
	this.data.push(ppt);
//	this.dataCreator.addToIdStructure(this.noteIdMap,note);
};

DataManipulator.prototype.addNoteToPPT = function(pptId, note, index)
{
	var ppt = this.pptIdMap[pptId];
	ppt.notes.push(note);

	this.dataCreator.addToIdStructure(this.noteIdMap,note);
};


DataManipulator.prototype.addPointToNote = function(noteId, point, index)
{
	var note = this.noteIdMap[noteId];
	note.points.push(point);

	this.dataCreator.addToIdStructure(this.pointIdMap,point);
};

DataManipulator.prototype.createIdsMap = function (data)
{
	var pptdata = data;
	for(var i =0; i< pptdata.length; i++)
	{
		var ppt = pptdata[i];
		this.createPPTIdMap(ppt);
	}
};

DataManipulator.prototype.createNotesIdMap = function(notes)
{
	var allNotes = notes;
	for(var i = 0; i < allNotes.length; i++)
	{
		var note = allNotes[i];
		this.dataCreator.addToIdStructure(this.noteIdMap, note);
		this.createPointIdMap(note.points);
	}

};

DataManipulator.prototype.createPPTIdMap = function(ppt)
{
	this.dataCreator.addToIdStructure(this.pptIdMap,ppt);
	this.createNotesIdMap(ppt.notes);
};

DataManipulator.prototype.createPointIdMap = function(points)
{
	var allPoints = points;
	console.log(points);
	for(var i = 0; i < allPoints.length; i++)
	{
		var point = allPoints[i];
		this.dataCreator.addToIdStructure(this.pointIdMap, point);
	}
};


DataManipulator.prototype.getLastPPT = function()
{
if(this.data.length>0)
{
	return this.data[0];
}return -1;
};

DataManipulator.prototype.getPointsFromNotesOfId = function(pptId)
{
	return this.pptIdMap[pptId].notes;
};

DataManipulator.prototype.getNotesById = function(id, pptId)
{

	var pptData = this.pptIdMap[pptId];
	var notes = pptData.notes;
	for(var i=0; i< notes.length; i++)
	{
		var note = notes[i];
		if(note.id == id)
		{
			return  note;
		}
	}

	return -1;
};

DataManipulator.prototype.getPointById  = function(pointId, noteId, pptId)
{
	var ppt = this.getPPTById(pptId);
	var notes = ppt.notes;
	var item = getItemFromArray(notes, "id", noteId);
	var pointItem = getItemFromArray(item.points, "id", pointId);
	return pointItem;
};

DataManipulator.prototype.getPPTById = function(id)
{
	return this.pptIdMap[id];
};

DataManipulator.prototype.getNotesFromPPT = function(pptId)
{
	var ppt = this.pptIdMap[pptId]
	if( ppt){
		return ppt.notes
	}
	return -1;
};

DataManipulator.prototype.mergePPT = function(pptId, pptArray)
{

	var id = pptId;
	for(var i=0; i<pptArray.length; i++)
	{
		var ppt = pptArray[i];
		ppt.id = ++id;
		this.addPPT(id, ppt);

	}
	this.resetWithData(this.data);
};

DataManipulator.prototype.deletePPT  = function(pptId)
{

	for(var i=0; i< this.data.length; i++)
	{
		var ppt = this.data[i];
		if(ppt.id == pptId )
		{
			this.data.splice(i,1);
			return ;
		}
	}
	return;

} ;


DataManipulator.prototype.deleteNote  = function(noteId, pptId)
{
	alert("hello");
	var ppt = this.getPPTById(pptId);
	var notes = ppt.notes;
	var index = getItemIndexFromArray(notes, "id", noteId);
	console.log(index);
	notes.splice(index,1);

} ;

DataManipulator.prototype.deletePoint  = function(pointId, noteId, pptId)
{
	var ppt = this.getPPTById(pptId);
	var notes = ppt.notes;
	var item = getItemFromArray(notes, "id", noteId);
	var index = getItemIndexFromArray(item.points, "id", noteId);
	console.log(index);
	item.points.splice(index,1);
};
