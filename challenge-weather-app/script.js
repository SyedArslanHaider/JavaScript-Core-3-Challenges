
    const searchForm = document.getElementById("search");
    const cityInput = document.getElementById("search-tf");
    const photoContainer = document.getElementById("photo");
    const conditions = document.getElementById("conditions");
    const thumbsContainer = document.getElementById("thumbs");
    const creditUser = document.getElementById("credit-user");
    const creditPlatform = document.getElementById("credit-platform");

    const openWeatherAPIKey = "d1eaa2d1ed85341168097afcc7cf28d6";
    const unsplashAccessKey = "rBoeB3Y2d6uUxKOeYQwgYd7J-qsXePsoNjOT48AKc_8";
    let currentCity = "madrid"; // Default city
    let slideshowInterval; // Interval for cycling images

    // Fetch weather data
    async function fetchWeather(city) {
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherAPIKey}&units=metric`;
      const response = await fetch(weatherUrl);
      const data = await response.json();

     const weatherDescription = data.weather[0].description;
     const temperature = data.main.temp;
     const feelsLike = data.main.feels_like;
     const humidity = data.main.humidity;
     const windSpeed = data.wind.speed;
     const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); // Convert to readable time
     const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(); // Convert to readable time
     const cityName = data.name;

  // Update weather info
  conditions.innerHTML = `
    <div style="text-align: left; padding: 10px; background: rgba(255, 255, 255, 0.8); border-radius: 8px;">
      <h2 style="margin-bottom: 10px;">Weather in ${cityName}</h2>
      <p><strong>Description:</strong> ${weatherDescription}</p>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      <p><strong>Sunrise:</strong> ${sunrise}</p>
      <p><strong>Sunset:</strong> ${sunset}</p>
    </div>
  `;

  return weatherDescription;
}

    async function fetchImages(query) {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAccessKey}&per_page=7`;
    const response = await fetch(unsplashUrl);
    const data = await response.json();

   // Only return the first 7 images
   return data.results.slice(0, 7);
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

        thumbLink.appendChild(thumbImage);
        thumbsContainer.appendChild(thumbLink);
      });
    }

    // Start a slideshow for cycling background images
    function startSlideshow(images) {
      let currentIndex = 0;

      // Clear any existing interval
      clearInterval(slideshowInterval);
      photoContainer.innerHTML = "";
      // Start a new interval to update the background
      slideshowInterval = setInterval(() => {
        const currentImage = images[currentIndex];

        // Update the background image of the photo container
        photoContainer.style.backgroundImage = `url('${currentImage.urls.regular}')`;
        photoContainer.style.backgroundSize = "cover";
        photoContainer.style.backgroundPosition = "center";

        // Update photographer's credit
        creditUser.textContent = currentImage.user.name;
        creditUser.href = currentImage.user.links.html;
        creditPlatform.href = currentImage.links.html;

        // Move to the next image or loop back to the start
        currentIndex = (currentIndex + 1) % images.length;
      }, 3000); // Change every 5 seconds
    }

    async function init() {
      cityInput.value = currentCity; // Update search field with current city name
      photoContainer.textContent = "Loading...";
       await new Promise((resolve) => setTimeout(resolve, 3000)); 
      const weatherDescription = await fetchWeather(currentCity);
      const images = await fetchImages(weatherDescription);
      photoContainer.innerHTML = "";
      // Start the background slideshow if images are available
      if (images.length > 0) {
        startSlideshow(images);
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