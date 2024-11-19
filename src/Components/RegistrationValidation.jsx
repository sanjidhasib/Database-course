
const RegistrationValidation = (values) => {

    let errors = {}
    const email_pattern = /^[\w\-/.]+@([\w-]+\.)+[\w-]{2,}$/
    const password_pattern = /^ (?=.*? [A - Z])(?=.*? [a - z])(?=.*? [0 - 9])(?=.*? [# ? !@$ %^&* -]).{ 8, }$/

    if (values.name === "") {
        errors.name = "Name should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email didnt matched"
    }
    else {
        errors.email = ""
    }

    if (values.password === "") {
        errors.password = "password should not be empty"
    }
   //else if (!password_pattern.test(values.password)) {
       // errors.password = "password didnt matched"
    //}
    else {
        errors.password = ""
    }









    return errors;
   
};

export default RegistrationValidation;