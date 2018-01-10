//fichier js pour verifier la création de compte


//fonction appelée par le bouton du formulaire de création de compte
function check()
{
	let usr = document.getElementById('username');
	let pwd = document.getElementById('password');
	//1-verifier username est valide (e-mail 1@2(.2)
	if(!checkUsername(username))
	{
		//-> msg erreur 1
		errorMsg = 'erreur nom utilisateur';
		dispError(errorMsg);
		return;
	}

	//2-verifier password >1 caractère
	if(!checkPassword(password))
	{
		//-> msg erreur 2
		errorMsg = 'erreur mot de passe trop court';
		dispError(errorMsg);
		return;
	}
	//3-vérifier que username n'existe pas déja
	if (checkExistingUser(username)) {
		//-> msg erreur 3
		errorMsg = 'erreur utilisateur déjà existant';
		dispError(errorMsg);
		return;
	}
	//4-écrire en mémoire (locale)
		adduser(username, password);
		dispError("c'est fait!!!");
	//-> msg OK
	//-> msg erreur 4
}


function checkUsername(username)
{
	//marche pas encore
	//source : https://www.regextester.com/19
	let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
	if(regex.localeCompare(username) == 0 )
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkPassword(password)
{
	return (password.length >= 1);
}

function checkExistingUser(username)
{
	let users = localStorage.getItem("users");
	if (users == null)
	{
		users = {};//<-valider le format par défaut
	}

	for (var i = 0; i < users.length; i++) {
		if (user[i].name == username) {
			return true;
		}		
	}
	return false;
}

function adduser(username, password) {
let users = localStorage.getItem("users");
	if (users == null)
	{
		users = {};//<-valider le format par défaut
	}
	var objetUsers = JSON.parse(users);
	objetUsers.push({
		name: username,
		pwd: password
	})

  localStorage.setItem("users", JSON.stringify(objetUsers));

}

function dispError(message)
{
	let msgCtnr = document.getElementById('errorMsg');
	msgCtnr.innerHTML = message;
}

let errorMsg = '';