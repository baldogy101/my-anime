export async function fetchAnime() {
    try {
        const res = await fetch('https://api.jikan.moe/v4/seasons/now');
        const data = await res.json();
        const animeList = data.data.filter(anime => anime.type === 'TV');

        const carouselTrack = document.querySelector('.carousel-track');
        carouselTrack.innerHTML = ''; // clear existing slides

        animeList.forEach((anime, index) => {
            const slide = document.createElement('div');
            slide.classList.add('carousel-slide');

            const airedDate = new Date(anime.aired.from);
            const formattedDate = airedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});
            const shortDuration = anime.duration.split(' ').slice(0, 2).join(' ');
            const shortRating = anime.rating.split(' ').slice(0, 1).join(' ');

            slide.innerHTML = `
            <div class="carousel-api d-flex">
                <div class="carousel-image">
                    <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" />
                </div>

                <div class="carousel-text" style="background: url('${anime.images.webp.large_image_url}');">
                    <p>#${index + 1} spotlight</p>
                    <h1>${anime.title_english || anime.title}</h1>
                    <ul class="d-flex j-space-between">
                        <li>
                            <img src="https://img.icons8.com/?size=100&id=25603&format=png&color=ffffff">
                            ${anime.type}
                        </li>
                        
                        <li>
                            <img src="https://img.icons8.com/?size=100&id=111180&format=png&color=ffffff">
                            ${shortRating}
                        </li>
                        
                        <li>
                            <img src="https://img.icons8.com/?size=100&id=423&format=png&color=ffffff">
                            ${shortDuration}
                        </li>
                        
                        <li>
                            <img src="https://img.icons8.com/?size=100&id=85313&format=png&color=ffffff">
                            ${formattedDate}
                        </li>
                    </ul>

                    <p>${anime.background}</p>
                </div>
            </div>
            `;
            carouselTrack.appendChild(slide);
        });
    }
    catch (err) {
        console.error('Failed to fetch anime: ', err);
    }
}

function initCarouselControls() {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const track = document.querySelector('.carousel-track');

    // clone first and last slide
    const firstSlide = track.firstElementChild.cloneNode(true);
    const lastSlide = track.lastElementChild.cloneNode(true);
    track.appendChild(firstSlide); // Add clone of first to end
    track.insertBefore(lastSlide, track.firstElementChild); // Clone of last at start

    const slides = track.querySelectorAll('.carousel-slide');
    let currentIndex = 1;

    // Set initial position
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    let autoSlide;
  
    function updateSlide() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    track.addEventListener('transitionend', () => {
        if (currentIndex === slides.length - 1) {
          // Jump to real first slide
          track.style.transition = 'none';
          currentIndex = 1;
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
          setTimeout(() => track.style.transition = '', 50); // Restore transition
        } else if (currentIndex === 0) {
          // Jump to real last slide
          track.style.transition = 'none';
          currentIndex = slides.length - 2;
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
          setTimeout(() => track.style.transition = '', 50);
        }
      });
          

    function showNextSlide() {
        currentIndex++;
        updateSlide();
    }

    function showPrevSlide() {
        currentIndex--;
        updateSlide();
    }

  
    function startAutoSlide() {
      autoSlide = setInterval(showNextSlide, 5000);
    }
  
    function stopAutoSlide() {
      clearInterval(autoSlide);
    }
  
    // Attach button listeners
    nextBtn?.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateSlide();
        }
      });
    
    prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlide();
    }
    });
  
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    // Start auto slide
    startAutoSlide();
  }
  

fetchAnime().then(initCarouselControls);