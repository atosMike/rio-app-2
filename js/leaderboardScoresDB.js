var position;

function rank() {
	
	$("#rank").append(position);
	
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

$.ajax({
    url: "http://co-project.lboro.ac.uk/group07/connect.php",
    type: "GET",
    dataType: 'json',
    error: function (jqXHR, text_status, strError) {
        alert("no connection");
    },
    timeout: 60000,
    success: function (data) {
        
        for (var i in data)
        {
            data[i][1] = parseInt(data[i][1]);
        }
        
        data.sort(sorter);
        
        for (var i in data) {            
            position = parseInt(i) + 1;
            
            if(data[i][0] === "Team Chocobo") {
                $("#top10 tr:last").after("<tr style='background-color:#F90'><td>" + position + "</td>");
                rank();
            } else {
                $("#top10 tr:last").after("<tr><td>" + position + "</td>");
            }
            
            $("#top10 td:last").after("<td>" + data[i][0] + "</td>");
            $("#top10 td:last").after("<td>" + data[i][1] + "</td></tr>");
        }
    }
});