function getParentDiv(div, attr, attrVal)
{
    var parentDiv= div.parentElement;

    while (parentDiv != div.ownerDocument) {
        if(parentDiv.getAttribute(attr)== attrVal)
        {
            return parentDiv;
        }
        parentDiv = parentDiv.parentElement;
      }
    return -1; 
}


function getChildComponent(div, type, att, attrVal)
{
    var childNodes= div.getElementsByTagName(type);
    for(var i=0;i<childNodes.length;i++)
    {
        var node = childNodes[i];
        if(node.getAttribute(att) == attrVal)
        {
            return node;
        }
    }
    return -1; 
}


function removeAllChildOfDiv(div)
{
    var fc = div.firstChild;

    while( fc ) {
    div.removeChild( fc );
    fc = div.firstChild;
    }
}


function deleteItemFromArray(array, prop, value)
{
    for(var i = 0; i < array.length; i++)
	{
		var item = array[i];
		if(item[prop] == value)
		{
			array.splice(i,0);
			return ;
		}
	}
}

function getItemFromArray(array, prop, value)
{
    for(var i = 0; i < array.length; i++)
	{
		var item = array[i];
		if(item[prop] == value)
		{
			return item;
		}
	}

	return -1;
}

function getItemIndexFromArray(array, prop, value)
{
    for(var i = 0; i < array.length; i++)
	{
		var item = array[i];
		if(item[prop] == value)
		{
			return i;
		}
	}

	return -1;
}