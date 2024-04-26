//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail= document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

// lorsqu'on click sur ce boutton, c'est-à-dire qu'on inscrit un utilisateur 
btnValidation.addEventListener("click", InscrireUtilisateur);


function validateForm(){
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

    if(nomOk && prenomOk && mailOk && passwordOk && passwordConfirmOk){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }
}


// Cette fonction permet de confirmer le mot de passe
function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}


/*

Regex Password : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

Explication du regex :

^ : début de la chaîne.

(?=.*[a-z]) : recherche d'au moins une lettre minuscule.

(?=.*[A-Z]) : recherche d'au moins une lettre majuscule.

(?=.*\d) : recherche d'au moins un chiffre.

(?=.*[\W_]) : recherche d'au moins un caractère spécial (caractère non alphanumérique).

[A-Za-z\d\W_]{8,} : recherche de huit caractères ou plus qui peuvent être soit des lettres (majuscules ou minuscules), soit des chiffres, soit des caractères spéciaux (caractères non alphanumériques).

$ : fin de la chaîne.

*/


function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}




/*
Expression régulière : `^[^\s@]+@[^\s@]+\.[^\s@]+$`

Dans cette expression régulière, nous cherchons à identifier une adresse e-mail. Voici ce que signifient les différents éléments de l'expression :

^ : début de la chaîne.

[^\s@]+ : recherche un ou plusieurs caractères qui ne sont ni des espaces (\s) ni des arobases (@).

@ : recherche le caractère « @ ».

[^\s@]+ : recherche un ou plusieurs caractères qui ne sont ni des espaces (\s) ni des arobases (@).

\. : recherche le caractère point (il doit être échappé car le point est un caractère spécial en expression régulière).

[^\s@]+ : recherche un ou plusieurs caractères qui ne sont ni des espaces (\s) ni des arobases (@).

$ : fin de la chaîne.

*/


function validateMail(input){
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}


function validateRequired(input){
    if(input.value !=''){
        input.classList.add("is-valid"); // is-valid est une classe bootstrap
        input.classList.remove("is-invalid;") // is-invalid est une classe bootstrap
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
    
}

function InscrireUtilisateur(){
    let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
    "firstName": "Test fetch",
    "lastName": "test test fetch",
    "email": "testdepuisQuaiAntique@email.com",
    "password": "Azerty11"
});

let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://127.0.0.1:8000/api/registration", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}