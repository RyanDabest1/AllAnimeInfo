const base_url = "https://api.jikan.moe/v3";

function SearchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get('search')

    
    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDo)
    .catch(err=>console.warn(err.message));
}
function updateDo(data){
    const searchResult = document.getElementById('search_results');
    searchResult.innerHTML = ""
    const animeCat = data.results
        .reduce((ac, anime)=>{
            const {type} = anime;
            if(ac[type] == undefined) ac[type] = [];
            ac[type].push((anime));
            return ac;
        }, {});

        searchResult.innerHTML = Object.keys(animeCat).map(key=> {
            const animesHTML = animeCat[key]
            .sort((a,b)=>a.episode-b.episode)
            .map(anime => {
                return `
                <div class="card">
                  <div class="card-image">
                    <img src="${anime.image_url}">
                    <span class="card-title">${anime.title}</span>
                  </div>
                  <div class="card-content">
                    <p>${anime.synopsis}</p>
                  </div>
                  <div class="card-action">
                    <a href="${anime.url}">More About This Anime</a>
                  </div>
                </div>`
            }).join("");;

            return `
            <section><h3>${key.toUpperCase()}</h3><div class ="kemicofa-row">${animesHTML}</div></section>`

        }).join("");
}
function pageloaded(){

    const form = document.getElementById('search_form');
    form.addEventListener("submit", SearchAnime);
}



window.addEventListener("load", pageloaded)
