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

let tv_id = location.pathname;

fetch(`https://api.themoviedb.org/3${tv_id}?` + new URLSearchParams({
    api_key : api_key
}))
.then(res => res.json())
.then(data => {
  console.log(data);
    setupMovieInfo(data);
})

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name')
    const genres = document.querySelector('.genres')
    const des = document.querySelector('.des')
    const title = document.querySelector('title')
    const rating = document.querySelector('.rating')
    const watch = document.querySelector('.watch-btn')
    const backdrop = document.querySelector('.movie-info')

    title.innerHTML = movieName.innerHTML = data.name;
    genres.innerHTML = `${data.first_air_date.split('-')[0]} | `
    rating.innerHTML += `${data.vote_average}`
    watch.innerHTML = `
    <a href="${data.homepage}"><button>Watch Now</button></a>`
    for(let i = 0;i < data.genres.length; i++){
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

    if(data.adult == true){
        genres.innerHTML += ` | +18`
    }

    if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }

    des.innerHTML = data.overview.substring(0, 200) + '...';

    backdrop.style.backgroundImage = `url(${orginal_img_url}${data.backdrop_path})`
}

const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', '; 
}

fetch(`https://api.themoviedb.org/3${tv_id}/credits?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
  
    const cast = document.querySelector('.starring')
    for(let i = 0; i < 5; i++){
        cast.innerHTML += data.cast[i].name + formatString(i, 5);
    }
})

fetch(`https://api.themoviedb.org/3${tv_id}/videos?` + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => {
  
    let trailerContainer = document.querySelector('.trailer-container')

    let maxClips = (data.results.length < 4) ? 4 : data.results.length;

    for(let i = 0; i < maxClips; i++){
        trailerContainer.innerHTML +=`
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        `
    }
})

fetch(`https://api.themoviedb.org/3${tv_id}/recommendations?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data =>{
    let container = document.querySelector('.recommendations-container');
    for(let i = 0;i < 16; i++){
        if(data.results[i].backdrop_path == null){
            i++
        }
        container.innerHTML +=`
        <div class="movie" onclick="location.href = '/tv/${data.results[i].id}'">
                <img src="${img_url}${data.results[i].backdrop_path}" alt="">
                <p class="movie-title">${data.results[i].name}</p>
            </div>
        `
    }
})