$(document).ready(() => {
    $("#hamburger-menu").click(() => {
      $("#hamburger-menu").toggleClass("active");
      $("#nav-menu").toggleClass("active");
    });
  
    $(window).scroll(() => {
      if (this.scrollY > 20) {
        $(".nav-wrapper").addClass("sticky");
      } else {
        $(".nav-wrapper").removeClass("sticky");
      }
    });
    // setting owl carousel
  
    let navText = [
      "<i class='bx bx-chevron-left'></i>",
      "<i class='bx bx-chevron-right'></i>",
    ];
  
    $("#hero-carousel").owlCarousel({
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: navText,
      autoplay: true,
      autoplayHoverPause: true,
    });
  
    $("#top-movies-slide").owlCarousel({
      items: 2,
      dots: false,
      loop: true,
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
        500: {
          items: 3,
        },
        1280: {
          items: 4,
        },
        1600: {
          items: 6,
        },
      },
    });
  
    $(".movies-slide").owlCarousel({
      items: 2,
      dots: false,
      nav: true,
      navText: navText,
      margin: 15,
      responsive: {
        500: {
          items: 2,
        },
        1280: {
          items: 4,
        },
        1600: {
          items: 6,
        },
      },
    });
  });
  // api key  from TMDB 
const api = "api_key=9c01bc51e3095c9d889d05989bec36d1";
// base url of the site 
const base_url = "https://api.themoviedb.org/3";
// url
const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api;

const bimg_url = "https://image.tmdb.org/t/p/original";

  const requests = {
    fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  };
 // used to truncate the string 
 function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
 }
// banner
fetch(requests.fetchNetflixOrignals)
.then((res) => res.json())
.then((data) => {

  const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
  var banner = document.getElementById("banner");
  var banner_title = document.getElementById("banner__title");
  var banner__desc = document.getElementById("banner__description");
  banner.style.backgroundImage = "url(" + bimg_url + setMovie.backdrop_path + ")";
  banner__desc.innerText = truncate(setMovie.overview, 150);
  banner_title.innerText = setMovie.name;
})

  const main = document.querySelector(".main");

fetch(
  tv_genres_list_http +
    new URLSearchParams({
      api_key: api_key,
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.genres.forEach((item) => {
      fetchMoviesListByGenres(item.id, item.name);
    });
  });
const fetchMoviesListByGenres = (id, genres) => {
  fetch(
    tv_genres_http +
      new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      })
  )
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      makeCategoryElement(`${genres}_series`, data.results);
    })
    .catch((err) => console.log(err));
};

const makeCategoryElement = (category, data) => {
  main.innerHTML += `
  <div class="movie-list">

  <button class="pre-btn"> <h1><</h1></button>

 <h2 class="movie-category">${category.split("_").join(" ")}</h2>
 <div class="movie-container" id="${category}">
     
 </div>

 <button class="nxt-btn"><h1>></h1>  </button>
</div>
    `;
    makeCards(category, data);
   
    
};
const makeCards = (id, data) => {
        const movieContainer = document.getElementById(id);
        data.forEach((item, i) => {
          if(item.backdrop_path == null){
              item.backdrop_path = item.poster_path;
              if(item.backdrop_path == null){
                  return
              }
          }
          movieContainer.innerHTML += `
            <div class="movie" onclick="location.href = '/tv/${item.id}'">
                <img src="${img_url}${item.poster_path}" alt="">
                </div>
                `;
                // <p class="movie-title">${item.name}</p>
            if(i == data.length - 1){
                setTimeout(() => {
                    setupScrolling();
                },100)
            }
        });
    
};
