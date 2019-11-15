function suggestMember(members){
    for (let i=0; i<members.length; i++){
        let usr = `<option>${members[i]}<option>`;
        $('#dataMember').append(usr);
    }
    

}

eel.getMember()(suggestMember); 
// appel d'une requete de tous les membres pour l'autosuggestion


$( function(){

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

    
    let Month = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre');
    
    for (let i=0; i<Month.length; i++){
        let mois = '<option>' + Month[i] + '</option>';
        $('#dataMonth').append(mois);
        
        // ci dessus une simple incrementation d'année
        let year = 2019 + i
        $('#dataYear').append('<option>' + year + '</option>' )
    }

}
);