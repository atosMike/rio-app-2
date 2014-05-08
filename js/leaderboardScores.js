var scores = [];
var team;
var position;

function parseFile(document){

	$(document).find("table").each(function(i) {
		if (i>0) {
			team = [];
			team.push($(this).find("[name='username']").text());
			team.push(parseInt($(this).find("[name='points']").text(),10));
			scores.push(team);
		}
	});
	
	scores.sort(sorter);
	fillTable();
	rank();
	
}

function sorter(a,b){
	return ((a[1] < b[1]) ? 1 : ((a[1] > b[1]) ? -1 : 0));
}

function fillTable(){

	$.each(scores, function(index,value) {
		//if(index<10) { <====== OPTIONAL FOR TOP 10
		if(value[0] == "Chocobo") {
		$("#top10 tr:last").after("<tr style='background-color:#F90'><td>" + (index+1) + "</td>");
		position = index+1;
		}
		else {
			$("#top10 tr:last").after("<tr><td>" + (index+1) + "</td>");
		}
			
		
		$.each(value, function(index,value) {
			$("#top10 td:last").after("<td>" + value + "</td>");
		});
		
		$("#top10 td:last").after("</tr>");
		//} <=================== OPTIONAL FOR TOP 10
	});
	
}

function rank(){
	
	$("#rank").append(position);
	
	var x = position % 10;
	
	switch(x) {
		case 1:
			$("#rank").append("<sup>st</sup");
			break;
		case 2:
			$("#rank").append("<sup>nd</sup");
			break;
		case 3:
			$("#rank").append("<sup>rd</sup");
			break;
		default:
			$("#rank").append("<sup>th</sup");
			break;
	}
		
	
	
	
}

$.ajax({
	url:"xml/leaderboard.xml",
	dataType: "xml",
	success: parseFile,
	error: function(){alert("ERROR!")}
});
