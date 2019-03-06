/*
 ** @author Łukasz Ameljan
 ** @license CC BY-NC 4.0
 */


// Global variables / config

/* 
Example:
 - Your true password: 105
 - Your passwords: 10, 5
 - Your questions: 5+5=?, 10-5=?
Config:
    const passwords = ["10", "5"];
    const questions = ["5+5=?", "10-5=?"];
    const true_password = "105";
[!] arrange passwords in the order in which letters are fetched. After the correct completion of the question, the letter corresponding to the password number is revealed!
[!] write passwords and true_password in lower case letters!
*/

const passwords = ["android", "open", "printer", "linux", "pen"];
const questions = ["The most popular smartphone operating system", "Project O... Source", "Peripheral printing device", "Free operating system for computers", "It's used for writing"];
const true_password = "apple";

// Autosettings of global variables

const lines = [];

// Create frontend of crossword game

$(document).ready(function() {
    var input_num = 1;
    for (i = 0; i < passwords.length; i++) {
        var password_lines = '';
        var number = i + 1;
        $(".game_body").append('<div class="game_body_row" id="game_body_row_' + i + '" />');
        $("#game_body_row_" + i).append('<div class="game_body_row_row" id="game_body_row_row_' + i + '" />');
        $("#game_questions").append('<tr id="tr_' + i + '" />');
        $("#tr_" + i).append('<td>' + number + '</td>');
        $("#tr_" + i).append('<td id="question_' + i + '">' + questions[i] + '</td>');
        $(".game_result").append('<div class="game_result_truepassword" id="truepassword_' + i + '">?</div>');
        $("#truepassword_" + i).append('<div class="game_result_truepassword_number">' + number + '</div>');
        var password_lines = "line_" + i;
        lines.push(password_lines);
        for (ii = 0; ii < passwords[i].length; ii++) {
            $("#game_body_row_row_" + i).append('<div class="game_body_column" id="game_body_column_' + ii + '" />');

            var path = "#game_body_row_row_" + i + "> #game_body_column_" + ii;
            var true_password_number = i + 1;
            if (true_password.charAt(i) == passwords[i].charAt(ii)) {
                console.log(true_password.charAt(i) + " and " + passwords[i].charAt(ii));
                $(path).append('<a class="game_body_column_number">' + true_password_number + '</div>');
            }

            if (ii == passwords[i].length - 1) {
                $(path).append('<input class="game_input line_' + i + '" id="input_' + input_num + '" onkeyup="checkPassword();" type="text" minlength="1" maxlength="1" tabindex="' + input_num + '"/>');
            } else {
                $(path).append('<input class="game_input line_' + i + '" id="input_' + input_num + '" onkeyup="skipToNext(this);" type="text" minlength="1" maxlength="1" tabindex="' + input_num + '"/>');
            }
            input_num++;
        }
    }
    var divHeight = $('.game_body_column').width();
    $('.game_body_column').css('height', divHeight + 'px');
});

// Check passwords

$(document).ready(function() {
    $(".game_input").click(function() {
        id = jQuery(this).attr("class");
        id = id.replace('game_input line_', '');
        $("tr td").removeClass("hover");
        $("#question_" + id).addClass('hover');
        checkPassword();
    });
});


function checkPassword() {
    var input_num = 1;
    var password_check = '';
    var password_all = [];
    for (i = 0; i < passwords.length; i++) {
        var password_check = '';
        for (ii = 0; ii < passwords[i].length; ii++) {
            var password_check = password_check + $("#input_" + input_num).val();
            input_num++;
        }
        password_all.push(password_check);
    }
    for (i = 0; i < passwords.length; i++) {
        if (passwords[i] == password_all[i]) {
            $("." + lines[i]).css("background", "green");
            $("." + lines[i]).attr('disabled', 'disabled');
            $("#truepassword_" + i).text(true_password.charAt(i));
        } else {
            if (password_all[i].length > 0) {
                $("." + lines[i]).css("background", "red");
            }
        }
    }
    checkFinally();
};

function checkFinally() {
    var truepassword_check = '';
    var truepassword_check_display = '';
    for (i = 0; i < passwords.length; i++) {
        var truepassword_check = $("#truepassword_" + i).text();
        var truepassword_check_display = truepassword_check_display + truepassword_check;
    }
    if (truepassword_check_display == true_password) {
        alert("Congratulate! You completed crossword!");
        // You can add your own end options here
    }
}


// Inputs tabindex

function skipToNext(elem) {
    if (event.keyCode != 18 || event.keyCode != 16) {
        var nextElemIndex = parseFloat(elem.getAttribute('tabindex')) + 1;
        document.querySelector('[tabindex="' + nextElemIndex + '"]').focus();
    }
};

// last update 06-04-2019, 9:44 UTC