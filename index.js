var logo;
var endOfDocumentTop = 100;

document.addEventListener("DOMContentLoaded", function(event) {
  logo = document.getElementById("logo");
  document.querySelector('#nav').addEventListener('click', function(event) {
    event.preventDefault()
    if (event.target.matches('li a')) {
      document.querySelector(event.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'})
    }
  });
  markActive()
});

window.onscroll = function() {
  resizeLogo()
  markActive()
};

function resizeLogo() {
  var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (logo.className !== 'smallLogo' && scroll > endOfDocumentTop) {
    logo.className = 'smallLogo';
  } else if(logo.className !== 'largeLogo' && scroll <= endOfDocumentTop){
    logo.className = 'largeLogo';
  }
}

function markActive() {
  var minElBottom = Number.MAX_SAFE_INTEGER
  var activeEl = null
  var currentActiveEl = document.querySelector('.slide.active')
  document.querySelectorAll('.slide').forEach(function(el) {
    elBottom = el.getBoundingClientRect().bottom - 100
    if (elBottom >= 0 && elBottom < minElBottom) {
      minElBottom = elBottom
      activeEl = el
    }
  })
  if (currentActiveEl != activeEl) {
    if (currentActiveEl) {
      currentActiveEl.classList.remove('active')
    }
    activeEl.classList.add('active')
  }

  if (currentActiveEl) {
    var activeNav = document.querySelector('a[href="#' + currentActiveEl.id + '"]')
    updateActiveNav(activeNav)

    var navEl = document.querySelector('#nav')
    var maskEl = document.querySelector('#mask')
    if (currentActiveEl.id === 'services') {
      if (!navEl.classList.contains('inverted')) navEl.classList.add('inverted')
      if (!maskEl.classList.contains('inverted')) maskEl.classList.add('inverted')
    } else {
      if (navEl.classList.contains('inverted')) navEl.classList.remove('inverted')
      if (maskEl.classList.contains('inverted')) maskEl.classList.remove('inverted')
    }
  }
}

function updateActiveNav(activeNav) {
  var currentActiveNav = document.querySelector('nav a.active')
  if (currentActiveNav != activeNav) {
    if (currentActiveNav) {
      currentActiveNav.classList.remove('active')
    }
    activeNav.classList.add('active')
  }
}

