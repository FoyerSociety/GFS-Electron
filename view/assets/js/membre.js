async function password_change(rpr){
    alert('here');
    let frmp = rpr.parents('.modifier');

    let user = frmp.find('.user_input').val();
    let pass = frmp.find('.password_input').val();
    $('.addCotbtn').html("<img src='assets/img/loading-white.gif'>");
    await eel.passwd(user, pass)(return_passwd)
}


function return_passwd(feed_back){
  let btnval= "<i class='fa fa-angle-right'> <span class='text-btn'>VALIDER</span> </i>";
  $('.addCotbtn').html(btnval);

  if (feed_back == 1){
      $('.loading-img-cot').html('');
      alert('Opération réussie');
  }
  else if (feed_back == 0){
      alert('Opération echouée');
  }
}
