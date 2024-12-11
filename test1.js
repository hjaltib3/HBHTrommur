window.addEventListener('scroll', () => {
    const banner = document.querySelector('.banner');
    if (window.scrollY > 50) {
        banner.classList.add('scrolled');
    } else {
        banner.classList.remove('scrolled');
    }
});


const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    
    slides.forEach(slide => slide.classList.remove('previous'));
    
    
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('previous');
    
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    
    slides[currentSlide].classList.add('active');
}


slides[0].classList.add('active');


setInterval(nextSlide, 5000);


console.log('Slideshow initialized');
window.addEventListener('scroll', () => {
    console.log('Scroll position:', window.scrollY);
});



const scheduleButton = document.getElementById('scheduleButton');
const scheduleOverlay = document.getElementById('scheduleOverlay');
const scheduleBody = document.getElementById('scheduleBody');
const bookingForm = document.getElementById('bookingForm');
const pronounsSelect = document.getElementById('pronouns');
const otherPronouns = document.getElementById('otherPronouns');


pronounsSelect.addEventListener('change', () => {
    otherPronouns.style.display = pronounsSelect.value === 'other' ? 'block' : 'none';
    if (pronounsSelect.value !== 'other') {
        document.getElementById('customPronouns').value = '';
    }
});


const unavailableSlots = {
    'Monday': ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '20:00', '21:00', '22:00'],
    'Tuesday': ['12:00', '17:00', '18:00', '19:00'],
    'Wednesday': ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    'Thursday': ['12:00', '13:00', '14:00', '15:00', '17:00', '18:00', '19:00'],
    'Friday': ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const isFormValid = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const pronouns = document.getElementById('pronouns').value;
    const customPronouns = document.getElementById('customPronouns').value;

    if (!name || !email || !address || !pronouns) {
        return false;
    }

    if (pronouns === 'other' && !customPronouns) {
        return false;
    }

    return true;
};


const generateTimeSlots = () => {
    const hours = [];
    for (let i = 12; i <= 23; i++) {
        hours.push(`${i}:00`);
    }
    hours.push('00:00');
    
    return hours.map(hour => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('th');
        timeCell.textContent = hour;
        row.appendChild(timeCell);
        
        days.forEach((day, index) => {
            const cell = document.createElement('td');
            if (unavailableSlots[day]?.includes(hour)) {
                cell.textContent = 'Uppbókað';
                cell.classList.add('Uppbókað');
            } else {
                cell.addEventListener('click', handleCellClick);
            }
            row.appendChild(cell);
        });
        
        return row;
    });
};

