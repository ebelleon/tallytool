/* Sticky Navigation */
window.onscroll = function () { stickyNav() };

const $href = $('.navbar a[href^="#"]');
const $dropdownBtn = $('input[id$="DropdownBtn"]');
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const sticky = navbar.offsetTop + 100;

function stickyNav() {
  if (window.scrollY >= sticky) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}
/* Sticky Navigation */

/* Highlighted Navigation */
$(document).ready(function () {
  $(document).on('scroll', onScroll);

  //smoothscroll
  $href.on('click', function (e) {
    e.preventDefault();
    $(document).off('scroll');

    $('.navbar a').each(function () {
      $(this).removeClass('active');
    });
      $(this).addClass('active');

    let navbarHeight = navbar.clientHeight;
    let target = $(this.hash);
    if (document.querySelector('.navbar.sticky') === null) {
      $('html, body').stop().animate({
        'scrollTop': target.offset().top - navbarHeight
      }, 700, function () {
        $(document).on('scroll', onScroll);
      });
    } else {
      $('html, body').stop().animate({
        'scrollTop': target.offset().top + 2
      }, 700, function () {
        $(document).on('scroll', onScroll);
      });
    }
    hamburger.classList.remove('is-active');
  });
});

function onScroll() {
  let $scrollPos = $(document).scrollTop();
  $('.navbar a').each(function () {
    let $currLink = $(this);
    let $hrefElement = $($currLink.attr('href'));
    if ($hrefElement.position().top <= $scrollPos + 80) {
      $('.navbar a').removeClass('active');
      $currLink.addClass('active');
    }
  });
}
/* Highlighted Navigation */

/* Scroll to Dropdown Content */
$(document).ready(function () {
  $dropdownBtn.on('click', function () {
    if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && $dropdownBtn.is(":checked") ) {
      $('html, body').animate({
        scrollTop: $("div[class$='DropdownContent']").offset().top - navbar.clientHeight
      }, 700);
    };
  });
});
/* Scroll to Dropdown Content */

// Burger Menu 'X' animation
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('is-active');
});

// Get current Year in Footer
document.querySelector('.currentYear').append(new Date().getFullYear());

/* MAIL VALIDATION START */
function checkForCloseMatch(entry, domain) {
  // too many false positives with very short strings
  if (domain.length < 3) return '';

  // test if the domain is in the string (so everything is fine)
  if (entry.includes(domain)) return '';

  // split the domain string into two at each postion e.g. g|mail gm|ail gma|il gmai|l
  // and test that each half exists with one gap
  for (let i = 1; i < domain.length; i++) {
    const firstPart = domain.substring(0, i);
    const secondPart = domain.substring(i);

    // test for wrong letter
    const wrongLetterRegEx = new RegExp(`${firstPart}.${secondPart.substring(1)}`);
    if (wrongLetterRegEx.test(entry)) {
      return entry.replace(wrongLetterRegEx, domain);
    }

    // test for extra letter
    const extraLetterRegEx = new RegExp(`${firstPart}.${secondPart}`);
    if (extraLetterRegEx.test(entry)) {
      return entry.replace(extraLetterRegEx, domain);
    }

    // test for missing letter
    if (secondPart !== 'mail') {
      const missingLetterRegEx = new RegExp(`${firstPart}{0}${secondPart}`);
      if (missingLetterRegEx.test(entry)) {
        return entry.replace(missingLetterRegEx, domain);
      }
    }

    // test for switched letters
    const switchedLetters = [
      domain.substring(0, i - 1),
      domain.charAt(i),
      domain.charAt(i - 1),
      domain.substring(i + 1),
    ].join('');

    if (entry.includes(switchedLetters)) {
      return entry.replace(switchedLetters, domain);
    }
  }

  // if nothing was close, then there wasn't a typo
  return '';
}

