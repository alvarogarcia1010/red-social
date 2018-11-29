function isEmpty()
{
    if(this.is("select"))
    {
        return this.val() == "";
    }
    else
    {
        return $.trim(this.val()) == "";
    }
};

function callToPage(pageRefInput){
    $.ajax(
    {
        url: pageRefInput,
        type: "GET",
        dataType: "text",

        success: function( response ) {
            mainContainer = response.split("<!-- mainContainer -->");
            $('#main-content').html(mainContainer[1]);
        }
    });
}


$(document).ready(function()
{
    console.log('i am ready');
    $('#send-mail-recover-pass').on('click',function(e){
        e.preventDefault();
        $.ajax({
            url: '/forgot',
            type: "POST",
            dataType: "json",
            data: {email: $('#email').val()},

            success: function(response){
                //alertify.alert("Mensaje enviado con éxito. Favor revise su correo.", function(){alertify.message('OK');});
                $('#recoverPass').modal('hide');
                alertify.success('Mensaje Enviado. Favor revise su correo.');
                console.log(response);
            }
        })
    });

    $('#aup-home').on('click', function(e){
        e.preventDefault();
        var pageRef = $(this).attr('href');
        callToPage(pageRef);
        history.pushState(null, "", "home");
    });

    $('#aup-profile').on('click', function(e){
        e.preventDefault();
        var pageRef = $(this).attr('href');
        callToPage(pageRef);
        history.pushState(null, "", pageRef);
    });

    $('#aup-notification').on('click', function(e){
        e.preventDefault();
        var pageRef = $(this).attr('href');
        callToPage(pageRef);
        history.pushState(null, "", "notifications");
    });

    $('#aup-messages').on('click', function(e){
        e.preventDefault();
        var pageRef = $(this).attr('href');
        callToPage(pageRef);
        history.pushState(null, "", "messages");
    });

    $('#aup-config').on('click', function(e){
        e.preventDefault();
        var pageRef = $(this).attr('href');
        callToPage(pageRef);
        history.pushState(null, "", "config");

    });

    $('#aup-dashboard').on('click', function(e){
        e.preventDefault();
        var pageRef = $(this).attr('href');
        callToPage(pageRef);
        history.pushState(null, "", "dashboard");

    });

    //console.log("ready from dashboard!");
    //$('#user-register').DataTable();
    

    $("#input-20").fileinput({
        browseClass: "btn btn-primary btn-block",
        showCaption: false,
        showRemove: false,
        showUpload: false
    });

    var btnCust = '<button type="button" class="btn btn-secondary" title="Add picture tags" ' +
    'onclick="alert(\'Call your custom code here.\')">' +
    '<i class="fas fa-user"></i>' +
    '</button>';
    $("#avatar-1").fileinput({
        theme: "fas",
        //autoOrientImage: false,
        overwriteInitial: true,
        showUpload: true,
        maxFileSize: 1500,
        showClose: false,
        showCaption: false,
        browseLabel: '',
        removeLabel: '',
        browseIcon: '<i class="fas fa-folder-open"></i>',
        removeIcon: '<i class="fas fa-trash-alt"></i>',
        removeTitle: 'Cancel or reset changes',
        elErrorContainer: '#kv-avatar-errors-1',
        msgErrorClass: 'alert alert-block alert-danger',
        defaultPreviewContent: '<img src="https://s.gravatar.com/avatar/31e81597c7a59321931c6a76324c13fd?s=100" alt="Your Avatar">',
        layoutTemplates: { main2: '{preview} ' + btnCust + ' {remove} {browse}' },
        allowedFileExtensions: ["jpg", "png", "gif"]
    });

});

setTimeout(function(){
    $('#login-error-alert').alert('close');
    $('#signup-error-alert').alert('close');
}, 5000);
