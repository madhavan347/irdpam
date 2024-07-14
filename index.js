function updateLaunchTimer(launchDate) {
  // Calculate the difference between current time and launch date
  const now = new Date();
  const launchTime = new Date(launchDate);
  const elapsedTime = launchTime - now;

  // Calculate days, hours, minutes, and seconds
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Get remaining hours, minutes, and seconds
  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;
  const displaySeconds = seconds % 60;

  // Update the HTML elements with the respective IDs
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = displayHours;
  document.getElementById("minutes").innerText = displayMinutes;
  document.getElementById("seconds").innerText = displaySeconds;
}

// Initialize the timer
function startTimer(launchDate) {
  updateLaunchTimer(launchDate);
  setInterval(() => updateLaunchTimer(launchDate), 1000);
}

// Call the startTimer function with the launch date
window.onload = function () {
  // Example launch date
  const launchDate = "2025-01-06T00:00:00";
  startTimer(launchDate);
};
