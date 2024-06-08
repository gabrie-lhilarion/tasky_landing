// Adjust the height of the sliding sections taht make up the pages

function adjustHeight() {
    const headerOffsetHeight = document.querySelector('header').offsetHeight
    const sections = document.querySelectorAll('.scroller section');
    const calculatedHeight = window.innerHeight - headerOffsetHeight;
    sections.forEach(section => section.style.height = `${calculatedHeight}px`)
}

adjustHeight()

// Smooth scrolling function
function scrollToSection(id) {
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Add event listeners for navigation links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToSection(this.getAttribute('href'));
    });
});

// Initial setup for scroller width
function updateScrollerWidth() {
    const windowWidth = window.innerWidth;
    const scroller = document.querySelector('.scroller');
    scroller.style.width = `${3 * windowWidth}px`;
}

window.addEventListener('resize', adjustHeight);
window.addEventListener('resize', updateScrollerWidth);
updateScrollerWidth(); // Initial call to set the width on page load

// Intersection Observer to update active navigation link
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('a.nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.scroller section').forEach(section => {
    observer.observe(section);
});


