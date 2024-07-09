const root = document.getElementsByClassName("main")[0];
async function fetchData(){
    const respose = await fetch("./data.json");
    const data = respose.json();
    return data;
}
const data = await fetchData();
console.log(data);
data.map((item)=>{
    root.innerHTML+=`
    <div class="card ${item.featured?"card-featured":""}">
            <div class="card-part1">
                <img src=${item.logo} class="avatar" alt="photosnap">
                <div class="card-middle-wrapper">
                <div class="middle-part-1">
                    <p class="name">${item.company}</p>
                    ${item.new?"<p class=\"new\">NEW!</p>":""}
                    ${item.featured? "<p class=\"featured\">FEATURED</p>":" "}
                </div>
                <p class="role">${item.position}</p>
                <ul class="details">
                    <li>${item.postedAt}</li>
                    <li>${item.contract}</li>
                    <li>${item.location}</li>
                </ul>
            </div>
            </div>
            <ul class="skills">
                <li>${item.role}</li>
                <li>${item.level}</li>
                ${item.languages.map((lang)=>{
                    return `<li>${lang}</li>`;
                }).join(' ')}
                ${item.tools.map((tool)=>{
                    return `<li>${tool}</li>`;
                }).join(' ')}
            </ul>
        </div>
    `
})