function checkForDomainTypo(userEmail) {
  const domains = ['googlemail', 'hotmail', 'outlook', 'yahoo', 'icloud', 'mail'];
  const [leftPart, rightPart] = userEmail.split('@');

  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];
    const result = checkForCloseMatch(rightPart, domain);

    if (result) return `${leftPart}@${result}`;
  }

  return '';
}

function checkForNameTypo(userEmail, name) {
  const [leftPart, rightPart] = userEmail.split('@');
  const result = checkForCloseMatch(leftPart, name);

  if (result) return `${result}@${rightPart}`;

  return '';
}

function checkForCommonTypos(userInput) {
  const commonTypos = [
    {
      pattern: /,(com|de|org|net)$/,
      fix: str => str.replace(/,(com|de|org|net)$/, '.$1'),
    },
    {
      pattern: /,co\.\w{2}$/,
      fix: str => str.replace(/,(co\.\w{2}$)/, '.$1'),
    },
    {
      pattern: /@\w*$/,
      fix: str => str + '.com',
    },
  ];

  let typo = commonTypos.find(typo => typo.pattern.test(userInput));

  if (typo) return typo.fix(userInput);

  return '';
}

function checkForTypo(userInput) {
  const email = userInput.email;

  return checkForCommonTypos(email)
    || checkForDomainTypo(email)
    || checkForNameTypo(email, userInput.name === "" || userInput.name.split(/[, ]+/g)[0].trim().toLowerCase())
    || checkForNameTypo(email, userInput.name === "" || userInput.name.split(/[, ]+/g)[1].trim().toLowerCase());
}

const getEl = selector => document.querySelector(selector);

const nameEl = getEl('[name="name"]');
const emailEl = getEl('[name="email"]');
const messageEl = getEl('.valMessage');

let suggestedEmail = '';

function gatherDataAndCheck() {
  suggestedEmail = checkForTypo({
    name: nameEl.value,
    email: emailEl.value,
  });

  if (suggestedEmail) {
    messageEl.textContent = `Meinten Sie ${suggestedEmail}?`;
    messageEl.tabindex = 1;
    messageEl.focus();
  } else {
    messageEl.textContent = '';
  }
}

emailEl.addEventListener('blur', gatherDataAndCheck);

messageEl.addEventListener('click', () => {
  if (suggestedEmail) emailEl.value = suggestedEmail;
  emailEl.focus();
  gatherDataAndCheck();
});
/* MAIL VALIDATION END */

/* CONTACT FORM */
const form = document.querySelector('form');
const url = 'https://ynm902zoa2.execute-api.eu-west-1.amazonaws.com/dev/static-site-mailer';
const contactSubmit = document.querySelector('.contactSubmit');

function success() {
  contactSubmit.insertAdjacentHTML('beforebegin', '<p class="formResponse" style="color:#2E7D32;background-color:#E6F4EA;border:1px solid #2E7D32;font-size:0.8em">Danke für Ihre Nachricht</p>');
  contactSubmit.blur();
  setTimeout(function () {
    document.querySelector('.formResponse').remove();
    contactSubmit.disabled = false;
  }, 5000);
  form.reset();
}

function error(err) {
  contactSubmit.insertAdjacentHTML('beforebegin', '<p class="formResponse" style="color:#E21A11;background-color:#ffefef;border:1px solid #E21A11;font-size:0.8em;">Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.</p>');
  setTimeout(function () {
    document.querySelector('.formResponse').remove();
    contactSubmit.disabled = false;
  }, 5000);
  console.error(err);
}

form.onsubmit = e => {
  e.preventDefault();

  let req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Accept', 'application/json; charset=utf-8');
  req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  const payload = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  contactSubmit.disabled = true;
  if (document.getElementById('honeypot').value || req.status >= 400) {
    error();
  } else if (form.name.value && form.email.value && form.message.value) {
    success();
    req.send(JSON.stringify(payload));
  }
};
/* CONTACT FORM */
