// menu
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');
const navlinks = document.querySelectorAll('.nav-link'); // Select both desktop & mobile links
const sections = document.querySelectorAll('section'); // Select all sections

btn.addEventListener('click', () => {
    mobilemenu();
});

navlinks.forEach(navlink => {
    navlink.addEventListener('click', function () {
        // Remove active state from all nav items
        navlinks.forEach(nav => nav.classList.remove("text-primary", "font-semibold"));

        // Add active state to the clicked one
        this.classList.add("text-primary", "font-semibold");

        // Close menu if open (for mobile)
        if (btn.classList.contains('open')) {
            mobilemenu();
        }
    });
});

document.getElementById('mobile-joinnow').addEventListener('click', () => {
    mobilemenu();
});

// Function to track scroll position and update active nav item
function updateActiveNav() {
    let fromTop = window.scrollY + 100; // Offset for better accuracy

    sections.forEach(section => {
        let sectionId = section.getAttribute('id');

        // Select both desktop and mobile nav links
        let correspondingNavLinks = document.querySelectorAll(`.nav-link[href="#${sectionId}"]`);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            // Remove active state from all nav items
            navlinks.forEach(nav => nav.classList.remove("text-primary", "font-semibold"));

            // Add active state to both desktop & mobile nav items
            correspondingNavLinks.forEach(link => link.classList.add("text-primary", "font-semibold"));
        }
    });
}

// Listen for scroll events to update active nav item
window.addEventListener("scroll", updateActiveNav);

// Ensure correct active state on page load
document.addEventListener("DOMContentLoaded", updateActiveNav);

function mobilemenu() {
    btn.classList.toggle('open');
    nav.classList.toggle('flex');
    nav.classList.toggle('hidden');

    // Update active state after menu opens
    setTimeout(updateActiveNav, 100);
}

// testimonial carousel
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currslide = 1;
let autoScroll;
let userInteracted = false;

// Detect screen size dynamically
function getScreenSize() {
    return window.innerWidth < 1024 ? "lg" : "xl";
}

// Function to update the carousel display
function carousel(slidenum) {
    const screenSize = getScreenSize();
    const isSmallScreen = screenSize === "lg";
    
    // Ensure current slide is within index
    if (slidenum > slides.length) currslide = 1;
    else if (slidenum < 1) currslide = slides.length;
    
    // Hide all slides first
    slides.forEach(slide => slide.classList.add("hidden"));
    
    // Show slides based on screen size
    if (isSmallScreen) {
        slides[currslide - 1].classList.remove("hidden");
    } else {
        slides[currslide - 1].classList.remove("hidden");
        if (currslide < slides.length) {
            slides[currslide].classList.remove("hidden");
        }
    }

    // Update active dot indicator
    let y;
    for(y=0; y < dots.length; y++){
        dots[y].classList.remove("bg-gray-500");
        dots[y].classList.add("bg-gray-300");
    }
    
    dots[currslide - 1].classList.add("bg-gray-500");
}

// Function to handle next/prev clicks
function navigateSlide(step) {
    userInteracted = true; // Stop auto-scroll on interaction
    carousel(currslide += step);
}

// Event Listeners for buttons
prevBtn.addEventListener('click', () => navigateSlide(-1));
nextBtn.addEventListener('click', () => navigateSlide(1));

// Allow clicking on dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        userInteracted = true;
        carousel(currslide = index + 1);
    });
});

// Auto-scroll function (stops if user interacts)
function startAutoScroll() {
    autoScroll = setInterval(() => {
        if (!userInteracted) {
            carousel(currslide += 1);
        }
    }, 3000); // Change slide every 3 seconds
}

// Monitor screen size in real-time
window.addEventListener("resize", () => carousel(currslide));

// Start everything on load
document.addEventListener("DOMContentLoaded", () => {
    carousel(currslide);
    startAutoScroll();
});

// Join now form check
document.getElementById('trial-btn').addEventListener('click', (e)=>{
    e.preventDefault();
    const rname = document.querySelector('.rname').value;
    const remail = document.querySelector('.remail').value;
    
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(rname === "" || remail === "" || !remail.match(pattern)){
        window.alert("Sorry! Please fill out the valid information!");
        return;
    };
    window.alert(`Congrations ${rname}! You can start your free trial now.`);
});

// footer auto year
document.getElementById('autoyear').innerHTML = new Date().getUTCFullYear();