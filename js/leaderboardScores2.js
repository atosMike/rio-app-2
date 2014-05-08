if(window.XMLHttpRequest)
{
	xmlhttp = new XMLHttpRequest();
}
else
{
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","xml/scores.xml",false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;
			
for(i = 0;i < 10;i++)
{
	document.write("<tr><td>" + xmlDoc.getElementsByTagName("rank")[i].childNodes[0].nodeValue + "</td><td>" + xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue + "</td><td>" + xmlDoc.getElementsByTagName("score")[i].childNodes[0].nodeValue + "</td></tr>");
}
