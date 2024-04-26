import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []), //quand c'est le tableau vide, tout le monde peut le voir
    new Route("/galerie", "La galerie", "/pages/galerie.html", [], "/js/galerie.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"), // uniquement les utilisateurs déconnecter peuvent le voir
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"), // uniquement les utilisateurs déconnecter peuvent le voir
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"]), // Cette page est vue que par le client ou l'admin
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]), // Cette page est vue que par le client ou l'admin
    new Route("/allResa", "Vos réservations", "/pages/reservations/allResa.html", ["client"]), // Cette page est vue que par le client 
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html", ["client"]), // Cette page est vue que par le client
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";