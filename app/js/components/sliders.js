import Swiper from "swiper";
import { Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation, Thumbs, Autoplay, } from "swiper/modules";
import { gsap, Power2 } from "gsap";


export function homePage() {
	console.log('function homePage');

	const swiperIMG = new Swiper(".slider-img", {
		modules: [Parallax, Controller, Pagination],
		loop: false,
		speed: 2400,
		parallax: true,
		// для вывода количества слайдов в счётчик
		pagination: {
			el: ".slider-pagination-count .total",
			// определяем кастомный тип отображения пагинации
			type: "custom",
			// определяем функцию для возврато количества слайдов
			renderCustom: function (swiper, current, total) {
				// для вывода количества слайдов необходимо воспользоваться интерполяцией для вывода переменной total переданной в функцию
				return `0${total}`;
			},
		},
	});

	const swiperText = new Swiper(".slider-text", {
		modules: [Parallax, Controller, Mousewheel, Scrollbar, Navigation],
		// при loop:true скроллбар не работает
		loop: false,
		speed: 2400,
		parallax: true,
		// mousewheel: {
		// 	invert: false,
		// },
		// pagination: {
		// 	el: '.swiper-pagination',
		// 	clickable: true,
		// },
		scrollbar: {
			el: ".swiper-scrollbar",
			draggable: true,
		},
		navigation: {
			prevEl: ".swiper-button-prev",
			nextEl: ".swiper-button-next",
		},
	});

	// Slide count
	// заносим в переменную селектор счётчика
	let curnum = document.querySelector(".slider-pagination-count .current");

	// функция при срабатывании события смены слайда
	swiperText.on("slideChange", function () {
		// определяем переменную с индексом текущего слайда
		let ind = swiperText.realIndex + 1;
		// применяем gsap к селектору из переменной curnum, длительность анимации 0.2 с
		gsap.to(curnum, 0.2, {
			force3D: true,
			// уводим текущую цифру с номером слайда наверх
			y: -10,
			opacity: 0,
			// параметр скорости анимации
			ease: Power2.easeOut,
			// событие gsap, после завершения анимации (вверх) устанавливаем координаты селектору вниз для отрисовки поднятия цифры
			onCompleate: function () {
				gsap.to(curnum, 0.1, {
					force3D: true,
					y: 10,
				});
				// и присваиваем селектору номер следующего слайда
				curnum.innerHTML = `0${ind}`;
			},
		});
		// gsap для появления цифры
		gsap.to(curnum, 0.2, {
			force3D: true,
			y: 0,
			opacity: 1,
			// параметр скорости анимации
			ease: Power2.easeOut,
			// устанавливаем задержку чтобы события не происходили одновременно
			delay: 0.3,
		});
	});

	swiperIMG.controller.control = swiperText;
	swiperText.controller.control = swiperIMG;

	const swiperPartners = new Swiper(".slider-partners", {
		modules: [Autoplay],
		autoplay: {
			delay: 1000,
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
		},
		slidesPerView: 2,
		spaceBetween: 15,
		loop: true,
		speed: 2000,
	});
} //                                      homePage end


export function projectPage() {
	console.log('function projectPage');
	const swiperThumb = new Swiper(".slider-thumb", {
		modules: [Parallax, Controller, Mousewheel],
		mousewheel: {
			invert: false,
		},
		// делает слайды кликабельными
		// slideToClickedSlide: true,
		// центрирует активный слайд
		centeredSlides: true,
		// чтобы небыло пропусков вконце группы тамбов
		// slidesPerGroup: 1,
		// centeredSlidesBounds: true,
		loop: true,
		speed: 100,
		breakpoints: {
			992: {
				slidesPerView: 8,
				spaceBetween: 5,
			},
			768: {
				slidesPerView: 6,
				spaceBetween: 5,
			},
			576: {
				slidesPerView: 4,
				spaceBetween: 5,
			},
		},
		slidesPerView: 3,
		spaceBetween: 5,
	});

	const swiperProject = new Swiper(".slider-project", {
		modules: [Parallax, Controller, Mousewheel, Thumbs],
		mousewheel: true,
		thumbs: {
			swiper: swiperThumb,
		},
		slidesPerGroupAuto: true,
		centeredSlides: true,
		parallax: true,
		loop: true,
		speed: 2400,
	});
}