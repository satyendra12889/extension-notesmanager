var contextMenuCreator = function() {
};

contextMenuCreator.prototype.createAddPointMenu = function createAddPointMenu(
		parent, context, clickHandler) {
	var child = chrome.contextMenus.create({
		"title" : "Add Point",
		"contexts" : context,
		"parentId" : parent,
		"onclick" : clickHandler
	});
	return child;
};

contextMenuCreator.prototype.createNoteMenu = function createNoteMenu(noteid,
		parent, context, clickHandler) {
	var child = chrome.contextMenus.create({
		"title" : noteid.id + " : " + noteid.name,
		"contexts" : context,
		"parentId" : parent,
		"onclick" : clickHandler
	});
	return child;
};

contextMenuCreator.prototype.createAddNoteItem = function createAddNoteItem(
		parent, context, clickhandler) {
	var child = chrome.contextMenus.create({
		"title" : "Add Notes",
		"contexts" : context,
		"parentId" : parent,
		"onclick" : clickhandler
	});

	return child;
};

contextMenuCreator.prototype.createSaveNoteItem = function createSaveNoteItem(
		parent, context, clickhandler) {
	var child = chrome.contextMenus.create({
		"title" : "Save Note",
		"contexts" : context,
		"parentId" : parent,
		"onclick" : clickhandler
	});

	return child;
};
