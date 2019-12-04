function sleep(ms) {
	// fonction pour faire une petite  sleep 
	return new Promise(resolve => setTimeout(resolve, ms));
  }



$(function(){
    chargement();
});



async function chargement(){

    await sleep(4000);

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

    window.location = 'login.html';
}
