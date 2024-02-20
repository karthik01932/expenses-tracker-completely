async function signup(event){
    try{
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const password = document.getElementById('password').value;
        
        const  userData = {
            name,
            email,
            number,
            password
        }

        const response = await axios.post('http://localhost:3000/sign-in',userData);
        console.log(response)
        alert("User created successfully");
        if(response.status === 201){
            window.location.href = './main.html'
        }else{
            throw new  Error('Something went wrong!')
        }
        
       
    } catch(error) {
        console.log(error.message);
    };
};

