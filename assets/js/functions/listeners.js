let verifAll = {
    'prenom' : 0,
    'nom' : 0,
    'email' : 0,
    'mdp' : 0,
    'conf' : 0,
};

const listenerFunction = {
    toggleInputType: (ev) => {
        ev.target.classList.toggle('fa-eye-slash');
        // console.log('Click détecté');

        let input = ev.target.parentNode.children[0];

        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
        // console.log(input);
    },
    checkFirstName : (ev) => {
        const content = ev.target.value.trim();
        let error = '';
        document.getElementById('error-name').innerHTML = '';
        if(!content){
            error = 'Le champ ne doit pas etre vide';
        }else if(!/^[a-zA-Z]{4,20}$/.test(content)){
            error = `votre prenom n'est pas valide`;
        }
        if(error){
            document.getElementById('error-name').innerHTML = error;
            verifAll['prenom'] = 0;
        }else{
            verifAll['prenom'] = 1;
        }
        // console.log(verifAll);
    },
    checkName : (ev) => {
        const content = ev.target.value.trim();
        let error = '';
        document.getElementById('error-name').innerHTML = '';
        if(!content){
            error = 'Le champ ne doit pas etre vide';
        }else if(!/^[a-zA-Z]{4,20}$/.test(content)){
            error = `votre nom n'est pas valide`;
        }
        if(error){
            document.getElementById('error-name').innerHTML = error;
            verifAll['nom'] = 0;
        }else{
            verifAll['nom'] = 1;
        }
    },
    checkEMail : (ev) => {
        const content = ev.target.value.trim();
        let error = '';
        document.getElementById('error-email').innerHTML = '';
        if(!content){
            error = 'Le champ ne doit pas etre vide';
        }else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(content)){
            error = `votre mail n'est pas valide`;
        }
        if(error){
            document.getElementById('error-email').innerHTML = error;
            verifAll['email'] = 0;
        }else{
            verifAll['email'] = 1;
        }

    },
    checkPassword : (ev) => {
        const content = ev.target.value.trim();
        let error = '';
        document.getElementById('error-password').innerHTML = '';
        if(!content){
            error = 'Le champ ne doit pas etre vide';
        }
        if(error){
            document.getElementById('error-password').innerHTML = error;
            verifAll['mdp'] = 0;
        }else{
            verifAll['mdp'] = 1;
        }
    },
    checkConfirm : (ev) => {
        const content = ev.target.value.trim();
        const mdp = document.forms[0]['password'].value.trim();
        let error = '';
        document.getElementById('error-confirm').innerHTML = '';
        if(!content){
            error = 'Le champ ne doit pas etre vide';
        }else if(content !== mdp){
            error = `Vos mots de passe ne correspondent pas l'un à l'autre`;
        }
        if(error){
            document.getElementById('error-confirm').innerHTML = error;
            verifAll['conf'] = 0;
        }else{
            verifAll['conf'] = 1;
        }
    },
    checkAll : (ev) => {
        // console.log(verifAll);
        let cpt = 0;
        for(let prop in verifAll){
            if(verifAll[prop] == 1){
                cpt++;
            }
        }

        if (cpt === 5){
            document.querySelector('form button').disabled = false;
        }else{
            document.querySelector('form button').disabled = true;
        }
    }
}


function setupListeners() {

    const icons = document.querySelectorAll('i.icon-pwd');

    for (let index = 0; index < icons.length; index++) {
        let icon = icons[index];
        icon.addEventListener('click', (e) => {
            listenerFunction.toggleInputType(e);
        })
    };

    const firstname = document.forms[0]['firstname'];
    const name = document.forms[0]['name'];
    const email = document.forms[0]['email'];
    const password = document.forms[0]['password'];
    const confirm = document.forms[0]['passwordconfirm']
    const allInput = document.querySelectorAll('input');

    if(firstname){
        firstname.oninput = listenerFunction.checkFirstName;
    };
    if(name){
        name.oninput = listenerFunction.checkName;
    };
    if(email){
        email.oninput = listenerFunction.checkEMail;
    };
    if(password){
        password.oninput = listenerFunction.checkPassword;
    };
    if(confirm){
        confirm.oninput = listenerFunction.checkConfirm;
    };
    if(firstname && name && email && password && confirm){
        allInput.forEach(input => {
            input.onkeyup = listenerFunction.checkAll;
        });
    };
}
