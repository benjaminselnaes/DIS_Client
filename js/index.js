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
    $("#getgames").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:13337/api/games/open",
            "method": "GET"
        };

/* Created by Tobias Jacobsen */
        $.ajax(settings).done(function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr><td>' + item.name + '</td><td>' + item.host.id + '</td><td>' +item.opponent.id + '</td><td>' + item.status +
                    '</td><td>'+ item.winner.id;
            });
            $('#table').append(trHTML);
            console.log(response);
        });
    });
});

/*

$(function () {
    var user = {},
        flg = {};
    init();
    $('.upload').click(function () {
        if (flg.upd == 0) {
            upd('upload');
            flg.upd = 1
        } else {
            upd('');
            flg.upd = 0
        }
    });
    $('#login').click(function () {
        initub();
        $('#logmsk').fadeIn();
        ub(0)
    });
    $('#logint').click(function () {
        initub();
        if (flg.logt == 0) {
            ub(1);
            flg.logt = 1
        } else {w
            ub(0);
            flg.logt = 0
        }
    });
    $("#name").keyup(function () {
        var len = $('#name').val().length;
        if (len > 13 || len == 0) {
            $('#name').css('background', 'rgb(255, 214, 190)');
            blsp();
            if (len != 0) {
                $('#nameal').css('color', 'rgb(255, 57, 19)').text('ID: Too long').fadeIn()
            } else {
                $('#nameal').css('color', 'rgb(255, 57, 19)').text('ID: Null').fadeIn()
            }
            flg.name = 1
        } else {
            $('#name').css('background', 'rgb(255, 255, 255)');
            $('#nameal').css('color', 'rgb(17, 170, 42)').text('ID: Ok').fadeIn();
            flg.name = 0;
            tcheck()
        }
    });
    $("#pass").keyup(function () {
        var len = $('#pass').val().length;
        if (len > 10 || len == 0) {
            $('#pass').css('background', 'rgb(255, 214, 190)');
            blsp();
            if (len != 0) {
                $('#passal').css('color', 'rgb(255, 57, 19)').text('Password: Too long').fadeIn()
            } else {
                $('#passal').css('color', 'rgb(255, 57, 19)').text('Password: Null').fadeIn()
            }
            flg.pass = 1
        } else {
            $('#pass').css('background', 'rgb(255, 255, 255)');
            $('#passal').css('color', 'rgb(17, 170, 42)').text('Password: Ok').fadeIn();
            flg.pass = 0;
            tcheck()
        }
    });

    function tcheck() {
        if (flg.name == 0 && flg.pass == 0) {
            $('#signupb').css('opacity', '1').css('cursor', 'pointer')
        } else {
            blsp()
        }
    }
    $('#signupb').click(function () {
        if (flg.name == 0 && flg.pass == 0) {
            $('#sumsk').fadeIn();
            $('#name, #pass, #logint, #nameal, #passal, #signupb').css('opacity', '0.2');
            $('#close').fadeIn()
        }
    });
    $('#close').click(function () {
        init();
        initub();
        $('#close').hide()
    });

    function init() {
        flg.logt = 0
    }

    function initub() {
        flg.name = -1;
        flg.pass = -1;
        $('#sumsk').hide();
        $('#nameal').hide();
        $('#passal').hide();
        $('#name, #pass, #logint, #nameal, #passal, #signupb').css('opacity', '1');
        $('#name').css('background', 'rgb(255, 255, 255)');
        $('#pass').css('background', 'rgb(255, 255, 255)');
        $('#signupb').css('opacity', '0.2').css('cursor', 'default');
        $('#name, #pass').val('')
    }

    function upd(button) {
        location.hash = button;
        if (flg.upd == 0) {
            $('#drop').fadeIn()
        } else {
            $('#drop').fadeOut()
        }
    }

    function ub(flg) {
        if (flg == 0) {
            $('#signup').text('Sign up').css('background', '#76ABDB');
            $('#signupb').text('Sign up');
            $('#logint').text('Login as an existing user')
        } else {
            $('#signup').text('Login').css('background', '#FFA622');
            $('#signupb').text('Login');
            $('#logint').text('Sign up as a new user')
        }
    }

    function blsp() {
        $('#signupb').css('opacity', '0.2').css('cursor', 'default')
    }
});
*/
