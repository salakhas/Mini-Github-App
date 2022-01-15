import navbar  from "./navbar.js";
import getUser from "./getUser.js";

let navBarContainer = document.getElementById('navBarContainer');
navBarContainer.innerHTML = navbar();

let input = document.getElementById('search_input');
input.addEventListener('keypress',searchUser);
var responses;

function User(url,name,username){
    this.avatar_url = url;
    this.name = name;
    this.usernames = username;
}
async function searchUser(event){
    
    if(event.key === 'Enter'){
        let query = input.value;
        let response = await getUser(query);
        let {avatar_url} = response;
        let {name} = response;
        let {repos_url} =response;
        let item = new User(avatar_url,name,response.login);
        let array = localStorage.getItem('userinfo');
        if(array===null){
            array=[];
            array.push(item);
        }
        else{
            array = JSON.parse(array);
            array.push(item);
        }
        localStorage.setItem('userinfo',JSON.stringify(array));
        
        console.log('repos_url:', repos_url)
        responses = repos_url;
        console.log('responses:', responses)
        document.getElementById('profile-img').src = avatar_url;
        let left = document.getElementById('left');
        let innerDiv = document.createElement('div');
        let img = document.createElement('img');
        img.src = avatar_url;
        img.style.width="300px";
        img.style.height="300px";
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
        nameOfUser.innerText=name;
        nameOfUser.style.marginTop="-10px";
        console.log('response.login',response.login)
        let username = document.createElement('p');
        username.innerText=response.login;
        nextDiv.append(nameOfUser,username);
        left.append(innerDiv,nextDiv)
        console.log('response:', response)
    }
}

let rep_btn = document.getElementById('rep_btn');
rep_btn.addEventListener('click',getUserRepo);
async function getUserRepo(){
    try{
        let res = await fetch(responses);
        let repo_data = await res.json();
        console.log('repo_data:', repo_data)    
        displayRepos(repo_data);
    }
    catch(err){
        console.log('err:', err)
    }
}


function displayRepos(data){
    let repo_div  = document.getElementById('repo_div');
    repo_div.innerHTML='';
    data.forEach((el)=>{
        let innerDiv = document.createElement('div');
        innerDiv.setAttribute('class','innerDiv');

        let divs = document.createElement('div');
        divs.style.display="flex";
        divs.style.columnGap="30px";
        let repo_name = document.createElement('h3');
        repo_name.innerText = el.full_name;
        repo_name.style.color="#235DAD";
        let div = document.createElement('div');
        div.style.width="60px";
        div.style.height="30px";
        div.style.border="1px solid #3e4349";
        div.style.marginTop="15px";
        div.style.borderRadius="30px"
        div.style.color="#3e4349";
        let para = document.createElement('p');
        para.innerText=el.visibility;
        para.style.marginTop="3px";
        para.style.paddingLeft="7px";
        div.append(para);
        divs.style.paddingLeft="10px";

        let endBoxes = document.createElement('div');
        endBoxes.setAttribute('class','endBoxes');
          
        let leftSide = document.createElement('div');
        leftSide.style.display="flex";
        leftSide.style.color="#3e4349";
        leftSide.innerHTML=`<i class="far fa-star star"></i><p class="starPara">Star</p>`;

        let rightSide = document.createElement('div');
        rightSide.style.color="#3e4349";
        rightSide.innerHTML= `<i class="fas fa-sort-down arrow"></i>`;

        endBoxes.append(leftSide,rightSide);
        divs.append(repo_name,div,endBoxes);
       

        let divs2 = document.createElement('div');
        divs2.style.width="fit-content";
        divs2.style.height="38px"
        divs2.style.display="flex";
        
        let languageDiv = document.createElement('div');
        languageDiv.innerHTML=`<i class="circle fas fa-circle"></i>&nbsp;&nbsp;&nbsp;<p class='paras'>${el.language}</p>`;
        languageDiv.style.display="flex";

        let arr = el.created_at;
        arr=arr.split('T');
        arr = arr[0];
        let creationDateDiv = document.createElement('div');
        creationDateDiv.innerHTML=`<p class="paras">Created at : ${arr}</p>`;
        creationDateDiv.id="creationDateDiv";

        if(el.forks !== 0 && el.language!==null){
            let forkDiv = document.createElement('div');
            forkDiv.id="forkDiv";
            forkDiv.innerHTML=`<i class="fas fa-code-branch branches"></i>&nbsp;&nbsp;&nbsp;<p class='paras'>${el.forks}</p>`;
            forkDiv.style.display="flex";
            divs2.append(languageDiv,forkDiv,creationDateDiv);
        }
        else if(el.forks !==0 && el.language === null){
            divs2.append(forkDiv,creationDateDiv);
        }
        else if(el.forks ===0 && el.language !== null){
            divs2.append(languageDiv,creationDateDiv);
        }
        else{
            divs2.append(creationDateDiv);
        }
        
        


        innerDiv.append(divs,divs2);

        repo_div.append(innerDiv)
    })
}

let profile_img = document.getElementById('profile-img');
profile_img.addEventListener('click',moveTo);


function moveTo(){
    location.href="signUp.html";
}