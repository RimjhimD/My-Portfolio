// Smooth scroll nav
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// Rotating sidebar quotes
const quotes = [
  "Stay chill, code thrill.",
  "Eat, sleep, debug, repeat.",
  "Error 404: Boring not found."
];
const quotesEl = document.getElementById('quotes');
let index = 0;
setInterval(() => {
  index = (index + 1) % quotes.length;
  quotesEl.innerHTML = quotes[index];
}, 6000);

// Rotating footer quotes
const footerQuotes = document.querySelectorAll('footer .rotating-quotes span');
let fIndex = 0;
setInterval(() => {
  footerQuotes.forEach((quote, i) => {
    quote.style.opacity = '0';
    quote.style.transform = 'translateY(20px)';
    if(i === fIndex){
      quote.style.opacity = '1';
      quote.style.transform = 'translateY(0)';
    }
  });
  fIndex = (fIndex + 1) % footerQuotes.length;
}, 4000);

// Contact form simple alert
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out! I will get back to you soon.');
  e.target.reset();
});
