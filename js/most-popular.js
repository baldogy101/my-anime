export async function fetchMostPopular() {
    try {
        const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
        const data = await res.json();
        const animeList = data.data.filter(anime => anime.type === 'TV');

        const trendingTrack = document.querySelector('.most-popular');
        trendingTrack.innerHTML = ''; // clear existing slides

        const topFive = animeList.slice(0, 5);

        topFive.forEach(anime => {
            const slide = document.createElement('div');
            const shortRating = anime.rating.split(' ').slice(0, 1).join(' ') || 'N/A';
            
            slide.innerHTML = `
            <div class="most-polpular-api">
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

fetchMostPopular();