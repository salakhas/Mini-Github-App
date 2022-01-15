function navbar(){
    return `<div id="navbar">
    <div id="logo">
        <a href="index.html">
            <img src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"  class="imgs" alt="">
        </a>
    </div>

<div id="search">
    <input type="text" id="search_input" placeholder="Search Github">
</div>
<div id="options">
    <ul id="list" type="none">
        <li>Pull requests</li>
        <li>Issues</li>
        <li>Market Place</li>
        <li><a href="explore.html">Explore</a></li>
    </ul>
</div>
<div id="profile">
    <img id="profile-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIM_bsz30twmc5n9L8NZH4SgOdrlVr3aR7Vw&usqp=CAU" alt="">
</div>
</div>`
}

export default navbar;