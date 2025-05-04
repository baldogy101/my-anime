export async function fetchAnimeTrending() {
    try {
        const res = await fetch('https://api.jikan.moe/v4/seasons/now');
        const data = await res.json();
        const animeList = data.data.filter(anime => anime.type === 'TV');

        const trendingTrack = document.querySelector('.trending-cards');
        trendingTrack.innerHTML = ''; // clear existing slides

        animeList.forEach((anime, index) => {
            const slide = document.createElement('div');
            slide.innerHTML = `
            <div class="trending-api">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
                <div class="title-box">
                    <h3>${anime.title_english || anime.title}</h3>
                    <h1>#${index + 1}</h1>
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

function trendingBtn() {
    const prevBtn = document.querySelector('.trending-btn.prev');
    const nextBtn = document.querySelector('.trending-btn.next');
    const track = document.querySelector('.trending-cards');

    const scrollAmount = 200;

          
  
    // Attach button listeners
    nextBtn?.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth'});
    });
    
    prevBtn?.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

fetchAnimeTrending().then(() => trendingBtn());