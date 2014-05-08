// JavaScript Document

$(document).ready(function()	{
	$('#lorem').load('lorem10.html');
	$('#navbar').load('nav.html');
	$('#footerContainer_1').load('footer.html');
	$('#username').load('username.html');
	$(".clickableRow").click(function() {
    	window.document.location = $(this).attr("href");
    });
});