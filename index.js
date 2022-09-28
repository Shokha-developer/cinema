import { movies } from "./js/db.js";
const ul = document.querySelector('.promo__interactive-list')
let modal = document.querySelector('.modal')
let modal_bg = document.querySelector('.modal_bg')
let h1 = modal.querySelector('h1')
let description = modal.querySelector(".description")
let production = modal.querySelector(".production")
let language = modal.querySelector(".language")
let country = modal.querySelector(".country")
let b = modal.querySelector('b')
let img = modal.querySelector('img')
let search = document.querySelector('#search')
let search1 = document.forms.query
let inp = search1.querySelector("#search")
let bg = document.querySelector(".promo__content .promo__bg")
let genre = document.querySelector(".promo__genre")
let title1 = document.querySelector(".promo__title")
let descr = document.querySelector(".promo__descr")
let ratings1 = document.querySelector(".promo__ratings")



search1.onsubmit = (event) => {
    event.preventDefault()

    let value = search.value.toLowerCase().trim()


    let filtered = movies.filter(item => {
        inp.value = ""
        let title = item.Title.toLowerCase()

        if (title.includes(value)) {
            bg = bg.style.background = `url(${item.Poster})`
            genre.innerHTML = item.Genre
            title1.innerHTML = item.Title
            descr.innerHTML = item.Plot

            return item
        }
        console.log(bg);
    })

    reload(filtered)
}



const reload = (arr) => {
    ul.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            openModal(item)
        }
    }
}

reload(movies)

function openModal(param) {
    modal.style.display = "flex"
    modal_bg.style.display = "block"

    setTimeout(() => {
        modal.style.opacity = "1"
        modal_bg.style.opacity = "1"
    }, 300);

    img.src = param.Poster
    h1.innerHTML = param.Title
    description.innerHTML = `<b>Description:</b> ${param.Plot}`
    production.innerHTML = `<b>Production:</b> ${param.Production}`
    language.innerHTML = `<b>Language:</b> ${param.Language}`
    country.innerHTML = `<b>Country:</b> ${param.Country}`
    b.innerHTML = `Year: ${param.Year}`



    // rating
const ratings = document.querySelectorAll(".rating")
if (ratings.length > 0) {
    initRatings()
}

function initRatings() {
    let ratingActive;
    let ratingValue;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);

    }
    function initRating(rating) {
        initRatingVars(rating);
        setRatingActiveWidth();
    }
    
    function initRatingVars(rating) {
        ratingActive = rating.querySelector(".rating__active")
        ratingValue = rating.querySelector(".rating__value")
    }

    function setRatingActiveWidth(index = param.imdbRating / 2) {
        ratingValue.innerHTML = `IMBD ${param.imdbRating}` 
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`
    }

}


}