$(function(){
    eel.getHistory()(showHistory);
});


function showHistory(val){
    if (val[0] == true){
        let  mdl = $('.history');

        for (let i=0; i<val[1].length; i++){
            let tmp = mdl.clone();
            tmp.find('.column1').html(val[1][i][2])
            tmp.find('.column2').html(val[1][i][1])
            tmp.find('.column3').html(val[1][i][4])
            tmp.find('.column4').html(val[1][i][3])

            mdl.parent().append(tmp);
        }

        mdl.remove();
    }
    else if (val[0] == false){
        alert("Une erreur s'est produite")
    }
    
}