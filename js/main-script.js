import { fetchAnime } from "../js/carousel.js";
import { fetchAnimeTrending } from "../js/trending.js";
import { fetchLatestCompleted } from "../js/latest-completed.js";
import { fetchMostFavorite } from "../js/most-favorite.js";
import { fetchMostPopular } from "../js/most-popular.js";
import { fetchTopAiring } from "../js/top-airing.js";

function loadHTML(id, file, callback) {
    fetch(file)
    .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
    })
    .then(data => {
        document.getElementById(id).innerHTML = data;
        if (callback) callback();
    })
    .catch(error => {
        console.log(error);
    })
}

loadHTML("header", "views/partials/header.html", () => {
    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);
    }
});

loadHTML("main", "views/partials/main.html");
loadHTML("footer", "views/partials/footer.html");

function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Optional: remember theme
    console.log(`Theme changed to ${newTheme}`);
}

  // Load saved theme on page load
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", toggleTheme);
    }
  }); 

async function loadAllAnimeData() {
    try {
        await fetchAnime();
        await fetchAnimeTrending();
        await fetchLatestCompleted();
        await fetchMostFavorite();
        await fetchMostPopular();
        await fetchTopAiring();
        // Add more if needed...
    } catch (err) {
        console.error("Error loading anime data:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadAllAnimeData();
});
  