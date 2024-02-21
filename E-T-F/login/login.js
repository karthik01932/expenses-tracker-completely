async function login(event){
    try {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const logindetails = {
            email,
            password
        }

        const response = await axios.post('http://localhost:3000/login',logindetails);
        console.log(response);
        if(response.status === 201){
            alert(response.data.message)
        }else{
            throw new  Error(response.data.message);
        }
    } catch (error) {
        console.log(JSON.stringify(error))
        document.body.innerHTML+= `<div style = "color: red;">${error.message}<br></div>`
    }
}