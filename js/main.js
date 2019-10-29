window.onload = function(){
    const AppHelper = {
        sanitizeString(s){
            return s.replace(/[^\s\w]/g,'').trim();
        },
        
        validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        allowSubmit(button, formNotValid){
            if(formNotValid){
                button.disabled = formNotValid;
                button.style.cursor='not-allowed';
                button.title="Please fill all the fields in order to submit."
            }else{
                b.disabled = formNotValid;
                b.style.cursor='pointer';
                b.title="Please fill all the fields in order to submit."
            }
        }
    };

    !function(){
        // Declaring variables
        const f = document.getElementById('id_form');
        const b = document.getElementById('id_submit');
        let fullNameMinLen = 5;
        let formNotValid = true;
        // Messages variables
        let fullNameErr = '';
        let phoneErr = '';
        let emailErr = '';

        // Disabling the submit button if the form is not valid.
        AppHelper.allowSubmit(b, formNotValid);
        // listening to input events on the form and performing validations.
        f.addEventListener('input', (e)=>{
            
            // fullname validation
            if(e.target.id === 'id_fullname'){
                let s = AppHelper.sanitizeString(e.target.value);
                if(!isNaN(parseInt(s))){
                    fullNameErr = 'Full Name must contain only letters.';
                }else if(s.length < fullNameMinLen){
                    fullNameErr = `Full Name must contain at least ${fullNameMinLen} characters current: ${s.length}.`;
                }else{
                    fullNameErr = '';
                }
            }

            // phone validation
            if(e.target.id === 'id_phone'){
                if(!e.target.value.match(/^(0(?:5[0-689]|7[246-9]|[2-4689]))((?:(?![1,0]{1}))\d{7})$/g)){
                    phoneErr = 'Phone is not valid.';
                }else{
                    phoneErr = '';
                }
            }

            // phone validation
            if(e.target.id === 'id_email'){
                let email = e.target.value;
                if(!AppHelper.validateEmail(email)){
                    emailErr = 'Email is not valid.';
                }else{
                    emailErr = '';
                }
            }
            // if there isn't an error then allow the submit button
            if(fullNameErr.length===0 && phoneErr.length===0 && emailErr.length===0){
                // Form is valid
                formNotValid = false;
                AppHelper.allowSubmit(b, formNotValid);
            }
            document.querySelector('.fullname-err').textContent = fullNameErr;
            document.querySelector('.phone-err').textContent = phoneErr;
            document.querySelector('.email-err').textContent = emailErr;
        });
    }();

}