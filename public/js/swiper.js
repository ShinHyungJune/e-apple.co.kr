var swiper1 = new Swiper(".main-find-box .swiper-container", {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 1000,
	observer: true,
	observeParents: true,
	autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
	navigation: {
		nextEl: ".main-find-box .swiper-button-next",
        prevEl: ".main-find-box .swiper-button-prev",
    },
	pagination: {
		el : ".main-find-box .swiper-pagination",
	},
});

var swiper2 = new Swiper(".main-swiper-box .swiper-container", {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 1000,
	observer: true,
	observeParents: true,
	autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
	navigation: {
		nextEl: ".main-swiper-box .swiper-button-next",
        prevEl: ".main-swiper-box .swiper-button-prev",
    },
	pagination: {
		el : ".main-swiper-box .swiper-pagination",
		type: "fraction",
	},	
	scrollbar: {
		el: ".main-swiper-box .swiper-scrollbar",
		hide: true,
	},
});