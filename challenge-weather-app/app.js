
// Grab references to DOM elements
const searchForm = document.getElementById("search");
const cityInput = document.getElementById("search-tf");
const photoContainer = document.getElementById("photo");
const conditions = document.getElementById("conditions");
const thumbsContainer = document.getElementById("thumbs");
const creditUser = document.getElementById("credit-user");
const creditPlatform = document.getElementById("credit-platform");

const openWeatherAPIKey = "d1eaa2d1ed85341168097afcc7cf28d6";
const unsplashAccessKey = "rBoeB3Y2d6uUxKOeYQwgYd7J-qsXePsoNjOT48AKc_8";
// default city
let currentCity = "madrid";
//Fetch weather data 
async function fetchWeather(city) {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherAPIKey}&units=metric`;
  const response = await fetch(weatherUrl);
  const data = await response.json();

   // Extract weather description
  const weatherDescription = data.weather[0].description;
  const temperature = data.main.temp;

  // Update weather info on the page
  conditions.textContent = `${weatherDescription}, ${temperature}°C`;

  return weatherDescription;
}
// Fetch images from Unsplash based on weather description
async function fetchImages(query) {
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAccessKey}`;
  const response = await fetch(unsplashUrl);
  const data = await response.json();
  return data.results;
}

// Display images as thumbnails
function displayThumbnails(images) {
  thumbsContainer.innerHTML = "";

  images.forEach((image) => {
    const thumbLink = document.createElement("a");
    thumbLink.href = image.urls.full;
    thumbLink.classList.add("thumbs__link");

    const thumbImage = document.createElement("img");
    thumbImage.src = image.urls.small;
    thumbImage.alt = image.alt_description;
    thumbImage.classList.add("thumb");

    // Add click event to update main photo
    thumbLink.addEventListener("click", (e) => {
      e.preventDefault();
      displayMainImage(image);
    });

    thumbLink.appendChild(thumbImage);
    thumbsContainer.appendChild(thumbLink);
  });
}

// Display the main image and photographer's credit
function displayMainImage(image) {
  photoContainer.innerHTML = `<img src="${image.urls.regular}" alt="${image.alt_description}">`;

  creditUser.textContent = image.user.name;
  creditUser.href = image.user.links.html;
  creditPlatform.href = image.links.html;
}

async function init() {
  cityInput.value = currentCity; // Update search field with current city name
  const weatherDescription = await fetchWeather(currentCity);
  const images = await fetchImages(weatherDescription);

  // Display a random main image
  if (images.length > 0) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    displayMainImage(randomImage);
  }

  // Display all images as thumbnails
  displayThumbnails(images);
}

// Handle search form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  currentCity = cityInput.value;
  init();
});

// Initialize the app when the page loads
init();