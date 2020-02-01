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


function set_custom_privilege(val){

  if (val == 'su'){
      $('.private').each(function(){
          $(this).removeAttr('disabled');
          $(this).removeAttr('title');
      });
  }
  else{
    $('.private').each(function(){
      $(this).removeAttr('disabled');
      $(this).removeAttr('title');
    });
    $('.user_input').removeAttr('list');
    $('.user_input').attr('disabled', 'disabled');
    eel.getUser()(make_user_input)
  }

}


function make_user_input(user){
    $('.user_input').val(user);
    $('.user_input + span ').attr('data-placeholder', '');

}


function get_dataDate(){
  let Month = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre');

  for (let i=0; i<Month.length; i++){
      let mois = '<option>' + Month[i] + '</option>';
      $('#dataMonth').append(mois);

      // ci dessus une simple incrementation d'année
      if (i < 5){
        let year = 2019 + i;
        $('#dataYear').append('<option>' + year + '</option>' );
      }
  }
}


function decore_input(){
  // fonction midecore an le input
  $('.input100').each(function(){
      $(this).on('blur', function(){
          if($(this).val().trim() != "") {
              $(this).addClass('has-val');
          }
          else {
              $(this).removeClass('has-val');
          }
      })
  });
}

function remove_lact(){
  // mamafa class active an le menu sidebar
  $('#accordionSidebar li').each(function(){
    $(this).removeClass('lact');
  });
}


function remove_pulse(){
  // mamafa an le pulse button rehetra
  $('.buttons').find('button').each(function(){
    $(this).removeClass('pulse-button');
  });
}


function home_menu(){
  remove_lact();
  let html = `<div class="card" style="width: 20rem;margin-left: 5% !important;margin-top: 1%; background-color: #0e1419; border: none;">
      <h5 class="card-title text-center" style="font-size: 15px; color: #fff;">Le plat du jour | Budget</h5>
      <img src="assets/img/humb.jpg" class="card-img-top" style="opacity: 1;">
      <div class="card-body">
          <p id="menu_today" class="card-text text-center ordre"><img src="assets/img/home-load.gif"></p>
      </div>
    </div>
    <div class="card" style="width: 20rem;margin-left: 55% !important; margin-top: -32.3%; background-color: #0e1419; border: none;"">
      <h5 class="card-title text-center" style="font-size: 15px; color: #fff;">Cuisinier</h5>
      <img src="assets/img/cuis.jpg" class="card-img-top" style="opacity: 1;">
      <div class="card-body">
        <p class="card-text text-center ordre">Gaetan </p>
      </div>
    </div>
    <div class="card" style="width: 20rem;margin-left: 5% !important; margin-top: 0.8%; background-color: #0e1419; border: none;"">
      <h5 class="card-title text-center" style="font-size: 15px; color: #fff;">Tour de ménage | Demain</h5>
      <img src="assets/img/clean.jpg" class="card-img-top" style="opacity: 1;">
      <div class="card-body">
        <p class="card-text text-center ordre">Dinahasina </p>
      </div>
    </div>
    <div class="card" style="width: 20rem;margin-left: 55% !important; margin-top: -32.4%; background-color: #0e1419; border: none;"">
      <h5  class="card-title text-center" style="font-size: 15px; color: #fff;">Somme à payer</h5>
      <img src="assets/img/mon.png" class="card-img-top" style="opacity: 1;">
      <div class="card-body">
        <p id="somme_reste" class="card-text text-center ordre"><img src="assets/img/home-load.gif"></p>
      </div>
    </div>`;
  
  $('.container-fluid').html(html);
  $('#accueil_button').addClass('lact');
  eel.getUser()(setUser);
}


