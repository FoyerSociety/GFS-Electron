function budget_menu(){

  let html = `<div class="buttons">
      <span id='budget_cotisation' class="cot" onclick="budget_cotisation()"><button class="btnh"><i class="fa fa-bars"></i> Cotisation</button></span>
      <span id='budget_depense' class="dep" onclick="budget_depense()" ><button class="btnh"><i class="fa fa-bars"></i> Dépense</button></span>
      <span id='budget_jirama' class="jir" onclick="budget_jirama()"><button class="btnh" ><i class="fa fa-bars"></i> Jirama</button></span>
      <span id='budget_dette' class="det" onclick="budget_dette()"><button class="btnh" ><i class="fa fa-bars"></i> Dette</button></span>
      <span id='budget_stat' class="stat" onclick="budget_stat()"><button class="btnh" ><i class="fa fa-bars"></i> Statistique</button></span>
      <span id='budget_history' class="hist" onclick="budget_history()"><button class="btnh" ><i class="fa fa-bars"></i> Historique</button></span>
    </div>
    <hr class="sidebar-divider">`;

  $('.container-fluid').html(html);
  $('#accueil_button').removeClass('lact');
  $('#budget_button').addClass('lact');

}


function budget_cotisation(){
  budget_menu();
  let cot = $('#budget_cotisation');
  cot.find('button').addClass('pulse-button');

  html = `<div class="wrap-login100 p-t-85 p-b-20">
    <form class="cotisation login100-form validate-form">
      <span class="login100-form-title p-b-70">
        Cotisation
      </span>

      <div class="entrer wrap-input100 validate-input m-t-85 m-b-35 userlog" >
        <input class="user_input input100 info1" type="text" list="dataMember">
        <span class="focus-input100" data-placeholder="User"></span>
        <datalist id="dataMember">
        </datalist>
      </div>

      <div class="entrer wrap-input100 validate-input m-b-50 somlog" >
        <input class="somme_input input100 info2" type="text">
        <span class="focus-input100" data-placeholder="Somme"></span>
      </div>

      <div class="entrer wrap-input100 validate-input m-b-50 moilog" >
        <input class="mois_input input100 info2" type="text" list="dataMonth">
        <span class="focus-input100" data-placeholder="Mois"></span>
        <datalist id="dataMonth">
          <!-- Ici se place les 12 mois de l'année -->
        </datalist>
      </div>

      <div class="entrer wrap-input100 validate-input m-b-50 analog" >
        <input class="annee_input input100 info2" type="text" list="dataYear">
        <span class="focus-input100" data-placeholder="Année"></span>
        <datalist id="dataYear">
          <!-- Ici se place 10 années -->
        </datalist>
      </div>

      <div class="container-login100-form-btn">
        <button disabled='disabled' title="✘ Vous n'êtes pas autorisé ✘" type="button" class="addCotbtn private login100-form-btn" onclick=addCotisation($(this))>
          <i class="fa fa-angle-right"> <span class="text-btn">VALIDER</span> </i>
        </button>
      </div>

      <!-- <div class='notif-cotisation text-center'> -->
        <!-- afficher la notification -->
      <!-- </div> -->

    </form>
  </div>`;

  $('.container-fluid').append(html);
}


function budget_depense(){
  budget_menu();
  let dep = $('#budget_depense');
  dep.find('button').addClass('pulse-button');

  let html = `<div class="wrap-login100 p-t-85 p-b-20">
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

  $('.container-fluid').append(html);


}


function budget_jirama(){
  budget_menu();
  let jrm = $('#budget_jirama');
  jrm.find('button').addClass('pulse-button');
}


function budget_dette(){
  budget_menu();
  let det = $('#budget_dette');
  det.find('button').addClass('pulse-button');
}


function budget_stat(){
  budget_menu();
  let stat = $('#budget_stat');
  stat.find('button').addClass('pulse-button');
}


function budget_history(){
  budget_menu();
  let hst = $('#budget_history');
  hst.find('button').addClass('pulse-button');
}


function remove_pulse(){
  $('.buttons').find('button').each(function(){
    $(this).removeClass('pulse-button');
  })
}
