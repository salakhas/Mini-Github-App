import navbar from "./components/navbar.js";

let navBarContainer = document.getElementById('navBarContainer');
navBarContainer.innerHTML=navbar();

let arr = JSON.parse(localStorage.getItem('userinfo'));
console.log('arr:', arr)
if(arr !== null){
    
    let left = document.getElementById('left');
    let innerDiv = document.createElement('div');
    let img = document.createElement('img');
    img.src = arr[0].avatar_url;
    img.style.width="200px";
    img.style.height="200px";
    img.style.border="1px solid #3e4349;";
    img.style.borderRadius="500px";
    innerDiv.append(img);
    innerDiv.style.width="fit-content";
    innerDiv.style.height="fit-content";
    innerDiv.style.margin="auto";
    innerDiv.style.marginTop="20px";
    let nextDiv=document.createElement('div');
    nextDiv.style.padding="40px";
    let nameOfUser = document.createElement('h2');
    nameOfUser.innerText=arr[0].name;
    nameOfUser.style.marginTop="-10px";
    let username = document.createElement('p');
    username.innerText=arr[0].usernames;
    nextDiv.append(nameOfUser,username);
    left.append(innerDiv,nextDiv)
}
