import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import SplitType from 'split-type';
import Cursor from './components/cursor.ts';
import Hero from './components/hero.ts';
import Works from './components/works.ts';
import Technologies from './components/technologies.ts';
import Contact from './components/contact.ts';
import { darkColor } from './colors.ts';

/**
 * Initialize meshes
 */
console.log('hi');
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const isMobile = window.innerWidth < 550;
isMobile ? document.querySelector('.loader-container')?.remove() : load(0);
resize();
new Cursor(isMobile);
new Hero();
new Works();
new Technologies().init(isMobile);
new Contact(isMobile);

window.addEventListener('resize', () => {
  resize();
});

document.getElementById('header-name')!.addEventListener('click', () => {
  scrollToPosition(0.01);
});
document.getElementById('header-works')!.addEventListener('click', () => {
  scrollToPosition(0.355);
});
document.getElementById('header-technologies')!.addEventListener('click', () => {
  scrollToPosition(0.69);
});
document.getElementById('header-contact')!.addEventListener('click', () => {
  scrollToPosition(0.91);
});

/**
 * Recursive loading screen
 */
function load(count: number) {
  // finished loading and play enter animation
  if (count >= 100) {
    const header = document.getElementById('header-name')!;
    const font = window.getComputedStyle(header).fontSize;
    const { top, left } = header.getBoundingClientRect();
    gsap.to('#load-name', {
      fontSize: font,
      top: top,
      left: left,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5
    });

    // wait for .5 seconds
    setTimeout(() => {
      let loadingPercent = new SplitType('#loading', { types: 'chars' });
      gsap
        .timeline()
        .to(loadingPercent!.chars, {
          yPercent: -200,
          stagger: 0.15,
          duration: 0.5,
          delay: 0.5
        })
        .to('.loader-container', {
          opacity: 0,
          duration: 0.5,
          delay: 0.1,
          ease: 'power2.out'
        })
        .add(() => {
          document.querySelector('.loader-container')?.remove();
        });
    }, 500);
    return;
  }
  const d = Math.random();
  count += d > 0.95 ? Math.ceil(Math.sqrt(d) * 25) : 1;
  if (count > 100) {
    count = 100;
  }
  const loading = document.getElementById('loading')!;
  loading.innerHTML = `${count}%`;
  let scalePercent = (count * 82) / 100;
  document.getElementById('loading')!.style.right = 82 - scalePercent + '%';
  setTimeout(load, 40, count);
}

function resize() {
  const headerLeft = document.getElementsByClassName('header-left')[0] as HTMLElement;
  const headerRight = document.getElementsByClassName('header-right')[0] as HTMLElement;
  if (isMobile || window.innerWidth < 600) {
    headerRight.style.visibility = 'hidden';
    headerLeft.style.width = '87.5%';
    headerRight.style.minWidth = window.innerWidth < 450 ? '100%' : '450px';
  } else {
    headerRight.style.visibility = 'visible';
    headerLeft.style.width = '';
    headerRight.style.width = '25%';
  }
}

const scrollToPosition = (percent: number) => {
  let scrollContentHeight = document.querySelector('.page')!.scrollHeight;
  const current = window.scrollY / scrollContentHeight;
  const duration = 4.5 * Math.sqrt(Math.abs(current - percent));
  gsap.to(window, {
    duration: duration,
    ease: 'power2.out',
    scrollTo: scrollContentHeight * percent
  });
};

/**
 * https://tympanus.net/codrops/2022/12/13/how-to-code-an-on-scroll-folding-3d-cardboard-box-animation-with-three-js-and-gsap/
 * Animation timeline by scrolling
 */
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.page',
    start: '0% 0%',
    end: '100% 100%',
    scrub: 1
    //markers: true
  }
});

timeline
  // .to(
  // 	pfpParam,
  // 	{
  // 		x: 15,
  // 		y: -1,
  // 		z: -8,
  // 		duration: 15 // end time is start time + duration
  // 	},
  // 	0 // start time
  // )

  // move about text out of screen
  .to('.hero-container', { yPercent: -100, duration: 18 }, 2)

  // move works text then shrink then move again
  .to('.works-container', { yPercent: -58, duration: 16 }, 6)
  .to('#works div', { fontSize: (window.innerWidth - 14) * 0.18, duration: 8 }, 24)
  .to('.works-container', { yPercent: -200, duration: 48 }, 34)

  // transition to technologies
  .to('.technologies-container', { yPercent: -100, duration: 26 }, 44)
  .fromTo('#best', { x: -window.innerWidth * 0.65 }, { x: -window.innerWidth * 0.21, duration: 28 }, 44)
  .fromTo('.main', { x: -window.innerWidth * 1.8 }, { x: 0, duration: 28 }, 42)
  .fromTo('#use', { x: window.innerWidth * 0.7 }, { x: -window.innerWidth * 0.1, duration: 35 }, 44)

  // move mask if mobile
  .to('#top', { yPercent: 100, duration: 8 }, 70)
  .to('#left', { xPercent: 100, duration: 8 }, 70)
  .to('#right', { xPercent: -100, duration: 8 }, 70)

  .to('.secondary', { opacity: 0, duration: 7 }, 65)
  .to('#matter-canvas', { yPercent: -50, duration: 12 }, 69)

  // move mask away
  .to('#top', { yPercent: -50, duration: 13 }, 92)
  .to('#left', { xPercent: -50, duration: 10 }, 95)
  .to('#right', { xPercent: 50, duration: 5 }, 89)

  // transition to contact page
  .to('.technologies-container', { xPercent: -100, duration: 20 }, 87)
  .to('.main', { x: 0, duration: 20 }, 85)
  .to('.contact-container', { xPercent: -100, duration: 20 }, 87)
  .to('.contact-container', { color: darkColor.hexString, duration: 2 }, 87)
  .to('#header-contact', { color: darkColor.hexString, duration: 1.5 }, 87.5)
  .to('#header-technologies', { color: darkColor.hexString, duration: 1.5 }, 88.25)
  .to('#header-works', { color: darkColor.hexString, duration: 1.5 }, 89.3)
  .to('#header-name', { color: darkColor.hexString, duration: 8 }, 98)

  // to make start time a percentage out of 110 from total duration
  // start time + duration cannot be greater than 110 or it will change timeline
  .to({}, {}, 110);
// it was 100% at 1500vh
