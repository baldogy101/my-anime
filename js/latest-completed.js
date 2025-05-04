export async function fetchLatestCompleted() {
    try {
        const res = await fetch('https://api.jikan.moe/v4/anime?status=complete&type=tv&order_by=aired&sort=desc');
        const data = await res.json();
        const animeList = data.data.slice(0, 5); // Get top 5

        const trendingTrack = document.querySelector('.most-favorite');
        trendingTrack.innerHTML = ''; // clear existing slides


        animeList.forEach(anime => {
            const slide = document.createElement('div');
            const shortRating = anime.rating.split(' ').slice(0, 1).join(' ') || 'N/A';
            
            slide.innerHTML = `
            <div class="most-favorite-api">
                <img src="${anime.images.jpg.small_image_url}" alt="${anime.title}" />
                <div class="title-box">
                    <p>${anime.title_english || anime.title}</p>
                    ${anime.type}
                    ${shortRating}
                </div>
            </div>
            `;
            trendingTrack.appendChild(slide); 
        });
    }
    catch (err) {
        console.error('Failed to fetch anime: ', err);
    }
}

fetchLatestCompleted();