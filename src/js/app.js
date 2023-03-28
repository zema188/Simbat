// preview__swiper index
const swiperPreview = new Swiper('.preview__swiper', {
  // Optional parameters
  loop: true,
  pagination: {
    el: '.preview__pagination',
    clickable: true,
  },
  autoplay: {
    delay: 4000,
  },
});


//things swiper

const swiperThings = new Swiper('.things__swiper', {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  autoHeight: false,
  navigation: {
    nextEl: '.things__prev',
    prevEl: '.things__next',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    676: {
      spaceBetween: 10,
      slidesPerView: 2,
    },
    // when window width is >= 640px
    960: {
      spaceBetween: 10,
      slidesPerView: 3,
    }
  }
});

//check device
function is_touch_device() {
  return ('ontouchstart' in window);
}

function bodyFixed() { //scroll - false
  if(is_touch_device()) {
    document.body.classList.add('fixed')
  } else {
    let x=window.scrollX;
    let y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }
}

function bodyNotFixed() { // scroll - true
  if(is_touch_device()) {
    document.body.classList.remove('fixed')
  } else {
    window.onscroll=function(){window.scrollTo()};

  }
}


//Popup close 
document.addEventListener("click",
function(event) {
  event = event || window.event;
  let target = event.target
  if(target.classList.contains('popup')) {
    target.classList.remove('active')
    changerActive(menuBarList)
    bodyNotFixed()
  }
  if(target.classList.contains('menu__content')) {
    let menu = document.querySelector('.menu')
    menu.classList.remove('active')
    changerActive(menuBarList)
    bodyNotFixed()
  }
}
)

function changerActive(list) {
  for(let i = 0; i < list.length; i++) {
      list[i].classList.remove('active')
  }
  list = 0
}

let closePopupBtn = document.querySelectorAll('.popup-close')

for(let i=0;i<closePopupBtn.length;i++) {
  closePopupBtn[i].addEventListener("click",
  function() {
    closePopupBtn[i].closest('.popup').classList.remove('active')
    changerActive(menuBarList)
    bodyNotFixed()
  })
}

// menu open popup
if(document.querySelectorAll('.menu').length) {
  let menu = document.querySelector('.menu')
  let navCatalog = document.querySelector('.nav__catalog')
  navCatalog.addEventListener("click",
  function() {
    menu.classList.add('active')
    bodyFixed()
  })
}

//open additional menu

let menuItem = document.querySelectorAll('.menu__item')
let menuBarList = document.querySelectorAll('.menu__bar-list')
for(let i=0;i<menuItem.length;i++) {
  menuItem[i].addEventListener("mousemove",
  function() {
    if(!is_touch_device()) {
      if(menuBarList[i].innerHTML != "") {
        changerActive(menuBarList)
        menuBarList[i].classList.add('active')
      } else {
        changerActive(menuBarList)
        menuBarList[i].classList.remove('active')
      }
    }
  })
}

//card swiper
let swiper = new Swiper(".card-swiper-mini", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    0: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    // 480: {
    //   slidesPerView: 3,
    //   spaceBetween: 30
    // },
    640: {
      slidesPerView: 5,
      spaceBetween: 40
    }
  }
});
let swiper2 = new Swiper(".card-swiper", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".card-swiper__next",
    prevEl: ".card-swiper__prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

//Menu mobile
let nav_icon = document.querySelector('#nav-icon')
//header
document.querySelector('.header__menu').onclick = function() {
  document.querySelector('.header__menu').classList.toggle('active')
  document.querySelector('.header-m').classList.toggle('active')
  nav_icon.classList.toggle('open')
}
// Size-control
window.addEventListener('resize', function(event){
  if(window.innerWidth > 1023) {
    document.querySelector('.header__menu').classList.remove('active')
    document.querySelector('.header-m').classList.remove('active')
    nav_icon.classList.remove('open')
  }
  if(document.querySelectorAll('.basket__header-item').length)
    productWidth()
  if(document.querySelectorAll('.orders__header-item').length)
    ordersWidth()
})

//basket 
if(document.querySelectorAll('.header__authorized-basket').length) {
  let basketBtn = document.querySelector('.header__authorized-basket')
  let basketInfo = document.querySelector('.basket-info')
  let exitProfileBtn = document.querySelector('.header__authorized-exit')
  let profileFullName = document.querySelector('.header__authorized-name-profile')
  if(is_touch_device()) {
    basketBtn.addEventListener("click",
    function(event) {
      basketInfo.classList.toggle('active')
      profileFullName.classList.remove('active')
    }
    )
    exitProfileBtn.addEventListener("click",
    function(event) {
      profileFullName.classList.toggle('active')
      basketInfo.classList.remove('active')
    }
    )
  } else {
    basketBtn.addEventListener("mousemove",
    function(event) {
      basketInfo.classList.add('active')
      profileFullName.classList.remove('active')
    }
    )
    basketInfo.addEventListener("mouseleave",
    function(event) {
      basketInfo.classList.remove('active')
    }
    )
    
    exitProfileBtn.addEventListener("mousemove",
    function(event) {
      profileFullName.classList.add('active')
      basketInfo.classList.remove('active')
    }
    )
    profileFullName.addEventListener("mouseleave",
    function(event) {
      profileFullName.classList.remove('active')
    }
    )
  }
}


//basket size table
function productWidth() {
  let basketHeaderItem = document.querySelectorAll('.basket__header-item')
  let basketBlock = document.querySelectorAll('.basket__item-block')
  for(let i=0;i<basketHeaderItem.length;i++) {
    basketHeaderItem[i].style.width = basketBlock[i].offsetWidth + "px"
  }
}
productWidth()

//my orders size table
function ordersWidth() {
  let ordersHeaderItem = document.querySelectorAll('.orders__header-item')
  let ordersBlock = document.querySelectorAll('.orders__item-lead')
  for(let i=0;i<ordersHeaderItem.length;i++) {
    ordersHeaderItem[i].style.width = ordersBlock[i].offsetWidth + "px"
  }
}
ordersWidth()