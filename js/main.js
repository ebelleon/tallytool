// Sticky Navigation
window.onscroll = function() { stickyNav() };

const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobileNavList');
const navbar = document.querySelector('.navbar');
const sticky = navbar.offsetTop + 50;

function stickyNav() {
  if (window.scrollY >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}

// Highlighted Navigation
$(document).ready(function () {
  $(document).on('scroll', onScroll);
  
  //smoothscroll
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off('scroll');
      
      $('a').each(function () {
          $(this).removeClass('active');
      })
      $(this).addClass('active');
    
      var target = this.hash,
          menu = target;
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top+2
      }, 700, 'swing', function () {
          window.location.hash = target;
          $(document).on('scroll', onScroll);
      });
  });
});

function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('#navbar a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('#navbar ul a').removeClass('active');
          currLink.addClass('active');
      }
  });
}

// Burger Menu
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('is-active');
    // if (document.querySelector('.mobileNavList.hidden')) {
    //   mobileNav.classList.toggle('hidden');
    // } else {
    //   mobileNav.classList.toggle('hidden');
    // }
});