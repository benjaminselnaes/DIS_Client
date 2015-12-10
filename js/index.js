/*------------------------------------------------------------------------------
                                LOGIN FUNKTION
            Gets input from the user and sends it to the server as JSON
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#loginbut").click(function () {

        //Retrieve input from user and store as a value
        var loginInfo = {
            "username" : $("#name").val(),
            "password" : $("#pass").val()
        };

        //Makes sure that none of the required fields are left blank
        if(loginInfo.username == '' || loginInfo.password == '') {
            alert("Please fill out all fields")

        }else {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.url + "/login/",
                "method": "POST",
                "processData": false,
                "data": JSON.stringify(loginInfo)
            };

            /*
            When the input is handled by the server it will return a status.
             */
            $.ajax(settings)
            //If the request goes through it will be handled as 'done'
                .done(function (data) {

                    console.log(data);
                    window.location.href = "../html/UserMenu.html";
                    //The client uses session handling to store the id of the user logged in
                    $.session.set("hostId", data.userid);
                })

                //If the request does not go through it will be caught as 'fail'
                .fail(function(data){

                    console.log(data.responseText);
                    alert("Wrong username or password!");
                });
        }
    });
});

/*------------------------------------------------------------------------------
                                ALL OPEN GAMES
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    if(window.location.pathname == "/sign-up-login-box/html/Games.html") {
        if($.session.get("hostId") != null) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/open",
            "method": "GET"
        };

        $.ajax(settings)
            .done(function (data) {
                var tr;
                for (var i = 0; i < data.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + data[i].gameId + "</td>");
                    tr.append("<td>" + data[i].name + "</td>");
                    tr.append("<td>" + data[i].host.id + "</td>");
                    tr.append("<td>" + data[i].created + "</td>");
                    $('#table').append(tr);
                }
            })
            .fail(function(data){

                console.log(data.responseText);
                alert("Something went wrong\nPlease refresh your browser");
            });
        }else{
            window.location.href = "../html/index.html";
        }
    }
});

/*------------------------------------------------------------------------------
                               GAMES FOR A SPECIFIC USER
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    if(window.location.pathname == "/sign-up-login-box/html/MyGames.html") {
        if($.session.get("hostId") != null) {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": config.url + "/games/" + $.session.get("hostId"),
                "method": "GET"
            };

            console.log(window.location.pathname);

            $.ajax(settings)
                .done(function (data) {
                    var tr;
                    for (var i = 0; i < data.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + data[i].gameId + "</td>");
                        tr.append("<td>" + data[i].name + "</td>");
                        tr.append("<td>" + data[i].host.id + "</td>");
                        tr.append("<td>" + data[i].created + "</td>");
                        tr.append("<td>" + data[i].status + "</td>");
                        tr.append("<td>" + data[i].winner.id + "</td>");
                        $('#table2').append(tr);
                    }
                })
                .fail(function (data) {

                    console.log(data.responseText);
                    alert("Something went wrong\nPlease refresh your browser");
                });
        }else{
            window.location.href = "../html/index.html";
        }
    }
});

/*------------------------------------------------------------------------------
                                SCORES FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    if(window.location.pathname == "/sign-up-login-box/html/Scores.html") {
        if($.session.get("hostId") != null) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/scores/",
            "method": "GET"
        };

        $.ajax(settings)
            .done(function (data) {
                var tr;
                for (var i = 0; i < data.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + (i+1) + "</td>");
                    tr.append("<td>" + data[i].user.username + "</td>");
                    tr.append("<td>" + data[i].score + "</td>");
                    tr.append("<td>" + data[i].game.name + "</td>");
                    tr.append("<td>" + data[i].game.created + "</td>");
                    $('#table3').append(tr);
                }
            })
            .fail(function(data){

                console.log(data.responseText);
                alert("Something went wrong\nPlease refresh your browser");
            });
        }else{
            window.location.href = "../html/index.html";
        }
    }
});

/*------------------------------------------------------------------------------
                                CREATE GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#creategame").click(function () {
        if($.session.get("hostId") != null) {

            var gameInfo = {
            "host" : {
                "id" : $.session.get("hostId"),
                "controls" : $("#controls").val()
            },
            "name" : $("#gamename").val(),
            "mapSize" : $("#mapsize").val()
            };

            //Makes sure that none of the required fields are left blank
            if(gameInfo.host.controls == '' || gameInfo.name == '' || gameInfo.mapSize == '') {
                alert("Please fill out all fields")

            }else {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": config.url + "/games/",
                    "method": "POST",
                    "processData": false,
                    "data": JSON.stringify(gameInfo)
                };

                $.ajax(settings)
                    .done(function (data) {

                        console.log(data);
                        window.location.href = "../html/Games.html";

                })
                    .fail(function(data){

                        console.log(data.responseText);
                        alert("Something went wrong\nPlease try again");
                        window.location.href = "../html/NewGame.html";

                    });
            }
        }else{
            window.location.href = "../html/index.html";
        }
    });
});

/*------------------------------------------------------------------------------
                                DELETE GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#deletegame").click(function () {
        if($.session.get("hostId") != null) {

            var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/" + $("#idfield").val(),
            "method": "POST"
            };

            //Makes sure that none of the required fields are left blank
            if($("#idfield").val() == ''){
                alert("Please enter a game ID to delete..");

            }else {
            $.ajax(settings)
                .done(function (data) {

                    console.log(data);
                    window.location.href="../html/MyGames.html";
                 })
                .fail(function(data){

                    console.log(data.responseText);
                    alert("Something went wrong\nPlease choose a game from the list");
                });
            }
        }else{
            window.location.href = "../html/index.html";
        }
    });
});

/*------------------------------------------------------------------------------
                                JOIN GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#joingamebut").click(function () {
        if($.session.get("hostId") != null) {

            var gameInfo = {
                "gameId" : $("#idfield").val(),
                "opponent" : {
                    "id" : $.session.get("hostId"),
                    "controls" : ""
                }
            };

            //Makes sure that none of the required fields are left blank
            if($("#idfield").val() == ''){
                alert("Please choose a game from the list");

            }else {

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": config.url + "/games/join",
                    "method": "POST",
                    "processData": false,
                    "data": JSON.stringify(gameInfo)
                };

                console.log(JSON.stringify(gameInfo));

                $.ajax(settings)
                    .done(function (data) {

                        console.log(data);
                        window.location.href = "../html/StartGame.html";
                        $.session.set("gameID", $("#idfield").val());

                    })
                    .fail(function (data) {

                        console.log(data.responseText);
                        alert("Something went wrong\nPlease try again");
                        window.location.href = "../html/Games.html";

                    });
            }
        }else{
            window.location.href = "../html/index.html";
        }
    });
});

/*------------------------------------------------------------------------------
                                START GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#startgamebut").click(function () {
        if($.session.get("hostId") != null) {

            var gameInfo = {
                "gameId" : $.session.get("gameID"),
                "opponent" : {
                    "id" : $.session.get("hostId"),
                    "controls" : $("#controlsfield").val()
                }
            };

            if($("#controlsfield").val() == ''){
                alert("Please enter your controls to start the game");
            }else {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": config.url + "/games/start",
                    "method": "POST",
                    "processData": false,
                    "data": JSON.stringify(gameInfo)
                };

                $.ajax(settings)
                    .done(function (data) {

                        window.location.href = "../html/Games.html";

                        if (data.winner.id == $.session.get("hostId")) {
                            window.alert("Congratulations! You won!\nYour score: " + data.winner.score)
                        } else {
                            window.alert("Blimey! You lost!\nBetter luck next time")
                        }
                    })
                    .fail(function (data) {

                        console.log(data.responseText);
                        alert("Something went wrong!\nSorry..");
                        window.location.href = "../html/Games.html";

                    });
            }
        }else{
            window.location.href = "../html/index.html";
        }
    });
});
