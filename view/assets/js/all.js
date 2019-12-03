function suggestMember(members){
    for (let i=0; i<members.length; i++){
        let usr = `<option>${members[i]}<option>`;
        $('#dataMember').append(usr);
    }
}


eel.expose(afficher)
function afficher(val){
    alert(val);
}


function setUser(val){
    $('.user_top').text(val);
}


eel.getUser()(setUser);

