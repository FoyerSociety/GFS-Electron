function addCotisation(rpr){
    let frmp = rpr.parents('.cotisation');
    
    let user = frmp.find('.user_input').val();
    let somme = frmp.find('.somme_input').val();
    let mois = frmp.find('.mois_input').val();
    let annee = frmp.find('.annee_input').val();
    $('.loading-img-cot').html("<img src='assets/img/loading-44.gif'>");
    eel.addCotisation(user, somme, mois, annee)(feedCot);
}


function feedCot(feed_back){
    if (feed_back == 1){
        alert('La transaction a reussi');
    }
    else if (feed_back == 0){
        alert('La transaction a echoué');
    }
}
