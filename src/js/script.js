const burger = document.querySelector('.header__burger');
const nav = document.querySelector('nav');
const menuElements = document.querySelectorAll('.header__menu-item');
const instrumentMembers = document.querySelectorAll('.band__member-instrument');
const song = document.querySelector('.header__select-song');
const audioSrc = document.getElementById('audio-src');


const player = new Plyr('#player', {
    controls: ['play-large', 'play', 'progress', 'current-time']
});

song.addEventListener('change', function () {
    player.source = {
        type: 'audio',
        title: this.value,
        sources: [{
            src: `../audio/${this.value}.mp3`,
            type: 'audio/mp3',
        }]
    };
    player.play();
})

const scrollSmooth = function (minus) {
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - minus
            }, 1000);
        }
    });
}

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    window.innerWidth < 1023
) {
    scrollSmooth(0);
    window.addEventListener('scroll', () => {
        instrumentMembers.forEach(member => {
            const instrument = document.querySelector(`p[data-inst="${member.textContent}"]`);
            if (window.pageYOffset >= member.offsetTop - ((window.innerHeight + 300) / 2)) {
                instrument.classList.add('band__member-instrument--is-active');
            } else {
                instrument.classList.remove('band__member-instrument--is-active');
            }
        })
    })
} else {
    scrollSmooth(nav.offsetHeight);
}


const isActive = function () {
    nav.classList.toggle('header__nav--is-active')
    burger.classList.toggle('header__burger--is-active');
    burger.classList.toggle('opacity');
}

burger.addEventListener('click', () => isActive());

menuElements.forEach(element => {
    element.addEventListener('click', () => isActive());
})