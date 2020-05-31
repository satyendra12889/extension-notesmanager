// create Div for notes, points, 
var DivCreator = function () {
  
};

DivCreator.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.firstName);
};
DivCreator.prototype.createNoteDiv = function createNoteDiv( id , title)
{
var div = document.createElement('div');

var header = this.createHeaderDiv();
var footer= this.createFooterDiv();

div.setAttribute('id', id);
div.setAttribute('class', 'note');
div.setAttribute('type', 'note');

div.appendChild(header);
div.appendChild(this.createTitleDiv(title));


var pointWrapper = this.createPointsWrapperDiv(id);
div.appendChild(pointWrapper);
div.appendChild(footer);

return div;
};

DivCreator.prototype.createTitleDiv=  function createTitleDiv(title)
{
var div = document.createElement('div');
div.innerHTML = title;
div.setAttribute('class', 'notetitle');
div.setAttribute('id', 'title');
return div;
};

DivCreator.prototype.createHeaderDiv = function createHeaderDiv()
{
var div = document.createElement('div');
div.innerHTML = "<img id=\"close\" src=\"assets/close.png\" type=\"note\" height=\"10\" width=\"10\">";

div.setAttribute('class', 'Header');

;
 // and make sure myclass has some styles in css

return div;
};

DivCreator.prototype.createFooterDiv = function createFooterDiv()
{
var div = document.createElement('div');
div.innerHTML =  "<img id=\"addpoint\" src=\"assets/add.png\" width=\"20\" height=\"20\" />";

div.setAttribute('class', 'footer');
 // and make sure myclass has some styles in css

return div;
};




DivCreator.prototype.createNoteTitleDiv = function createNoteTitleDiv(data)
{
var div = document.createElement('div');
div.innerHTML = "my <b>new</b> skill - <large>DOM maniuplation!</large>";

// better to use CSS though - just set class
div.setAttribute('class', 'notetitle'); // and make sure myclass has some styles in css
return div;
};

DivCreator.prototype.createPointsDiv = function createPointsDiv(id, text )
{
var div = document.createElement('div');
div.innerHTML = "<img id=\"delete\" src=\"assets/close.png\"" +
"width=\"10\" height=\"10\" type=\"point\" class=\"deletebtnclass\" />"
+"<img id=\"edit\" src=\"assets/edit.png\"" +
"width=\"10\" height=\"10\" type=\"point\" class=\"deletebtnclass\" />"
+"-- "+text;
// better to use CSS though - just set class
div.setAttribute('id', id);
div.setAttribute('type', "point");
div.setAttribute('class', 'pointsClass'); // and make sure myclass has some styles in css
return div;
};

DivCreator.prototype.createPointsWrapperDiv = function createPointsWrapperDiv(id )
{
var div = document.createElement('div');
div.innerHTML = "";
// better to use CSS though - just set class
div.setAttribute('id', 'pointsWrapper');
div.setAttribute('class', 'pointsWrapperClass'); // and make sure myclass has some styles in css
return div;
};


DivCreator.prototype.createPPTDiv = function createPPTDiv(pptId, title, pptdata )
{
var div = document.createElement('div');
div.innerHTML = title + "<img id=\"delete\" src=\"assets/closeInv.png\"" +
"width=\"20\" height=\"20\" type=\"ppt\" class=\"deletebtnclass\" />"
+"<img id=\"edit\" src=\"assets/editInv.png\"" +
"width=\"20\" height=\"20\" type=\"ppt\" class=\"deletebtnclass\" />";
// better to use CSS though - just set class
div.setAttribute('id', pptId);
div.setAttribute('type', "ppt");
div.setAttribute('class', 'pptClass'); // and make sure myclass has some styles in css
return div;
};
