const tokenCookieName = "accesstoken";
const RoleCookieName = "role"
const signoutBtn = document.getElementById("signout-btn");

signoutBtn.addEventListener("click", signout);

// getRole permet de récuperer de récuperer le rôle de l'utilisateur 
// et getCookie permet de recuperer les Cookie
// RoleCookieName nous permet de recuperer juste le rôle 
function getRole(){
    return getCookie(RoleCookieName);
}

// Pour déconnecter un utilisateur, il suffit de supprimer le cookie, et d’actualiser. 
// Nous pouvons donc exécuter cette méthode au clic sur le bouton déconnexion dans le menu.
function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload(); // permet de recharger la page après la deconnexion 
}



function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);
}



function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// Savoir si on est connecté
// Nous pouvons désormais créer une méthode retournant un booléen, 
// nous indiquant si nous sommes connectés ou non.
function isConnected(){
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}




// Une fois que nous avons récupéré tous ces éléments, nous devons en fonction de la valeur de ce 
// data attribute, et de la valeur de notre rôle, masquer l’élément.

// Voici le code de cette fonction, exécutée après le chargement de la page.
// ce script permet d'afficher ou de masquer les éléments en fonction de role
function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    // Cette méthode devra récupérer tous les éléments ayant le data attribute ‘data-show’. 
    // Nous pouvons les récupérer via ce sélecteur :
    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){
            case 'disconnected': 
                if(userConnected){
                    element.classList.add("d-none"); // d-none est une class Bootstrap pour display: none
                }
                break;
            case 'connected': 
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin': 
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'client': 
                if(!userConnected || role != "client"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}