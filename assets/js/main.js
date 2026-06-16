
(function() {
  "use strict";

  /*
    Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /*
   Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /*
    Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  

  /*
    Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /*
   Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /*
    Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /*
    Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /*
    Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /*
    Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /*
   Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /*
   Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /*
    Testimonials slider
   */
  new Swiper('.services-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }

  });

  /*
    Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /*
    Photo marquee 
   */
  new Swiper('.photo-slider', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
    allowTouchMove: false,
    speed: 5000,
    autoplay: { delay: 0, disableOnInteraction: false }
  });

  /*
    Poster carousel 
   */
  new Swiper('.poster-slider', {
    centeredSlides: true,       
    slidesPerView: 'auto',       
    spaceBetween: 30,            
    speed: 700,
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    pagination: { el: '.poster-slider .swiper-pagination', clickable: true }
  });

})();

    (function () {
      const grid = document.getElementById('woCalGrid');
      if (!grid) return;
      const monthLabel = document.getElementById('woCalMonth');
      const dows = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const today = new Date();
      let view = new Date(today.getFullYear(), today.getMonth(), 1);
      let selectedKey = null;
      const key = (y,m,d) => y + '-' + m + '-' + d;
 
      function render() {
        const y = view.getFullYear(), m = view.getMonth();
        monthLabel.textContent = y + '. ' + String(m + 1).padStart(2, '0');
        grid.innerHTML = '';
        dows.forEach((d, i) => {
          const el = document.createElement('div');
          el.className = 'dow' + (i === 0 ? ' sun' : '');
          el.textContent = d;
          grid.appendChild(el);
        });
        const firstDay = new Date(y, m, 1).getDay();
        const total = new Date(y, m + 1, 0).getDate();
        for (let i = 0; i < firstDay; i++) {
          const e = document.createElement('div'); e.className = 'empty'; grid.appendChild(e);
        }
        for (let d = 1; d <= total; d++) {
          const cell = document.createElement('div');
          cell.className = 'day';
          cell.textContent = d;
          if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate()) cell.classList.add('today');
          if (selectedKey === key(y, m, d)) cell.classList.add('selected');
          cell.addEventListener('click', () => { selectedKey = key(y, m, d); render(); });
          grid.appendChild(cell);
        }
      }
      document.getElementById('woCalPrev').addEventListener('click', () => { view.setMonth(view.getMonth() - 1); render(); });
      document.getElementById('woCalNext').addEventListener('click', () => { view.setMonth(view.getMonth() + 1); render(); });
      document.getElementById('woCalReset').addEventListener('click', () => { selectedKey = null; view = new Date(today.getFullYear(), today.getMonth(), 1); render(); });
      render();
      })();
/**
   * POST 제목의 카테고리 글자 바꾸기
   */
     document.querySelectorAll('.post-cat a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const parentText = this.closest('details').querySelector('summary').textContent.trim();
    const childText = this.textContent.trim();
    document.getElementById('post-category').textContent = `${parentText} / ${childText}`;
  });
});
   
