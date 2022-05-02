const API_KEY = 'api_key=66f7b3a995f50038a07f2c1275e15b81';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const tvURL = BASE_URL + '/search/tv?'+API_KEY;

const main = document.getElementById('main');
const series = document.getElementById('series');
const heading_m = document.getElementById('heading_m');
const heading_s = document.getElementById('heading_s');
const form = document.getElementById('form');
const search = document.getElementById('search');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  // document.location.reload();
  const searchTerm = search.value;
  if(searchTerm) {
      // getMovies(searchURL+'&query='+searchTerm)
      fetch(
        searchURL+'&query='+searchTerm
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results)
          makeCards(data.results);
        })

        const makeCards = (data) => {
          // const movieContainer = document.getElementById(id);
          heading_m.innerHTML +=`
            <h1 class="main-color h">movies</h1>
            `
          data.forEach((item) => {
            if(item.backdrop_path == null){
                item.backdrop_path = item.poster_path;
                if(item.backdrop_path == null){
                    return
                }
            }
            
            main.innerHTML += `
              <div class="movie" onclick="location.href = '/movie/${item.id}'">
                  <img src="${img_url}${item.poster_path}" alt="">
                  </div>
                  `;
            });

          }

          fetch(
            tvURL+'&query='+searchTerm
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data.results)
              makeCard(data.results);
            })
    
            const makeCard = (data) => {
              // const movieContainer = document.getElementById(id);
              heading_s.innerHTML +=`
                <h1 class="main-color h">series</h1>
                `
              data.forEach((item) => {
                if(item.backdrop_path == null){
                    item.backdrop_path = item.poster_path;
                    if(item.backdrop_path == null){
                        return
                    }
                }
                
                series.innerHTML += `
                  <div class="movie" onclick="location.href = '/tv/${item.id}'">
                      <img src="${img_url}${item.poster_path}" alt="">
                      </div>
                      `;
                });
                
              }
  }
})