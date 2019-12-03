async function password_change(rpr){
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


async function add_member(rpr){
    let frmp = rpr.parents('.ajouter');

    let user = frmp.find('.user_input').val();
    let pass = frmp.find('.password_input').val();
    $('.addCotbtn').html("<img src='assets/img/loading-white.gif'>");
 
    await eel.addUser(user, pass)(return_addUser);
}


function return_addUser(feed_back){
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


async function supprimer(rpr){
    let frmp = rpr.parents('.supprimer');

    let user = frmp.find('.user_input').val();
    let pass = frmp.find('.password_input').val();
    $('.addCotbtn').html("<img src='assets/img/loading-white.gif'>");
 
    await eel.delUser(user, pass)(return_supprimer);
}


function return_supprimer(feed_back){
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