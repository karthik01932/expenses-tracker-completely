async function login(event){
    try {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const logindetails = {
            email,
            password
        }
 
        const response = await axios.post('http://localhost:3000/login', logindetails);
        // console.log(response);
        alert(response.data.message)
        localStorage.setItem('token', response.data.token)
        window.location.href = "../dailyexpenses/dailyexpenses.html"
    } catch (error) {
        // console.log(JSON.stringify(error))
        document.body.innerHTML+= `<div style = "color: red;">${error.message}<br></div>`
    }
}