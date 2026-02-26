document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveals
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-3d, .fade-in-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Filtering System
    const genreBtns = document.querySelectorAll('.filter-btn');
    const prefSelect = document.getElementById('pref-select');
    const cards = document.querySelectorAll('.card');

    let currentGenre = 'all';
    let currentPref = 'all';

    function filterCards() {
        cards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre');
            const cardPref = card.getAttribute('data-pref');

            const matchGenre = currentGenre === 'all' || currentGenre === cardGenre;
            const matchPref = currentPref === 'all' || currentPref === cardPref;

            if (matchGenre && matchPref) {
                card.classList.remove('hidden');
                // Re-trigger animation if it was hidden
                setTimeout(() => {
                    card.classList.add('is-visible');
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 50);
            } else {
                card.classList.add('hidden');
                card.classList.remove('is-visible');
                card.style.opacity = "0";
                card.style.transform = "translateY(40px)";
            }
        });
    }

    genreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            genreBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentGenre = e.target.getAttribute('data-genre');
            filterCards();
        });
    });

    prefSelect.addEventListener('change', (e) => {
        currentPref = e.target.value;
        filterCards();
    });

    // Initial trigger to show first batch
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);
});
