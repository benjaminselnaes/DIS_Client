/*------------------------------------------------------------------------------
                                LOGIN FUNKTION
            Gets input from the user and sends it to the server as JSON
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#loginbut").click(function () {

        var loginInfo = {
            "username" : $("#name").val(),
            "password" : $("#pass").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/login/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(loginInfo)
        };

        // When the input is handled by the server it will return a status.
        // Based on the return the client either sends the user to the menu
        // or alerts the user about an error in the input.

        $.ajax(settings).done(function (data, status, xhr) {
            if (xhr.status == 200 || xhr.status == 400) {

                console.log(data);
                window.location.href="../html/UserMenu.html";
                //The client uses session handling to store the id of the user logged in
                $.session.set("hostId", data.userid);
            }
            else {
                window.alert("Fail");
            }
        });
    });
});

/*------------------------------------------------------------------------------
                                ALL OPEN GAMES
 ------------------------------------------------------------------------------*/
$(document).ready(function() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/open",
            "method": "GET"
        };

        $.ajax(settings).done(function (data) {
            var tr;
            for (var i = 0; i < data.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + data[i].gameId + "</td>");
                tr.append("<td>" + data[i].name + "</td>");
                tr.append("<td>" + data[i].host.id + "</td>");
                tr.append("<td>" + data[i].created + "</td>");
                $('#table').append(tr);
            }
        });
});

/*------------------------------------------------------------------------------
                               GAMES FOR A SPECIFIC USER
 ------------------------------------------------------------------------------*/
$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.url + "/games/" + $.session.get("hostId"),
        "method": "GET"
    };

    $.ajax(settings).done(function (data) {
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
    });
});

/*------------------------------------------------------------------------------
                                SCORES FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": config.url + "/scores/",
        "method": "GET"
    };

    $.ajax(settings).done(function (data) {
        var tr;
        for (var i = 0; i < data.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + data[i].user.username + "</td>");
            tr.append("<td>" + data[i].score + "</td>");
            tr.append("<td>" + data[i].game.name + "</td>");
            tr.append("<td>" + data[i].game.created + "</td>");
            $('#table3').append(tr);
        }
    });
                    tr.append("<td>" + (i+1) + "</td>");
});

/*------------------------------------------------------------------------------
                                CREATE GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#creategame").click(function () {

        var gameInfo = {
            "host" : {
                "id" : $.session.get("hostId"),
                "controls" : $("#controls").val()
            },
            "name" : $("#gamename").val(),
            "mapSize" : $("#mapsize").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(gameInfo)
        };

        $.ajax(settings).done(function (data, status, xhr) {
            if (xhr.status == 200 || xhr.status == 201) {

                console.log(data);
                window.location.href="../html/Games.html";
            }
            else {
                alert("Fail");
            }
        });
    });
});

/*------------------------------------------------------------------------------
                                DELETE GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#deletegame").click(function () {

/*        var gameInfo = {
            "gameId" : $("#idfield").val(),
        };*/

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/" + $("#idfield").val(),
            "method": "POST"
        };

        $.ajax(settings).done(function (response) {
            $.ajax(settings).done(function (response, status, xhr) {
                if (xhr.status == 200) {

                    console.log(response);
                    window.location.href="../html/MyGames.html";
                }
                else {
                    console.log("Fail");
                }
            });
        });
    });
});

/*------------------------------------------------------------------------------
                                JOIN GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#joingamebut").click(function () {

        var gameInfo = {
            "gameId" : $("#idfield").val(),
            "opponent" : {
                "id" : $.session.get("hostId"),
                "controls" : ""
            }
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/join",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(gameInfo)
        };

        console.log(JSON.stringify(gameInfo));

        $.ajax(settings).done(function (response, status, xhr) {
            if (xhr.status == 200 || xhr.status == 201) {

                console.log(response);
                window.location.href="../html/StartGame.html";
                $.session.set("gameID", $("#idfield").val());
            }
            else {
                console.log("Fail");
            }
        });
    });
});

/*------------------------------------------------------------------------------
                                START GAME FUNKTION
 ------------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#startgamebut").click(function () {

        var gameInfo = {
            "gameId" : $.session.get("gameID"),
            "opponent" : {
                "id" : $.session.get("hostId"),
                "controls" : $("#controlsfield").val()
            }
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.url + "/games/start",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(gameInfo)
        };

        console.log(JSON.stringify(gameInfo));

        $.ajax(settings).done(function (response, status, xhr) {
            if (xhr.status == 200 || xhr.status == 201) {
                window.location.href="../html/Games.html";
                //Response given to the user after the game finished:
                if (response.winner.id == $.session.get("hostId")){
                    window.alert("Gongratulations! You won!/nYour score: " + response.winner.score)
                } else {
                    window.alert("Blimey! You lost!/nBetter luck next time")
                }
            }
            else {
                alert("Fail");
            }
        });
    });
});
