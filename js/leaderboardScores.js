/*jslint browser: true*/
/*global $, jQuery, alert*/
/*jslint node: true*/
"use strict";

function rank() {
	
	$("#rank").html(position);
	
	var x = position % 10;
	
	switch (x) {
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

function sorter(a, b) {
	return ((a[1] < b[1]) ? 1 : ((a[1] > b[1]) ? -1 : 0));
}

function dbase() {
    $.ajax({
        url: "http://co-project.lboro.ac.uk/group07/connect.php",
        type: "GET",
        dataType: 'json',
        error: function (jqXHR, text_status, strError) {
            alert("no connection");
        },
        timeout: 60000,
        success: function (data) {
            
            page = $("#pageNo").val();
	
            startIndex = (page - 1) * pageSize;
            endIndex = (page * pageSize) - 1;
            
            $("#top10 tbody").html("<tr><td>Rank</td><td>Name</td><td>Points</td></tr>");
            
            for (var i in data)
            {
                data[i][1] = parseInt(data[i][1]);
                position = parseInt(i) + 1;
            }

            data.sort(sorter);
            
            for (var i in data)
            {
                if(data[i][0] === "Team Chocobo") {
                    position = (parseInt(i)+1);
                    rank();
                }
            }
            
            length = data.length;
            
            for(var i = startIndex; i <= endIndex; i++) {

                if(data[i][0] === "Team Chocobo") {
                    $("#top10 tr:last").after("<tr style='background-color:#F90'><td>" + (i+1) + "</td>");
                } else {
                    $("#top10 tr:last").after("<tr><td>" + (i+1) + "</td>");
                }

                $("#top10 td:last").after("<td>" + data[i][0] + "</td>");
                $("#top10 td:last").after("<td>" + data[i][1] + "</td></tr>");
            }
        }
    });
}

var length;
var pageSize = 20;
var page = 1;

var startIndex, endIndex;

startIndex = (page - 1) * pageSize;
endIndex = (page * pageSize) - 1;

var position;

$(dbase());

$("#pageNoButton").click(function(){
	
	if( (parseInt($("#pageNo").val())) > (Math.ceil(length/pageSize))) {
		$("#pageNo").val(Math.ceil(length/pageSize));
		dbase();
	} else if( (parseInt($("#pageNo").val())) < 1 ) {
		$("#pageNo").val(1);
		dbase();
	} else {
		dbase();
	}
});

$("#nextPage").click(function() {
	if( (parseInt($("#pageNo").val())) < (Math.ceil(length/pageSize))) {
		$("#pageNo").val(parseInt($("#pageNo").val())+1);
		dbase();
	}
});

$("#prevPage").click(function() {
	if( (parseInt($("#pageNo").val())-1) > 0 ) {
		$("#pageNo").val(parseInt($("#pageNo").val())-1);
		dbase();
	}
});

$("#firstPage").click(function() {
	$("#pageNo").val(1);
	dbase();
});

$("#lastPage").click(function() {
	$("#pageNo").val(Math.ceil(length/pageSize));
	dbase();
});