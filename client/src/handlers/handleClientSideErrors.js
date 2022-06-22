import {toast} from 'react-toastify';

export function handleErrorsClientSide (data){
    const {  firstName,
        lastName,
        age,
        address,
        income,
        religion,
        caste,
        language,
        city,
        state,
        country,
        username,
        password,
        email,
        mobileNo} = data.errors;

        const generateErrorClientSide = (err) => {
          toast.error(err, {
            position: "top-right"
          })
        }

        if(firstName) {
          generateErrorClientSide("First name is required")
        } else if(lastName){
          generateErrorClientSide("Last name is required")
        } else if(age){
          generateErrorClientSide(age)
        } else if(address){
          generateErrorClientSide(address)
        } else if(income){
          generateErrorClientSide(income)
        } else if(religion){
          generateErrorClientSide(religion)
        } else if(caste){
          generateErrorClientSide(caste)
        } else if(language){
          generateErrorClientSide(language)
        } else if(city){
          generateErrorClientSide(city)
        } else if(state){
          generateErrorClientSide(state)
        } else if(country){
          generateErrorClientSide(country)
        } else if(username){
          generateErrorClientSide(username)
        } else if(password){
          generateErrorClientSide(password)
        } else if(email){
          generateErrorClientSide(email)
        } else if(mobileNo){
          generateErrorClientSide(mobileNo)
        }  
        toast.clearWaitingQueue();
      }
    
