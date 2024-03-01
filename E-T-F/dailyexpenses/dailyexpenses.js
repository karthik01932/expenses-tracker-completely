async function dailyexpenses(event){
    try{
        event.preventDefault();
        const catergory  = document.getElementById('catergory').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;

        const userExpenses = {
            catergory,
            amount,
            description
        }
        const response = await axios.post('http://localhost:3000/dailyexpenses', userExpenses);
        showuseronscreen(response.data);
        console.log(response);

    } catch(err){
        document.body.innerHTML+= `<div style = "color: red;">${err.message}<br></div>`
    }

}

window.addEventListener("DOMContentLoaded", async () =>{
    try {
        const response = await axios.get(`http://localhost:3000/get-dailyexpenses`)
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
        const response = axios.delete(`http://localhost:3000/delete-expenses/${userid}`)
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