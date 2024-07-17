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

const API_KEY =
  "patv7fWYR8jIjZoMm.cb0e4030238467e1bbef146a639ace19548c27aa4afe53f6e28962c1287b8a0e";
const AIRTABLE_BASE_ID = "appazeCJYcndSA6xa";
const AIRTABLE_TABLE_NAME = "Table%201";
const AIRTABLE_RECORD_ID = "rec8b933AlERY7YO0";

function get_visitor_count() {
  fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${AIRTABLE_RECORD_ID}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((rawResponse) => {
      let visitor_count = Number(rawResponse["fields"]["counter"]) + 1;
      // console.log(rawResponse["fields"]["counter"]);
      fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            records: [
              {
                id: "rec8b933AlERY7YO0",
                fields: {
                  Name: "irpam_visitor_count",
                  counter: visitor_count,
                },
              },
            ],
          }),
        }
      ).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      });
      const visitor_element = document.getElementById("ogeyy");
      visitor_element.innerHTML = visitor_count;
    })
    .catch((error) => {
      console.error("Something went wrong.");
      console.log("Error", error);
    });
}

get_visitor_count();
