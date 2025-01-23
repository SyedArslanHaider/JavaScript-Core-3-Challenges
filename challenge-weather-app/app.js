const API_KEY = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
const city = 'London'; // Set the default city

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Extract required information
    const { name } = data; // City name
    const { temp, feels_like } = data.main; // Temperature details
    const { description } = data.weather[0]; // Weather description

    // Display the weather information
    console.log(`Weather in ${name}:`);
    console.log(`Temperature: ${temp}°C`);
    console.log(`Feels like: ${feels_like}°C`);
    console.log(`Description: ${description}`);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

// Call the function with the default city
fetchWeather(city);
