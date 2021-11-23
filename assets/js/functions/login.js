let verifAll = {
    'email' : 0,
    'mdp' : 0
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

    checkAll : (ev) => {
        // console.log(verifAll);
        let cpt = 0;
        for(let prop in verifAll){
            if(verifAll[prop] == 1){
                cpt++;
            }
        }

        if (cpt === 2){
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


    const email = document.forms[0]['email'];
    const password = document.forms[0]['password'];
    const allInput = document.querySelectorAll('input');


    if(email){
        email.oninput = listenerFunction.checkEMail;
    };
    if(password){
        password.oninput = listenerFunction.checkPassword;
    };

    if(email && password){
        allInput.forEach(input => {
            input.onkeyup = listenerFunction.checkAll;
        });
    };
}
