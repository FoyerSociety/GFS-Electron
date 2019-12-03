
async function login(){
    $('.loading-img').html("<img src='assets/img/loading-login-38px.gif'>");
    $('.alert-danger').html('');
    await eel.login( $('#username').val(), $('#passwd').val() )(validateLogin);
}


function validateLogin(response){
    if (response == true){
        eel.setUser($('#username').val());
        window.location ='main.html';
    }
    else{
        let error = `<p>  ${response} </p>`;
        $('.alert-danger').html(error);
        $('.loading-img').html(`<i class="fa fa-telegram" style="font-size: 20px;"></i> Envoyer`);
    }

}


eel.getMember();
// une appel pour optimiser le traitement dans la partie main