window.onload = function(){
    let companyName = 'My Company';
    // Setting the title 
    document.title = companyName;
    // Declaring variables
    const f = document.getElementById('id_form');
    const b = document.getElementById('id_submit');
    let fullNameMinLen = 5;
    let formNotValid = true;
    // Messages variables
    let fullNameErr = '';
    let phoneErr = '';
    let emailErr = '';
    
    let fullNameValid = false;
    let phoneValid = false;
    let emailValid = false;

    // AppHelper
    const ah = {
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
                b.title="All fields okay."
            }
        },

        resetPersonDetails(o){
            o.fullname = '';
            o.phone = '';
            o.email = '';
        },
        
        formatted_date()
        {
            let result="";
            let d = new Date();
            result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
                        " "+ d.getHours()+":"+d.getMinutes()+":"+
                        d.getSeconds()+" "+d.getMilliseconds();
            return result;
        }
    };

    // Person Details
    const p = {
        fullname: '',
        phone: '',
        email: '',
        created_at: null
    };

    !function(){
        // Disabling the submit button if the form is not valid.
        ah.allowSubmit(b, formNotValid);
        // listening to input events on the form and performing validations.
        f.addEventListener('input', (e)=>{
            
            // fullname validation
            if(e.target.id === 'id_fullname'){
                let s = ah.sanitizeString(e.target.value);
                if(!isNaN(parseInt(s))){
                    fullNameErr = 'Full Name must contain only letters.';
                    fullNameValid = false;
                }else if(s.length < fullNameMinLen){
                    fullNameValid = false;
                    fullNameErr = `Full Name must contain at least ${fullNameMinLen} characters current: ${s.length}.`;
                }else if(s.length >= fullNameMinLen && isNaN(parseInt(s)) ){
                    p.fullname = e.target.value;
                    fullNameErr = '';
                    fullNameValid = true;
                }
            }

            // phone validation
            if(e.target.id === 'id_phone'){
                let phone = e.target.value; 
                if(!phone.match(/^(0(?:5[0-689]|7[246-9]|[2-4689]))((?:(?![1,0]{1}))\d{7})$/g)){
                    phoneErr = 'Phone is not valid.';
                    phoneValid = false;
                }else{
                    p.phone = e.target.value;
                    phoneValid = true;

                    phoneErr = '';
                }
            }

            // phone validation
            if(e.target.id === 'id_email'){
                let email = e.target.value;
                if(!ah.validateEmail(email)){
                    emailErr = 'Email is not valid.';
                    emailValid = false;
                }else{
                    p.email = email;
                    emailValid = true;
                    emailErr = '';
                }
            }
            // if there isn't an error then allow the submit button
            if(fullNameValid && phoneValid && emailValid && fullNameErr.length===0 && phoneErr.length===0 && emailErr.length===0 ){
                // Form is valid
                formNotValid = false;
                ah.allowSubmit(b, formNotValid);
            }else{
                // Form is not valid
                formNotValid = true;
                ah.allowSubmit(b, formNotValid);
            }

            document.querySelector('.fullname-err').textContent = fullNameErr;
            document.querySelector('.phone-err').textContent = phoneErr;
            document.querySelector('.email-err').textContent = emailErr;
        });//end input event

        f.addEventListener('submit', (e)=>{
            // update the created at in p object.
            p.created_at = ah.formatted_date();
            // Store the person details.
            localStorage.setItem('personDetails', JSON.stringify(p));

        });
    }(); 

}