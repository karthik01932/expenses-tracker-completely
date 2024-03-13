async function dailyexpenses(event){
    try{
        event.preventDefault();
        const catergory  = document.getElementById('catergory').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;

        const userExpenses = {
            catergory,
            amount,
            description,
            // userId
        }
        const token = localStorage.getItem("token");
        
        const response = await axios.post('http://localhost:3000/dailyexpenses', userExpenses, { headers: {"Authorization" : token} });
        showuseronscreen(response.data);
        console.log(response);

    } catch(err){
        document.body.innerHTML+= `<div style = "color: red;">${err.message}<br></div>`
    }

}

function showPremiumuserMessage() {
    document.getElementById('rzy-pay').style.visibility = "hidden"
    document.getElementById('message').innerHTML = "You are a premium user"
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", async () =>{
    try {
        const token = localStorage.getItem('token')
        const decodeToken = parseJwt(token)
        console.log(decodeToken)
        const ispremiumuser = decodeToken.ispremiumuser
        if(ispremiumuser){
            showPremiumuserMessage()
            showLeaderboard()
        }
        const response = await axios.get(`http://localhost:3000/get-dailyexpenses`,{headers: {"Authorization" : token}})
        console.log(response);
        for(var i=0;i<response.data.allExpenses.length;i++){
            shownewuseronscreen(response.data.allExpenses[i])
            console.log(response.data.allExpenses[i])
        }
    } catch (err) {
        console.log(err)
        document.body.innerHTML+= `<div style = "color: red;">${err.message}<br></div>`
        
    }
})

function shownewuseronscreen(user){
        
    const childelement = document.createElement('li');

    document.getElementById('catergory').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    const parentNode = document.getElementById('listofexpenses');
    const childHTML = `<li id = ${user.id} > ${user.catergory} -${user.amount}-${user.description}
        <button onclicK = deleteuser('${user.id}') > Delete User </button>
        </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHTML;
    // parentelement.appendChild(childelement);
}

async function deleteuser(userid){
    try {
        const token = localStorage.getItem('token');
        const response = axios.delete(`http://localhost:3000/delete-expenses/${userid}`,{headers: {'Authorization': token}})
        console.log(response);
        removeuserfromscreen(userid);
    } catch (error) {
        console.log(err);
    }
}
function removeuserfromscreen(id){
    const parentNode = document.getElementById('listofexpenses');
    const childNodeToBeDelete = document.getElementById(id);
    if(childNodeToBeDelete){
        parentNode.removeChild(childNodeToBeDelete)
    }
}
function showuseronscreen(userExpenses){
    const parentelement = document.getElementById('listofexpenses')
    const childelement = document.createElement('li');
    childelement.textContent =  userExpenses.catergory  + ' - ' +  userExpenses.amount + ' - ' + userExpenses.description
              
    // delete
    const deleteButton = document.createElement('input')
    deleteButton.type = "button"
    deleteButton.value = 'delete'
    deleteButton.onclick = () => {
        parentelement.removeChild(childelement)
    }
}

document.getElementById('rzy-pay').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
        "key": response.data.key_id, 
        "order_id": response.data.order.id,
     
        "handler": async function (response) {
            const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: {"Authorization" : token} })
        
            console.log(res)
            alert('You are a Premium User Now')
            document.getElementById('rzy-pay').style.visibility = "hidden"
            document.getElementById('message').innerHTML = "You are a premium user "
            localStorage.setItem('token', res.data.token)
            showLeaderboard()
         
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response){
        console.log(response)
        alert('Something went wrong')
    });
}
function showLeaderboard(){
    const inputElement = document.createElement("input")
    inputElement.className="leaderboardbtn"
    inputElement.type = "button"
    inputElement.value = 'Show Leaderboard'
    // document.getElementById('leaderboard').style.visibility = "hidden"

    inputElement.onclick = async () => {
        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', { headers: {"Authorization" : token} })
        console.log(userLeaderBoardArray)

        let leaderboardElem = document.getElementById('leaderboard')
        leaderboardElem.innerHTML += '<h1> Leader Board </<h1>'

        userLeaderBoardArray.data.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total Expense - ${userDetails.totalExpenses} </li>`
            
        })
    }
    document.getElementById("message").appendChild(inputElement);

}