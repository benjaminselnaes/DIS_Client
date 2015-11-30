/*////////////
LOGIN FUNKTION
 *////////////
$(document).ready(function() {
    $("#loginbut").click(function () {

        var loginInfo = {
            "username" : $("#name").val(),
            "password" : $("#pass").val()
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:13337/api/login/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(loginInfo)
        };

        $.ajax(settings).done(function (data, status, xhr) {
            if (xhr.status == 200) {

                console.log(data);
                window.location.href="../html/UserMenu.html";
                $.session.set("hostId", data.userid);
                console.log($.session.get("hostId"));
            }
            else {
                alert("Fail");
            }
        });
    });
});

/*////////////
 ALL OPEN GAMES
 *////////////
$(document).ready(function() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:13337/api/games/open",
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

/*////////////
GAMES FOR A SPECIFIC USER
 *////////////
$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:13337/api/games/" + $.session.get("hostId"),
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

/*////////////
 SCORES FUNKTION
 *////////////
$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:13337/api/scores/", //Skal der mere på her?
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
});

/*////////////
 CREATE GAME FUNKTION
 *////////////
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
            "url": "http://localhost:13337/api/games/",
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

/*////////////
 DELETE GAME FUNKTION
 *////////////
$(document).ready(function() {
    $("#deletegame").click(function () {

/*        var gameInfo = {
            "gameId" : $("#idfield").val(),
        };*/

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:13337/api/games/" + $("#idfield").val(),
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

/*////////////
 JOIN GAME FUNKTION
 *////////////
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
            "url": "http://localhost:13337/api/games/join",
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

/*////////////
 START GAME FUNKTION
 *////////////
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
            "url": "http://localhost:13337/api/games/start",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(gameInfo)
        };

        console.log(JSON.stringify(gameInfo));

        $.ajax(settings).done(function (response, status, xhr) {
            if (xhr.status == 200 || xhr.status == 201) {
                console.log(response);
                window.location.href="../html/Games.html";
            }
            else {
                alert("Fail");
            }
        });
    });
});
