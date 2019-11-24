async function addCotisation(rpr){
    let frmp = rpr.parents('.cotisation');
    
    let user = frmp.find('.user_input').val();
    let somme = frmp.find('.somme_input').val();
    let mois = frmp.find('.mois_input').val();
    let annee = frmp.find('.annee_input').val();
    $('.addCotbtn').html("<img src='assets/img/loading-white.gif'>");
    await eel.addCotisation(user, somme, mois, annee)(feedCot);
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


async function addDepense(rpr){
    let form = rpr.parents('form');

    let user = form.find('.user_input').val();
    let date = form.find('.date_input').val();
    let somme = form.find('.somme_input').val();
    let motif = form.find('.motif_input').val();
    $('.addDepbtn').html("<img src='assets/img/loading-white.gif'>");
    await eel.addDepense(user, date, somme, motif)(fedDep);
}


function fedDep(val){
    let btnval= "<i class='fa fa-angle-right'> <span class='text-btn'>VALIDER</span> </i>";
    $('.addDepbtn').html(btnval);

    if (val == true){
        alert('La Transaction a réussi');
    }
    else if (val == false){
        alert('La Transaction a echoué');
    }
}



function set_privilege(val){

    if (val == 'su'){
        $('.private').each(function(){
            $(this).removeAttr('disabled');
            $(this).removeAttr('title');
        });
    }
    else{
        $('.private').each(function(){
            $(this).attr('disabled', 'disabled');

        });
    }

}


eel.privilege()(set_privilege)