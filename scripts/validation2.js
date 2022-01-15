async function login(event){
          
    event.preventDefault();
    let login_data = {
    username:document.getElementById('username-login').value,
    password:document.getElementById('password-login').value
    }
login_data= JSON.stringify(login_data);
console.log(login_data)
let login_api = `https://masai-api-mocker.herokuapp.com/auth/login`;
let responses = await fetch(login_api,{
    method:'POST',
    body:login_data,

    headers:{
        "Content-Type":"application/json",
    },
});

let datas = await responses.json();
console.log('datas:', datas);
    if(datas.error === false){
        alert('Signed In succesfully! You will be taken to the home page shortly...');
        setTimeout(function(){
            location.href = "index.html"
        },3000);
    }
    else{
        alert('Invalid Credentials! Try again!');
    }
}