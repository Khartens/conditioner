//hover height 
const boxInner = document.querySelectorAll('.installation__bottom-box');
boxInner.forEach((item) => {
  const content = item.querySelector('.installation__bottom-box_btn');

  const height = content.scrollHeight;

  item.addEventListener('mouseover', () => {
    content.style.height = height + 'px';
  })

  item.addEventListener('mouseout', () => {
    content.style.height = 0 + 'px';
  })
})
//Кондиционеры дроп
const conditionerDrop = document.querySelectorAll('.conditioner-drop');
const headerNavMenu = document.querySelectorAll('.header-nav_inner-menu');
const  closeDrop = document.querySelector('.close-drop');
conditionerDrop.forEach((drop) => {
	headerNavMenu.forEach((menu) => {
		drop.addEventListener('click', () => {
			if(menu.classList.contains('active')) {
				menu.classList.remove('active');
				closeDrop.classList.remove('close');
			} else {
				menu.classList.add("active");
				closeDrop.classList.add('close');
			}
		})
	});
});


//Клик по телефону в мобильной версии
const headerMobilePhoneButton = document.querySelector('.header_mobile-phone');
const headerPhoneDrop = document.querySelector('.header_phone_drop');
const headerMobilePhone = document.querySelector('.header_mobile-phone');
const toggleMenu = function () {
	headerPhoneDrop.classList.toggle("active");
	headerMobilePhone.classList.toggle('open');
}
headerMobilePhoneButton.addEventListener("click", function (e) {
	e.stopPropagation();
	toggleMenu();
});
document.addEventListener("click", function (e) {
	const target = e.target;
	const its_menu = target == headerPhoneDrop || headerPhoneDrop.contains(target);
	const its_btnMenu = target == headerMobilePhoneButton;
	const menu_is_active = headerPhoneDrop.classList.contains("active");

	if (!its_menu && !its_btnMenu && menu_is_active) {
		toggleMenu();
	}
});
//header меню
const headerBurger = document.querySelector('.header_mobile-burger');
const headerMenu = document.querySelector('.header_menu');
const linkMobile = document.querySelectorAll('.link-mobile');
const body = document.body;
const open = function () {
	headerBurger.isClick = true
	headerMenu.classList.toggle('active');
	headerBurger.classList.toggle('close');
	body.classList.toggle("noscroll");
}
headerBurger.addEventListener("click", function (e) {
	e.stopPropagation();
	open();
});
linkMobile.forEach((link) => {
	link.addEventListener("click", closeOnClick);
});

document.addEventListener("click", function (e) {
	const target = e.target;
	const its_menu = target == headerMenu || headerMenu.contains(target);
	const its_btnMenu = target == headerBurger;
	const menu_is_active = headerMenu.classList.contains("active");

	if (!its_menu && !its_btnMenu && menu_is_active) {
		open();
	}
});
function closeOnClick() {
    headerMenu.classList.remove('active');
	headerPhoneDrop.classList.remove("active");
	headerMobilePhone.classList.remove('open');
	headerBurger.classList.toggle('close');
	closeDrop.classList.remove('close');
	body.classList.remove("noscroll");
}

//Табы
const tabs = document.querySelector('.tabs');
if(tabs) {
	const tab = new GraphTabs('tab', {});
}

// Слайдер
const mainSwiper = new Swiper('.main_swiper', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 1,
	autoplay: {
		delay: 3000,
	},
	pagination: {
	  	el: '.main-pagination',
		clickable: true,
	},
  
	navigation: {
	  	nextEl: '.main-next',
	  	prevEl: '.main-prev',
	},

	breakpoints: {
		1450: {
			slidesPerView: 4
		},

		1100: {
			slidesPerView: 3
		},

		740: {
			slidesPerView: 2
		}
	  },
});

const splitSystemsSwiper = new Swiper('.split-systems_swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 0,
	breakpoints: {
		1100: {
			slidesPerView: 2,
			spaceBetween: 39,
		},
	},
	pagination: {
	  el: '.split-systems-pagination',
	  clickable: true,
	},
	navigation: {
	  nextEl: '.split-systems-next',
	  prevEl: '.split-systems-prev',
	},
});

document.querySelectorAll('.card-swiper').forEach(el => {
    let swiper = new Swiper(el, {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: el.querySelector('.card-pagination'),
      clickable: true
    },
     navigation: {
        nextEl: el.querySelector('.card-next'),
        prevEl: el.querySelector('.card-prev')
     }
});
});

//Маска для телефона
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.slice(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }
  
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  
  });
  
  });


//popup
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 300;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});