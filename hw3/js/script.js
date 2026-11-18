document.querySelector("#searchForm").addEventListener("submit", searchQuakes);

function isFormValid() {
  let isValid = true;

  let startDate = document.querySelector("#startDate").value;
  let endDate = document.querySelector("#endDate").value;
  let minMag = document.querySelector("#minMag").value;

  let dateError = document.querySelector("#dateError");
  let magError = document.querySelector("#magError");
  dateError.textContent = "";
  magError.textContent = "";

  if (startDate === "" || endDate === "") {
    dateError.textContent = "Pick both dates";
    dateError.style.color = "red";
    isValid = false;
  } else if (startDate >= endDate) {
    dateError.textContent = "Start date must be before end date";
    dateError.style.color = "red";
    isValid = false;
  }

  if (minMag === "" || isNaN(minMag) || minMag < 0 || minMag > 10) {
    magError.textContent = "Enter a number from 0 to 10";
    magError.style.color = "red";
    isValid = false;
  }

  return isValid;
}

async function searchQuakes(event) {
  event.preventDefault();

  if (isFormValid() === false) {
    return;
  }

  let startDate = document.querySelector("#startDate").value;
  let endDate = document.querySelector("#endDate").value;
  let minMag = document.querySelector("#minMag").value;
  let orderBy = document.querySelector("#orderBy").value;

  let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmagnitude=${minMag}&orderby=${orderBy}&limit=20`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    displayQuakes(data.features);
  } catch (error) {
    document.querySelector("#summary").textContent = "Unable to load earthquakes";
    console.error(error);
  }
}

function displayQuakes(quakes) {
  let results = document.querySelector("#results");
  let summary = document.querySelector("#summary");

  results.textContent = "";
  summary.textContent = "";

  if (quakes.length === 0) {
    summary.textContent = "No earthquakes found. Try a lower magnitude or more days.";
    return;
  }

  summary.textContent = "Showing " + quakes.length + " earthquakes";

  for (let quake of quakes) {
    let mag = quake.properties.mag;
    let place = quake.properties.place;
    let time = new Date(quake.properties.time).toLocaleString();
    let link = quake.properties.url;

    let card = document.createElement("div");
    card.className = "quake";
    if (mag >= 6) {
      card.classList.add("strong");
    }
    card.innerHTML = `<h3>Magnitude ${mag}</h3>
      <p>${place}</p>
      <p>${time}</p>
      <a href="${link}" target="_blank">More details</a>`;
    results.appendChild(card);
  }
}
