//fichier js pour verifier la création de compte


//fonction appelée par le bouton du formulaire de création de compte
function check()
{
	let usr = document.getElementById('username').value;
	let pwd = document.getElementById('password').value;

	//1-verifier username est valide (e-mail 1@2(.2)
	if(!checkUsername(usr))
	{
		dispStatusMsg("Le nom utilisateur n'est pas de la forme a[.a]@aa.aa", 'nok');
		return;
	}
	//2-verifier password >1 caractère
	if(!checkPassword(pwd))
	{
		dispStatusMsg('Le mot de passe est trop court','nok');
		return;
	}
	//3-vérifier que username n'existe pas déja
	if (checkExistingUser(usr))
	{
		dispStatusMsg("L'utilisateur éxiste déjà",'nok');
		return;
	}
	//4-écrire en mémoire (locale)
	adduser(usr, pwd);
	dispStatusMsg("utilisateur enregistré");
}

function checkUsername(username)
{
	//https://regex101.com/ pour vérifier. C'était fun !
	const regex = /^[a-z0-9]+\.?[a-z0-9]*@[a-z0-9]{2,}\.[a-z0-9]{2,}$/img;
	/*
	soit un mail de forme a.b@c.d
		* a vaut au moins un caractère
		* . est facultatif
		* b est facultatif
		* @ est obligatoire
		* c vaut au moins 2 caractères
		* . est obligatoire (pas d'addresses locales, désolé)
		* d vaut au moins 2 caractères

	le terme caractère signifie : abcdefghijklmnopqrstuvwxyz0123456789
	les tirets et underscores et autres trucs fancy sont ignorés
	les sous domaines @sous.domaine.tld sont ignorés
	les mails mega composés jean.louis.david@ sont ignorés

	les flags sont
		* i pour ignorer la casse (a == A)
		* m (uniquement pour faire des tests sur un pavé de texte)
		* g (idem)

	tests :
		OK :
			a@aa.aa
			a.a@aa.aa
			bob.razowsky@monsters.inc
			nom.@bob.fr
		NOK
			a@a.a (voir les 2 ci dessous)
			a@aa.a (tld trop court)
			a@a.aa (domain trop court)
			jean.louis.david@aaa.aa (username non géré)
			bob.razowsky@monsters.inc.disney (sous domaines non géré)
	*/
	return(regex.test(username));
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
		//si la BDD est vide l'utilisateur n'existe pas !
		return false;
	}

	let listUsers = JSON.parse(users);
	//pour chaque user, comaprer le nom
	for (let i = 0; i < listUsers.length; i++)
	{
		if (listUsers[i].name === username) //todo
		{
			//indiquer un résultat positif dès le premier trouvé
			return true;
		}		
	}
	//si l'on a parcouru toute la liste et que l'on a rien trouvé
	return false;
}

//enregistre la paire usr:pwd dans la BDD
function adduser(username, password)
{
	let users = localStorage.getItem("users");
	if (users == null)
	{
		users = '[]';
	}
	let listUsers = JSON.parse(users);
	listUsers.push({name: username, pwd: password});
	localStorage.setItem("users", JSON.stringify(listUsers));
}

//affiche un message pour l'utilisateur dans la fenêtre
function dispStatusMsg(message, css_class = 'ok')
{
	let ctnr = document.getElementById('statusMsg');
	ctnr.innerHTML = message;
	ctnr.className = 'info-' + css_class;
}