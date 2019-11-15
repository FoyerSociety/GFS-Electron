function addCotisation(rpr){
    let frmp = rpr.parents('.cotisation');
    
    let user = frmp.find('.user_input').val();
    let somme = frmp.find('.somme_input').val();
    let mois = frmp.find('.mois_input').val();
    let annee = frmp.find('.annee_input').val();
    $('.addCotbtn').html("<img src='assets/img/loading-white.gif'>");
    eel.addCotisation(user, somme, mois, annee)(feedCot);
}


function feedCot(feed_back){
    let btnval= "<i class='fa fa-angle-right'> <span class='text-btn'>VALIDER</span> </i>";
    $('.addCotbtn').html(btnval);
    if (feed_back == 1){
        $('.loading-img-cot').html('');
        alert('La transaction a reussi');
    }
    else if (feed_back == 0){
        alert('La transaction a echoué');
    }
}
