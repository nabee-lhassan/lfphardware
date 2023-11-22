var lang='f';
window.location.pathname.split('/').pop() == 'index.htm' ? lang='f' : lang='e' ;

$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    lang=='en' ? $('#success').html('<div class="mail-success">Your message has been sent.') : $('#success').html('<div class="mail-success">Votre message a été envoyé.');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    lang=='en' ? $('#success').html('<div class="mail-failure">Sorry&mdash;it seems that this no response from the mail server.<br /><br />Please try again later!') : $('#success').html('<div class="mail-failure">Désolé&mdash;il semble qu\'il n\'y a pas eu de réponse du serveur de messagerie. S\'il vous plaît réessayer plus tard!');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
