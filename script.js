/**
 * Show the page with the given id and update the active nav button.
 * @param {string} id - The id of the page element to show.
 */
function show(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('nb-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Re-observe newly visible elements after page switch
  setTimeout(observeAll, 60);
}

/**
 * Scroll smoothly to the About section within the Home page.
 * If Home is not currently active, switch to it first.
 */
function scrollToAbout() {
  if (!document.getElementById('home').classList.contains('active')) {
    show('home');
    setTimeout(() => document.getElementById('about-anchor').scrollIntoView({ behavior: 'smooth' }), 100);
  } else {
    document.getElementById('about-anchor').scrollIntoView({ behavior: 'smooth' });
  }
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.12 });

function observeAll() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;
  activePage.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// Run on first load
observeAll();