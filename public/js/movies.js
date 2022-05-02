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
  // used to truncate the string 
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
// banner
fetch(movies_genres_http +
  new URLSearchParams({
    api_key: api_key,
  }))
.then((res) => res.json())
.then((data) => {
  console.log(data.results);
  // every refresh the movie will be change
  const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
  // console.log(setMovie);
  var banner = document.getElementById("banner");
  var banner_title = document.getElementById("banner__title");
  var banner__desc = document.getElementById("banner__description");
  banner.style.backgroundImage = "url("+orginal_img_url+ setMovie.backdrop_path +")";
  banner__desc.innerText = truncate(setMovie.overview, 150);
  banner_title.innerText = setMovie.title;
})

  const main = document.querySelector(".main");
  const results = document.querySelector(".results");


fetch(
  movies_genres_list_http +
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
    movies_genres_http +
      new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      makeCategoryElement(`${genres}_movies`, data.results);
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
            <div class="movie" onclick="location.href = '/movie/${item.id}'">
                <img src="${img_url}${item.poster_path}" alt="">
                </div>
                `;
                // <p class="movie-title">${item.title}</p>
                if(i == data.length - 1){
                setTimeout(() => {
                    setupScrolling();
                },100)
            }
        });
    
};
