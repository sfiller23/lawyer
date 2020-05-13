
$('body').on('click','.toDelete',function(){
    var $el = $(this);
    deleteLead($el.data('val'));
});
$("#add_lead").click(function(event){
    event.preventDefault();
   // console.dir(event);
    addLead();

  });
function deleteLead(leadId) {
    $.ajax({
        url: '/lead/' + leadId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({leadId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+leadId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}

function addLead() {
    var name = $("#for_name").val();
    var email = $("#for_email").val();
    var text = $("#for_text").val();
    var phone = $("#for_phone").val();
    console.log(name, email, text);
    $.ajax({
        url: '/submit-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({name,email,text,phone}),
        type: 'POST',
        success: ((res) => {
            window.confirm("Thank you. We will contact you as soon as possible");
            window.location.href = "/";
           console.log(res);
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}
