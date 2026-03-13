import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
export const animateHero = (container: string | Element) => {
  const tl = gsap.timeline();
  
  tl.from(`${container} h1`, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from(`${container} p`, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from(`${container} .button-container`, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4');

  return tl;
};

// Section animations for scrolling
export const animateOnScroll = (elements: string, staggerAmount = 0.2) => {
  gsap.from(elements, {
    scrollTrigger: {
      trigger: elements,
      start: 'top 80%',
      toggleActions: 'play none none reset',
      markers: false,
      once: false
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: staggerAmount,
    ease: 'power3.out'
  });
};

// Animate cards with hover effect
export const animateCards = (cards: string) => {
  const cardElements = document.querySelectorAll(cards);
  
  cardElements.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
};

// Text reveal animation
export const animateText = (text: string) => {
  gsap.from(text, {
    scrollTrigger: {
      trigger: text,
      start: 'top 80%',
      toggleActions: 'play none none reset',
      markers: false
    },
    duration: 1,
    opacity: 0,
    y: 20,
    ease: 'power3.out'
  });
};

// Initialize all animations
export const initAnimations = () => {
  // Make sure GSAP is registered
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero animations
  animateHero('.hero-section');
  
  // Section animations
  animateOnScroll('.mission-card');
  animateOnScroll('.donation-option', 0.15);
  animateOnScroll('.gallery-item', 0.1);
  
  // Text animations
  animateText('.section-title');
  animateText('.section-description');
  
  // Card hover animations
  animateCards('.interactive-card');

  // Force ScrollTrigger to refresh
  ScrollTrigger.refresh();
};