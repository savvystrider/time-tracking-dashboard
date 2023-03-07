const container = document.getElementById("container");

const dailyBtn = document.getElementById("daily-btn");
const weeklyBtn = document.getElementById("weekly-btn");
const monthlyBtn = document.getElementById("monthly-btn");

function generateSections(item, timeframe) {
  return `<div class="item-container">
  <div class="row-container">
  <h2>${item.title}</h2>
  <img src="./images/icon-ellipsis.svg" alt="ellipsis icon" class="ellipsis-icon">
  </div>
  <div class="mobile-container">
  <p class="current-hours">${item.timeframes[timeframe].current}hrs</p>
  <span class="previous-hours">Last Week - ${item.timeframes[timeframe].previous}hrs</span>
  </div>
  </div>
  `
};

function renderSections(timeframe) {
  container.innerHTML = "";
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let section = document.createElement("section");
        section.classList.add(item.title.toLowerCase());
        section.innerHTML = generateSections(item, timeframe);

        let overlayDiv = document.createElement("div");
        overlayDiv.classList.add("overlay");
        overlayDiv.classList.add(`${item.title.toLowerCase()}-color`);
        container.appendChild(section);
        section.prepend(overlayDiv);
      })
    })
}

renderSections("daily");
dailyBtn.classList.add("active");

dailyBtn.addEventListener("click", function(e) {
  renderSections("daily");
  e.target.classList.add("active");
  weeklyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");
});

weeklyBtn.addEventListener("click", function(e) {
  renderSections("weekly");
  e.target.classList.add("active");
  dailyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");
});

monthlyBtn.addEventListener("click", function(e) {
  renderSections("monthly");
  e.target.classList.add("active");
  dailyBtn.classList.remove("active");
  weeklyBtn.classList.remove("active");
})

let overlayDiv = document.createElement("div");
overlayDiv.classList.add("overlay");