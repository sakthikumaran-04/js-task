const root = document.getElementsByClassName("main")[0];
const filtersContainer = document.getElementsByClassName("filters-container")[0];
const filters = document.getElementsByClassName("filters")[0];
let filterArray = [];

async function fetchData() {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
}

window.appendFilter = function(filter) {
    if (!filterArray.includes(filter)) {
        filterArray.push(filter);
        console.log(filterArray);
        filters.style.display = "flex";
        filtersContainer.style.display="grid";
        filters.innerHTML = filterArray.map((item) => {
            return `<div class="filter" onclick="removeFilter(this)"><p>${item}</p><div class="close"><img src="./images/icon-remove.svg" /></div></div>`;
        }).join("");
        render();
    }
}

window.clearAll = function(){
    filterArray=[];
    filters.innerHTML="";
    filtersContainer.style.display="none";
    render();
}

window.removeFilter = function(e){
    let toDelete = e.firstChild.innerHTML;
    filters.removeChild(e);
    filterArray = filterArray.filter((item)=>{
        return item!=toDelete
    })
    render();
    if(filterArray.length==0){
        filtersContainer.style.display="none";

    }
}

fetchData().then(data => {
    console.log(data);
    window.data = data;
    render();
});

function render() {
    root.innerHTML = '';

    window.data.forEach((item) => {
        const matchesFilter = filterArray.length === 0 || filterArray.some(filter => 
            filter === item.role || 
            filter === item.level || 
            item.languages.includes(filter) || 
            item.tools.includes(filter)
        );

        if (matchesFilter) {
            root.innerHTML += `
                <div class="card ${item.featured ? "card-featured" : ""}">
                    <div class="card-part1">
                        <img src="${item.logo}" class="avatar" alt="photosnap">
                        <div class="card-middle-wrapper">
                            <div class="middle-part-1">
                                <p class="name">${item.company}</p>
                                ${item.new ? "<p class=\"new\">NEW!</p>" : ""}
                                ${item.featured ? "<p class=\"featured\">FEATURED</p>" : ""}
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
                        <li onclick='appendFilter("${item.role}")'>${item.role}</li>
                        <li onclick='appendFilter("${item.level}")'>${item.level}</li>
                        ${item.languages.map((lang) => {
                            return `<li onclick='appendFilter("${lang}")'>${lang}</li>`;
                        }).join('')}
                        ${item.tools.map((tool) => {
                            return `<li onclick='appendFilter("${tool}")'>${tool}</li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
        }
    });
}
