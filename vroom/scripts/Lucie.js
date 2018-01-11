

function deconnexion () {
	userConnexion = null;
	passwordConnexion = null;
	//suppression du bouton après déconnexion => Voir fct connexion
	document.getElementById("connexion").innerHTML = '<a class="main-nav-link" href="./connexion.htm" title="connexion">Connexion</a>';
	document.getElementById("boutonDeco").innerHTML = '';
}

function connexion() {
	document.getElementById("boutonDeco").innerHTML = '<button onclick="deconnexion()">Déconnexion</button>';
	document.getElementById("connexion").innerHTML = '';
}