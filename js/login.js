function login() {
    
    var term = {
        username: $("#userInput").val(),
        password: $("#pwdInput").val()
    };
    
    console.log(term);
    
    $.ajax({
        url: "http://co-project.lboro.ac.uk/users/ttmhl/test/php/login.php",
        type: "POST",
        data: term,
        dataType: 'json',
        error: function (jqXHR, text_status, strError) {
            alert("no connection");
            console.log(strError);
        },
        timeout: 60000,
        success: function (data) {
            if (data == 1) {
                location.href="home.html";
            }
            else {
                $(".form-signin-heading").html("Invalid username/password, please try again.");
            }
        }
    });
}