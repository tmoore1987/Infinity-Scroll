const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'CLCvcbZz2BOC8xslkgl32KqP0l9bo2aPybOubo9O1VI'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if images were loaded

function imageLoaded() {
    console.log('image loaded')
    imagesLoaded++
    if( imagesLoaded === totalImages) {
        ready = true;
        console.log('reay=', ready)
    }
}

//Helper function to set attributres for DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//Create elements for links and photos. Add to DOM

function displayPhotos() {
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //run fuction for each object
    photosArray.forEach((photo) => {
        //Create <a> link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a> then put both inside imagecontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//get photos from unsplash

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }   catch (error) {
        //catch error here
    }
}

//check to see scrolling near the bottom. Load more photos

window.addEventListener('Scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready =false
        getPhotos()
    }
})


//on load
getPhotos();


