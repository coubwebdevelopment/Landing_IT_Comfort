"use strict";

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu_arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
};


const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });

            e.preventDefault();
        }
    }
};


const iconMenu = document.querySelector('.header__menu-icon');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
};

$(document).ready(function() {
    var accordion = function() {
        $(".faq__accordion-title-box").on("click", function() {
            var $this = $(this);
            var $currentText = $this.next(".faq__accordion-text");
            var $icon = $this.find('.faq__accordion-icon');

            // Если текущий элемент не активен, закрываем все остальные и открываем текущий
            if (!$this.hasClass("active")) {
                $(".faq__accordion-text").slideUp(300);  // Закрываем все тексты аккордеона
                $(".faq__accordion-title-box").removeClass("active");  // Убираем класс "active" у всех заголовков
                $(".faq__accordion-icon").removeClass("faq__accordion-icon-minus").addClass("faq__accordion-icon-plus"); // Меняем все иконки на плюс

                $this.addClass("active");  // Добавляем класс "active" к текущему заголовку
                $icon.removeClass("faq__accordion-icon-plus").addClass("faq__accordion-icon-minus"); // Меняем иконку текущего заголовка на минус
                $currentText.slideDown(300);  // Открываем текущий текст
            } else {
                // Если текущий элемент активен, закрываем его
                $this.removeClass("active");
                $icon.removeClass("faq__accordion-icon-minus").addClass("faq__accordion-icon-plus"); // Меняем иконку на плюс
                $currentText.slideUp(300);
            }
        });
    }

    accordion();
});



