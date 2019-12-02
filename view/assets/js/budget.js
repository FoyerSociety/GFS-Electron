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


function html1(){
    let hk1 = `
    <div class="buttons">
        <span class="cot" onclick="window.location='budget.html'"><button class="btnh"><i class="fa fa-bars"></i> Cotisation</button></span>
        <span class="dep" onclick="window.location='depense.html'" ><button class="btnh pulse-button"><i class="fa fa-bars"></i> Dépense</button></span>
        <span class="jir" onclick="window.location='jirama.html'"><button class="btnh" ><i class="fa fa-bars"></i> Jirama</button></span>
        <span class="det" onclick="window.location='dette.html'"><button class="btnh" ><i class="fa fa-bars"></i> Dette</button></span>
        <span class="stat" onclick="window.location='statistique.html'"><button class="btnh" ><i class="fa fa-bars"></i> Statistique</button></span>
        <span class="hist" onclick="window.location='historique.html'"><button class="btnh" ><i class="fa fa-bars"></i> Historique</button></span>
    </div>
    <hr class="sidebar-divider">
    <div class="wrap-login100 p-t-85 p-b-20">
        <form class="login100-form validate-form depense" >
            <span class="login100-form-title p-b-70">
                Dépense
            </span>

            <div class="entrer wrap-input100 validate-input m-t-85 m-b-35 userlog">
                    <input class="user_input input100 info1" type="text" list="dataMember">
                    <span class="focus-input100" data-placeholder="User"></span>
                    <datalist id="dataMember">
                        <!--Ici se place les suggesions de prenoms -->
                    </datalist>
            </div>

            <div class="entrer wrap-input100 validate-input m-b-50 somlog" >
                <input class="date_input input100 info2" type="date">
            </div>


            <div class="entrer wrap-input100 validate-input m-b-50 moilog" >
                <input class="somme_input input100 info2" type="text">
                <span class="focus-input100" data-placeholder="Somme"></span>
            </div>

            <div class="entrer wrap-input100 validate-input m-b-50 analog" >
                <input class="motif_input input100 info2" type="text" list="motif_suggest">
                <span class="focus-input100" data-placeholder="Motifs"></span>
                <datalist id="motif_suggest">
                    <option> Repas </option>
                    <option> Charbon </option>
                    <option> Grand Menage </option>
                    <option> Fête </option>
                </datalist>
            </div>

            <div class="container-login100-form-btn">
                <button disabled='disabled'  title="✘ Vous n'êtes pas autorisé ✘" class="addDepbtn private login100-form-btn" type="button" onclick=addDepense($(this))>
                    <i class="fa fa-angle-right"> <span class="text-btn">VALIDER</span> </i>
                </button>
            </div>
        </form>
    </div>`;
    $('.container-fluid').html(hk1);
}