const handleCellClick = (event) => {
    if (!isFormValid()) {
        alert('Fylltu Formið fyrst');
        bookingForm.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const cell = event.target;

    if (!cell.classList.contains('booked') &&
        !cell.classList.contains('Uppbókað')) {

        
        cell.textContent = 'Bókað';
        cell.classList.add('booked');

        
        const currentRow = cell.parentElement;
        const nextRow = currentRow.nextElementSibling;

        if (nextRow) {
            const nextCell = nextRow.children[cell.cellIndex];
            if (nextCell) {
                
                nextCell.classList.add('partially-blocked');

                
                const overlayDiv = document.createElement('div');
                overlayDiv.className = 'partial-cover';
                overlayDiv.textContent = '';
                nextCell.appendChild(overlayDiv);
            }
        }

        console.log('Appointment booked:', cell);
    }
};



scheduleButton.addEventListener('click', () => {
    scheduleOverlay.classList.toggle('active');
    console.log('Schedule visibility toggled');
});


const timeSlots = generateTimeSlots();
timeSlots.forEach(row => scheduleBody.appendChild(row));

console.log('Schedule initialized');



function initSlideshow(slideshowId) {
    const slideshow = document.getElementById(slideshowId);
    const slides = slideshow.querySelectorAll('.slides a img');
    const dotsContainer = slideshow.querySelector('.dots');
    let currentIndex = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('button');
    dots[0].classList.add('active');
    slides[0].classList.add('active');

   
    function showSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }


    function nextSlide() {
        showSlide((currentIndex + 1) % slides.length);
    }


    function prevSlide() {
        showSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    
    slideshow.querySelector('.prev').addEventListener('click', prevSlide);
    slideshow.querySelector('.next').addEventListener('click', nextSlide);

    
    setInterval(nextSlide, 5000);
}


initSlideshow('drumsticks-slideshow');
initSlideshow('pads-slideshow');
initSlideshow('drums-slideshow');





const trackData = {
    consistency: [
        { title: 'Adventure is out there - AJR', src: 'Music/conadventureisoutthere.mp3' },
        { title: 'Run boy run - Woodkid', src: 'Music/conrunboyrun.mp3' },
        { title: 'Hells comin with me - Poor mans poison', src: 'Music/conhellscomin.mp3' },
        { title: 'The DJ is crying for help - AJR', src: 'Music/condjiscrying.mp3' },
        { title: 'Two Birds - Regina Spektor', src: 'Music/contwobirds.mp3' },
        { title: 'Still though we should dance - Radnor & Lee', src: 'Music/constillthoughweshoulddance.mp3' },
        { title: 'Ferryman - Shayfer James', src: 'Music/conferryman.mp3' },
        { title: 'Greetings From Suburbia - j Solomon', src: 'Music/congreetingsfromsuburb.mp3' },
        { title: 'Maybe man - AJR', src: 'Music/conmaybeman.mp3' },
        { title: 'Worlds Smallest violin - AJR', src: 'Music/consmallestviolin.mp3' },
        { title: 'Turn out the lights - the crane wives', src: 'Music/conturnoutthelight.mp3' },
        { title: 'Ghost - Telehope', src: 'Music/conghost.mp3' },
        { title: 'The feeling - Sammy rae and the friends', src: 'Music/confeeling.mp3' },
    ],
    fills: [
        { title: 'After hours - Alex Ernst', src: 'Music/fillafterhours.mp3' },
        { title: 'Blue sky - Quail', src: 'Music/fillbluesky.mp3' },
        { title: 'Feeling good - Michael Buble', src: 'Music/fillfeelinggood.mp3' },
        { title: 'Good life - Shayfer James', src: 'Music/fillgoodlife.mp3' },
        { title: 'If it all goes south - Sammy Rae', src: 'Music/fillifsouth.mp3' },
        { title: 'I know the end - Phoebe Bridgers', src: 'Music/filliktheend.mp3' },
        { title: 'Mercy down - Shayfer James', src: 'Music/fillmercydown.mp3' },
        { title: 'The Hound & the Fox - I the Mighty', src: 'Music/fillthehoundfox.mp3' },
    ],
    pocket: [
        { title: 'D - Basement - Mute choir', src: 'Music/pocketdbasement.mp3' },
        { title: 'D - Im Good - The Mowglis', src: 'Music/pocketdimgood.mp3' },
        { title: 'D - Wannabe pt 2. - North Bloom', src: 'Music/pocketdwannabe.mp3' },
        { title: 'R - Bad habits - Violet Crime', src: 'Music/pocketrbadhabits.mp3' },
        { title: 'R - Medicine - Artist vs Poet', src: 'Music/pocketrmedicine.mp3' },
        { title: 'R - Stranger - Miki Fiki', src: 'Music/pocketrstranger.mp3' },
        { title: 'S - Follow me like the moon - Sammy Rae', src: 'Music/pocketsfollowmoon.mp3' },
        { title: 'S - Jesus on the telephone - M.O.T.H.H.', src: 'Music/pocketsjesustele.mp3' },
        { title: 'S - Quittin kind - Eleisha Eagle', src: 'Music/pocketsquittin.mp3' },
    ],
    improv: [
        { title: 'Be OK - Scrawny', src: 'Music/imprvbeok.mp3' },
        { title: 'Good life - Sammy Rae', src: 'Music/imprvgoodlife.mp3' },
        { title: 'Inertia - AJR', src: 'Music/imprvinertia.mp3' },
        { title: 'Im confident that Im insecure - Lawrence', src: 'Music/imprvinsecure.mp3' },
        { title: 'Kick it to me - Sammy Rae', src: 'Music/imprvkickit.mp3' },
        { title: 'London air raids - Vian Izak', src: 'Music/imprvlondonairraid.mp3' },
        { title: 'SuperBloom - Misterwives', src: 'Music/imprvsuperbloom.mp3' },
    ],
    counting: [
        { title: '2/4 - Be our guest - Beauty & the Beast', src: 'Music/countbeourguest.mp3' },
        { title: '3/4 - On your mind - Noah Floerch', src: 'Music/countonyourmind.mp3' },
        { title: '4/4 - BANG! - AJR', src: 'Music/countbang.mp3' },
        { title: '5/8 - Take five - Dave Brubeck', src: 'Music/counttakefive.mp3' },
        { title: '6/8 - Goodbye Percy - Maggie Jean Martin', src: 'Music/countgoodbyepercy.mp3' },
        { title: '7/8 - Whiplash - Hank Levy', src: 'Music/countwhiplash.mp3' },
        { title: '8/8 - Birthday Party - AJR', src: 'Music/countbirthdayparty.mp3' },
        { title: '11/8 - Night in Tunisia - Jesus Molina', src: 'Music/counttunisia.mp3' },
    ],
};


const audioPlayer = document.getElementById('mainAudioPlayer');
const audioSource = document.getElementById('audioSource');
const tracksContainer = document.getElementById('tracksContainer');


document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        updateTracks(category);
    });
});


function updateTracks(category) {

    tracksContainer.innerHTML = '';

    
    const trackList = document.createElement('ul');
    trackList.className = 'track-list active';

    trackData[category].forEach(track => {
        const listItem = document.createElement('li');
        const trackButton = document.createElement('button');
        trackButton.textContent = track.title;
        trackButton.addEventListener('click', () => playTrack(track.src));
        listItem.appendChild(trackButton);
        trackList.appendChild(listItem);
    });

    
    tracksContainer.appendChild(trackList);
}


function playTrack(src) {
    
    audioPlayer.pause();

    
    audioSource.src = src;

    
    audioPlayer.load();
    audioPlayer.play();
}





document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll(".navbar-link");

    navbarLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navbarList = document.getElementById("navbarList");

    
    hamburgerMenu.addEventListener("click", () => {
        navbarList.classList.toggle("show");
    });

    
    const navbarLinks = document.querySelectorAll(".navbar-link");
    navbarLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }

            
            navbarList.classList.remove("show");
        });
    });
});