function budget_menu(val=false){
  remove_lact();
  let html = `<div class="buttons">
      <span id='budget_cotisation' class="cot" onclick="budget_cotisation()"><button class="btnh"><i class="fa fa-bars"></i> Cotisation</button></span>
      <span id='budget_depense' class="dep" onclick="budget_depense()" ><button class="btnh"><i class="fa fa-bars"></i> Dépense</button></span>
      <span id='budget_jirama' class="jir" onclick="budget_jirama()"><button class="btnh" ><i class="fa fa-bars"></i> Jirama</button></span>
      <span id='budget_dette' class="det" onclick="budget_dette()"><button class="btnh" ><i class="fa fa-bars"></i> Dette</button></span>
      <span id='budget_stat' class="stat" onclick="budget_stat()"><button class="btnh" ><i class="fa fa-bars"></i> Statistique</button></span>
      <span id='budget_history' class="hist" onclick="budget_history()"><button class="btnh" ><i class="fa fa-bars"></i> Historique</button></span>
    </div>
    <hr class="sidebar-divider">
    `;

    html_suite = `<i class="fa fa-bitcoin" style="font-size:200px"></i>
    <p 
    class="text-center" style="color: #fff; margin-top: 3%; width: 80%; margin-left: 10%;">Not all processes could be identified, non-owned process info will not be shown, you would have to be root to see it all
    </p>`;

  $('.container-fluid').html(html);
  if (val == false){ $('.container-fluid').append(html_suite) };
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
  decore_input();
  eel.getMember()(suggestMember);
  eel.privilege()(set_privilege);
  get_dataDate();
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
          <option> Huile </option>
          <option> Sel </option>
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
  decore_input();
  eel.getMember()(suggestMember);
  eel.privilege()(set_privilege);


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
  budget_menu(true);
  let hst = $('#budget_history');
  hst.find('button').addClass('pulse-button');
  html = `
        <div class="wrap-table100">
        <div class="table100 ver1 m-b-110">
          <div class="table100-head">
            <table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1">User</th>
                  <th class="cell100 column2">Somme</th>
                  <th class="cell100 column3">Motif</th>
                  <th class="cell100 column4">Date</th>
                </tr>
              </thead>
            </table>
          </div>

          <div class="table100-body js-pscroll">
            <table>
              <tbody class="tab_ref">
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  
  css = `<link rel="stylesheet" type="text/css" href="assets/css/transac.css">`;
  $('head').append(css);
  $('.container-fluid').append(html);
  eel.getHistory()(showHistory);
}


function membre_menu(){
  remove_lact();
  let html = `
  <li class="nav-item dropdown no-arrow mx-1">
          <div class="buttons buttons-membre">
            <span class="dep" data-toggle="dropdown"><button class="btnh submenu_acc pulse-button"><i class="fa fa-bars"></i> Comptes</button></span>
            <!-- Dropdown - Alerts -->
            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow dropcompte">
              <a class="dropdown-item d-flex align-items-center ditemc" onclick="membre_modifier()">
                Modifier un compte
              </a>
              <a class="dropdown-item d-flex align-items-center ditemc " onclick="membre_ajouter()">
                Ajouter un un compte
              </a>
              <a class="dropdown-item d-flex align-items-center ditemc" onclick="membre_supprimer()">
                Supprimer un compte
              </a>
              <a class="dropdown-item d-flex align-items-center ditemc" onclick="membre_list()">
                Liste des membres
              </a>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown no-arrow mx-1" onclick="assign_cotisation()">
          <div class="buttons buttons-ass">
              <span class="dep" data-toggle="dropdown"><button class="submenu_cot btnh"><i class="fa fa-bars"></i> Assignation cotisation</button></span>
          </div>
        </li>

  <hr class="sidebar-divider">`;

  $('.container-fluid').html(html);
  $('#membre_button').addClass('lact');
  remove_pulse();
}


function membre_modifier(){

  let html = `
    <div class="wrap-login100 p-t-85 p-b-20 formdc" style="margin-left:8.7% !important;">
      <form class="modifier login100-form validate-form">
        <span class="login100-form-title p-b-70">
          Changer le mot de passe
        </span>

    <div class="entrer wrap-input100 validate-input m-t-85 m-b-35 userlog" >
    <input class="user_input input100 info1" type="text" list="dataMember">
    <span class="focus-input100" data-placeholder="User"></span>
    <datalist id="dataMember">
    </datalist>
    </div>

    <div class="entrer wrap-input100 validate-input m-b-50 somlog" >
    <input class="password_input input100 info2" type="password">
    <span class="focus-input100" data-placeholder="Nouveau mot de passe"></span>
    </div>

    <div class="container-login100-form-btn">
    <button disabled='disabled' title="✘ Vous n'êtes pas autorisé ✘" type="button" class="addCotbtn private login100-form-btn" onclick=password_change($(this))>
    <i class="fa fa-angle-right"> <span class="text-btn">VALIDER</span> </i>
    </button>
    </div>

    </form>
    </div>`;

    membre_menu();
    $('.container-fluid').append(html);
    $('.submenu_acc').addClass('pulse-button');
    decore_input();
    eel.getMember()(suggestMember);       
    eel.privilege()(set_custom_privilege);

}


function membre_ajouter(){
  let html = `
      <div class="wrap-login100 p-t-85 p-b-20 formdc " style="margin-left:8.7% !important;">
    <form class="ajouter login100-form validate-form">
    <span class="login100-form-title p-b-70">
    Ajouter un compte
    </span>

    <div class="entrer wrap-input100 validate-input m-t-85 m-b-35 userlog" >
    <input class="user_input input100 info1" type="text">
    <span class="focus-input100" data-placeholder="User"></span>
    </div>

    <div class="entrer wrap-input100 validate-input m-b-50 somlog" >
    <input class="password_input input100 info2" type="password">
    <span class="focus-input100" data-placeholder="Mot de passe"></span>
    </div>

    <div class="container-login100-form-btn">
    <button disabled='disabled' title="✘ Vous n'êtes pas autorisé ✘" type="button" class="addCotbtn private login100-form-btn" onclick=add_member($(this))>
    <i class="fa fa-angle-right"> <span class="text-btn">VALIDER</span> </i>
    </button>
    </div>

    </form>
    </div>`;

    membre_menu();
    $('.container-fluid').append(html);
    $('.submenu_acc').addClass('pulse-button');
    decore_input();
    eel.privilege()(set_privilege);

}


function membre_supprimer(){
  let html = `<div class="wrap-login100 p-t-85 p-b-20 formdc" style="margin-left:8.7% !important;">
    <form class="supprimer login100-form validate-form">
    <span class="login100-form-title p-b-70">
    Supprimer un compte
    </span>

    <div class="entrer wrap-input100 validate-input m-t-85 m-b-35 userlog" >
    <input class="user_input input100 info1" type="text" list="dataMember">
    <span class="focus-input100" data-placeholder="User"></span>
    <datalist id="dataMember">
    </datalist>
                      </div>

                      <div class="entrer wrap-input100 validate-input m-b-50 somlog" >
                              <input class="password_input input100 info2" type="password">
                              <span class="focus-input100" data-placeholder="Mot de passe Admin"></span>
                      </div>

    <div class="container-login100-form-btn">
    <button disabled='disabled' title="✘ Vous n'êtes pas autorisé ✘" type="button" class="addCotbtn private login100-form-btn" onclick=supprimer($(this))>
    <i class="fa fa-angle-right"> <span class="text-btn">VALIDER</span> </i>
    </button>
    </div>

    </form>
    </div>`;
  membre_menu();
  $('.container-fluid').append(html);
  $('.submenu_acc').addClass('pulse-button');
  decore_input();
  eel.getMember()(suggestMember);
  eel.privilege()(set_privilege);
}


function membre_list(){
    membre_menu();
    $('.submenu_acc').addClass('pulse-button');
}


function assign_cotisation(){
    html = `<div class="wrap-login100 p-t-85 p-b-20" style="margin-left:8.7% !important">
      <form class="assigner login100-form validate-form">
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
          <span class="focus-input100" data-placeholder="Somme Mois"></span>
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
          <button disabled='disabled' title="✘ Vous n'êtes pas autorisé ✘" type="button" class="addCotbtn private login100-form-btn" onclick=assigner($(this))>
            <i class="fa fa-angle-right"> <span class="text-btn">VALIDER</span> </i>
          </button>
        </div>

        <!-- <div class='notif-cotisation text-center'> -->
          <!-- afficher la notification -->
        <!-- </div> -->

      </form>
    </div>`;
    membre_menu();
    $('.container-fluid').append(html);
    $('.submenu_cot').addClass('pulse-button');
    decore_input();
    eel.getMember()(suggestMember);
    $('#dataMember').append(`<option>foyer<option>`);
    get_dataDate();
    eel.privilege()(set_privilege);


}


function deconnexion(){
    window.location='login.html';
}


$(function(){
  eel.getUser()(setUser);
});


function setUser(val){
  $('.user_top').text(val);
  eel.resteSomme(val)(print_resteSomme);
  eel.getMenu()(print_getMenu);
  eel.getCuisinier()(print_getCuisinier);
}


function print_resteSomme(somme){
  $('#somme_reste').html(somme+ ' Ar');
  $('#somme_reste').css('border', '1px solid rgb(223, 43, 79)');
  $('#somme_reste').css('background-color', 'rgb(223, 43, 79)');
}


function print_getMenu(val){
  $('#menu_today').html(val+ ' Ar');
  $('#menu_today').css('border', '1px solid rgb(223, 43, 79)');
  $('#menu_today').css('background-color', 'rgb(223, 43, 79)');
}


function print_getCuisinier(val){
  $('#cuisinier_today').html(val);
  $('#cuisinier_today').css('border', '1px solid rgb(223, 43, 79)');
  $('#cuisinier_today').css('background-color', 'rgb(223, 43, 79)');
}


function showHistory(value){
  if (value[0] == true ){
      for (let i=0; i<value[1].length;i++){
        html = `
        <tr class="row100 body">
          <td class="cell100 column1">${value[1][i][4]}</td>
          <td class="cell100 column2">${value[1][i][1]} Ar</td>
          <td class="cell100 column3">${value[1][i][3]}</td>
          <td class="cell100 column4">${value[1][i][2]}</td>
        </tr>`;
      $('.tab_ref').append(html);
      }
  }
}
