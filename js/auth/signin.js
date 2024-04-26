const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSignin");

btnSingin.addEventListener("click", checkCredentials); // Credentials sont les informations de connexion

function checkCredentials(){
    // Ici, il faudra appeler l'API pour vérifier les credentials en BDD

    if(mailInput.value == "test@mail.com" && passwordInput.value == "123"){
        
        // si on est connecté, nous seront redigirer vers la page d'accueil gràce à ("/")

        // Il faudra recuperer le vrai token
        const token = "jfnhdflkjfjhfdlkfkdhflhflhfldlfdfkdf"
        setToken(token);
        // placer ce token en cookie

        // Lorsque nous nous connectons, nous ajoutons un cookie s'appelant "role"
        setCookie(RoleCookieName, "admin", 7); // 7 est le nombre de jour que le cookie va durer 



        window.location.replace("/");
    }
    else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}