function sleep(ms) {
	// fonction pour faire une petite  sleep
	return new Promise(resolve => setTimeout(resolve, ms));
  }


async function chargement(){

    await sleep(3000);

    $('.name_changed').animate(
        {opacity: 0},
        400
    );
    await sleep(1000);

    $('.name_changed').html('Gaetan Jonathan');
    $('.name_changed').animate(
        {opacity: 1},
        400
    );

    await sleep(2000);

    $('.name_changed').animate(
        {opacity: 0},
        400
    );

    await sleep(1000);

    $('.name_changed').html('Landris Daniel');
    $('.name_changed').animate(
        {opacity: 1},
        400,
    );

    await sleep(2000);

    started();
}


function started(){
	let html = `
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-xl-10 col-lg-12 col-md-9">
							<div class="card o-hidden border-0 shadow-lg my-5"  style="margin-top: 6.4% !important; border-radius: 0px 3px 3px 0px;" >
								<div class="card-body p-0">
									<div class="row">
										<div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
											<div class="col-lg-6">
												<div class="p-5">
													<div class="text-center">
														<h1 class="h4 text-gray-900 mb-2" style="color: #152733 !important; font-weight: bold !important;  font-size: 24px;">SE CONNECTER</h1>
														<p class="mb-4"> <br> Bénéficiez de nos services <br> Identifiez-vous </p>
													</div>
													<form id="mail_space" class="user">
														<div class="form-group">
															<input type="email" id="username" style="margin: 10px" class="form-control form-control-user"  list="dataMember" placeholder="Username">
															<datalist id="dataMember"></datalist>
														</div>
														<div class="form-group">
															<input type="password" id="passwd" style="margin: 10px" class="form-control form-control-user"  placeholder="Mot de passe">
														</div>
														<a style="color: white; background-color: #152733 !important; border: #152733;  font-size: 15px;" onclick="login()" class="loading-img btn btn-primary btn-user btn-block  pulse-button">
															<i class="fa fa-telegram" style="font-size: 20px;"></i> Envoyer
														</a>
													</form>
													<hr>
													<div style="font-size: 15px !important; background-color:#fff !important; padding-bottom: 1px !important;" class="alert-danger text-center">
														<!-- Erreur msoratra aketo -->
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>`;

$('body').html(html);

eel.getMember();
// une appel pour optimiser le traitement dans la partie main
}


$(function(){
    chargement();
});
