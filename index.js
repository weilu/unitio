const endOfDocumentTop = 70
let logo

document.addEventListener('DOMContentLoaded', function (event) {
  logo = document.getElementById('logo')

  document.querySelector('#nav').addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.matches('li a')) {
      var anchor = event.target.getAttribute('href')
      if (anchor === '#home') {
        window.scroll({top: 0, behavior: 'smooth'})
      } else {
        document.querySelector(anchor).scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }
  })

  onScroll()
  setTimeout(() => {
    // transition in owl
    logo.classList.remove('init')
  })

  document.querySelector('#copyright span').innerHTML = new Date().getFullYear()
})

window.onscroll = onScroll

function onScroll () {
  resizeLogo()
  markActive()
  fadeMasks()
}

function resizeLogo () {
  const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

  if (logo.className !== 'smallLogo' && scroll > endOfDocumentTop) {
    logo.classList.replace('largeLogo', 'smallLogo')
  } else if (logo.className !== 'largeLogo' && scroll <= endOfDocumentTop) {
    logo.classList.replace('smallLogo', 'largeLogo')
  }
}

function markActive () {
  let minElBottom = Number.MAX_SAFE_INTEGER
  let activeEl = null
  const currentActiveEl = document.querySelector('.slide.active')
  document.querySelectorAll('.slide').forEach(function (el) {
    const elBottom = el.getBoundingClientRect().bottom - 100
    if (elBottom >= 0 && elBottom < minElBottom) {
      minElBottom = elBottom
      activeEl = el
    }
  })
  if (currentActiveEl !== activeEl) {
    if (currentActiveEl) {
      currentActiveEl.classList.remove('active')
    }
    activeEl.classList.add('active')
  }

  if (currentActiveEl) {
    const activeNav = document.querySelector('a[href="#' + currentActiveEl.id + '"]')
    updateActiveNav(activeNav)

    const navEl = document.querySelector('#nav')
    if (currentActiveEl.id === 'services') {
      navEl.classList.add('inverted')
    } else {
      navEl.classList.remove('inverted')
    }
  }
}

function fadeMasks () {
  const services = document.querySelector('#services')

  const maskEl = document.querySelector('#mask')
  const maskInvertedEl = document.querySelector('#mask-inverted')
  const rect = services.getBoundingClientRect()
  if (rect.top < 0 && rect.bottom > 150) {
    // show white mask
    maskEl.classList.add('hidden')
    maskInvertedEl.classList.remove('hidden')
  } else {
    // show black mask
    maskEl.classList.remove('hidden')
    maskInvertedEl.classList.add('hidden')
  }
}

function updateActiveNav (activeNav) {
  const currentActiveNav = document.querySelector('nav a.active')
  if (currentActiveNav !== activeNav) {
    if (currentActiveNav) {
      currentActiveNav.classList.remove('active')
    }
    activeNav.classList.add('active')
  }
}
