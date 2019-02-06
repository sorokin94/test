// tabs
$('.tabs .tab').on('click', function() {
    var tab_id = $(this).attr('data-tab');
    $('.tabs .tab').removeClass('active');

    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('.tab-content').removeClass('hide');
    $("#" + tab_id).addClass('active');
    $('#forgot-pass').removeClass('active');
    $('#forgot').text('Forgot your password?');
    $('#forgot').removeClass('f-form');
});
// forgot password
$('#forgot').on('click', function() {
    if ($(this).hasClass('f-form')) {
        $(this).parent('.tab-content').removeClass('hide');
        $(this).removeClass('f-form');
        $('#forgot-pass').removeClass('active');
        $(this).text('Forgot your password?');
    } else {
        $(this).parent('.tab-content').addClass('hide');
        $(this).addClass('f-form');
        $(this).text('Back to log-in');
        $('#forgot-pass').addClass('active');
    }
});
// hide/show pass
$('.hide-pass').on('click', function() {
    if ($(this).parent().children('input').attr('type') === 'password') {
        $(this).parent().children('input').attr('type', 'text');
        $(this).text('Hide');
    } else {
        $(this).parent().children('input').attr('type', 'password');
        $(this).text('Show');
    }
});
// open modal
$('.sign div').on('click', function() {
    $('.modal-overlay').addClass('open');
    $('.tabs .tab').removeClass('active');
    $('.tab-content').removeClass('active');
    if ($(this).hasClass('si')) {
        $('.tabs .tab').first().addClass('active');
        $("#tab-1").addClass('active');
    } else {
        $('.tabs .tab').next().addClass('active');
        $("#tab-2").addClass('active');
    }
});
// close modal
function closeModal() {
    $('.modal-overlay').removeClass('open');
    $('#forgot-pass').removeClass('active');
    $('#forgot').text('Forgot your password?');
    $('#forgot').removeClass('f-form');
    $('.tab-content').removeClass('hide');
    $('.modal .input input').val('');
}
$(document).mouseup(function(e) {
    if (!$(".modal").is(e.target) &&
        $(".modal").has(e.target).length === 0) {
        closeModal();
    }
});
/*$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        closeModal();
    }
});*/
// checkbox
$('#chb2').on('click', function(){
	if ($(this).attr('checked') == 'checked'){
		$(this).removeAttr('checked');
	}
	else{
	$(this).attr('checked','checked');}
});
//validation
$(document).ready(function() {
    var email = false;
    var pass = false;
    var username = false;

    var regexpEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regexpUser = /^[a-z0-9]+$/i;
    var regexpPass = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]/i;
    var regexpNum = /^[0-9]+$/i;
    //login
    $("#tab-1").submit(function(event) {
        event.preventDefault();
        var email = $("#log_email").val();
        var password = $("#log_pass").val();
        //email
        if ((email.length > 2) && (regexpEmail.test(email))) {
            $("#log_email").parent().removeClass('error');
            email = true;
        } else {
            $("#log_email").parent().addClass('error');
            
            email = false;
        }
        //password
        if ((password.length > 2) && (regexpUser.test(password))) {
            $("#log_pass").parent().removeClass('error');
            pass = true;
        } else {
            $("#log_pass").parent().addClass('error');
            pass = false;
        }
        if (email == true && pass == true) {
            $("#tab-1").unbind('submit').submit();
        }
    });
    //register
    $("#tab-2").submit(function(event) {
        event.preventDefault();
        var username = $("#reg_username").val();
        var email = $("#reg_email").val();
        var password = $("#reg_pass1").val();
        var password2 = $("#reg_pass2").val();
        //username
        if ((username.length > 2) && (regexpUser.test(username)) && (!regexpNum.test(username[0]))) {
            $("#reg_username").parent().removeClass('error');
            username = true;
        } else {
            $("#reg_username").parent().addClass('error');
            username = false;
        }
        //email
        if ((email.length > 2) && (regexpEmail.test(email))) {
            $("#reg_email").parent().removeClass('error');
            email = true;
        } else {
            $("#reg_email").parent().addClass('error');
            email = false;
        }
        //password
        if ((password.length > 2) && (regexpPass.test(password)) && (password == password2)) {
            $("#reg_pass1").parent().removeClass('error');
            $("#reg_pass2").parent().removeClass('error');
            pass = true;
        } else {
            $("#reg_pass1").parent().addClass('error');
            $("#reg_pass2").parent().addClass('error');
            pass = false;
        }
        if ((email == true) && (pass == true) && (username == true) && ($('#chb2').attr("checked") == 'checked')) {
            $("#tab-2").unbind('submit').submit();
        }
    });
    //forgot pass
    $("#forgot-pass").submit(function(event) {
        event.preventDefault();
        var email = $("#forgot_email").val();
        //email
        if ((email.length > 2) && (regexpEmail.test(email))) {
            $("#forgot_email").parent().removeClass('error');
            email = true;
        } else {
            $("#forgot_email").parent().addClass('error');
            email = false;
        }
        if (email == true) {
            $("#forgot-pass").unbind('submit').submit();
        }
    });
});