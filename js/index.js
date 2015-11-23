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
                window.location.href="../html/UserMenu.html";
            }
            else {
                alert("Fail");
            }
        });
    });
});

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
                tr.append("<td>" + data[i].status + "</td>");
                tr.append("<td>" + data[i].score + "</td>");
                tr.append("<td>" + data[i].winner.id + "</td>");
                $('#table').append(tr);
            }
        });
});

//SKAL LAVES OM TIL SCORES
$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:13337/api/games/7",
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
            tr.append("<td>" + data[i].score + "</td>");
            tr.append("<td>" + data[i].winner.id + "</td>");
            $('#table2').append(tr);
        }
    });
});

$(document).ready(function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:13337/api/games/7",
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
            tr.append("<td>" + data[i].score + "</td>");
            tr.append("<td>" + data[i].winner.id + "</td>");
            $('#table2').append(tr);
        }
    });
});

$(document).ready(function() {
    $("#creategame").click(function () {

        var gameInfo = {
            "host" : {
                "id" : $("#hostId").val(),
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

        console.log(JSON.stringify(gameInfo))

        $.ajax(settings).done(function (data, status, xhr) {
            if (xhr.status == 200 || xhr.status == 201) {
                window.location.href="../html/Games.html";
            }
            else {
                alert("Fail");
            }
        });
    });
});

