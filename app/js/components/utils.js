import LocomotiveScroll from "locomotive-scroll";


let scroll;

export function initSmoothScroll() {
	// уничтожаем старый экземпляр
	console.log("itit locomotiveScroll");
	
	if (!document.querySelector("body")) {
		console.warn("DOM not ready for Locomotive Scroll");
		return;
	}
	
	
	if (scroll) {
		scroll.destroy();
	}
	
	scroll = new LocomotiveScroll({
		lenisOptions: {
			el: document.querySelector("main"),
			duration:  1.5,
			smooth: true,
			smoothTouch: true,
			reloadOnContextChange: true
		},
	});
	// Принудительный сброс скролла в начало страницы
	// Обновление Locomotive Scroll
	if (scroll && scroll.lenisInstance) {
    // Пример работы с lenisInstance
    scroll.lenisInstance.resize();
		window.scrollTo(0, 0);
	}
}

export function destroySmoothScroll() {
	if (scroll) {
		console.log("СКРОЛЛ УБИТ!!");
		window.scrollTo(0, 0);
		scroll.destroy(); // Уничтожаем старый экземпляр
		scroll = null; // Очищаем переменную
		console.log(scroll);

	}
}

export function anchor() {
    document.querySelectorAll('.anchor-top').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href'); // Например, "#header"
            
            // Проверяем, что это якорная ссылка
            if (targetId.startsWith("#")) {
                e.preventDefault(); // Предотвращаем переход по умолчанию

                const targetElement = document.querySelector(targetId);
                if (scroll && targetElement) {
                    scroll.scrollTo(targetElement, {
                        offset: 0, // Настраивайте смещение по необходимости
                        duration: 3, // Длительность в миллисекундах
                        // easing: [0.25, 0.1, 0.25, 1], // Кубическая Безье для плавности
                    });
                }
            }
        });
    });
}

export function mobileMenu() {
	console.log('mobile-menu activate');
	// прсле щбьекта .top-line добавляем div с классом mobile-menu и скрываем на разрешениях больше
	$(".top-line").after('<div class="mobile-menu d-md-none">');

	// при клике на иконку мобильного меню слайдим
	// $('.mobile-menu').slideUp();
	$(".mobile-menu-button").on("click", function () {
		$(".mobile-menu").stop().slideToggle();
	});

	// закрытие меню при нажатии клавиши esc
	$(document)
		.on("keyup", function (e) {
			// keyup перехватывает события нажатия кнопки
			if (e.keyCode === 27) {
				$(".mobile-menu").slideUp();
			}
			// функция закрывает меню при клике в любом месте экрана кроме поля поиска
		})
		.on("click", function () {
			$(".mobile-menu").slideUp();
		});

	// перехватываем и отменяем распространение события если клик происходит по враперу окна поиска
	$(".mobile-menu-button").on("click", function (e) {
		// Propagation — это распространение событий. Метод stopPropagation используется для
		// предотвращения распространения (всплытия) событий, когда событие запускается на отдельном элементе.
		// В JavaScript, когда событие запускается на одном элементе, оно всплывает вверх по дереву родительских
		// элементов. Если элемент с событием находится внутри родительского контейнера, родитель тоже получает
		// это событие.
		e.stopPropagation();
	});
}

export function scrollOnSlider() {
	const sliders = document.querySelectorAll(".slider");

	sliders.forEach((slider) => {
		slider.addEventListener("mouseenter", () => {
			scroll.stop();
		});

		slider.addEventListener("mouseleave", () => {
			scroll.start();
		});
	});
}