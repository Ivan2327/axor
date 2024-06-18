let tabs = document.querySelectorAll('.product__tab');

let cardText = document.querySelectorAll('.product__desc');
let stars = document.querySelectorAll('[data-star]');
let maxHeight = 0;

let equipmentSubtitle = document.querySelector('.equipment__subtitle');
let equipmentValue = document.querySelector('.equipment__value');

tabs.forEach(item => {
    item.addEventListener('click', function() {
        tabs.forEach(item => {
            item.classList.remove('tabActive');
        });
        item.classList.add('tabActive');
    });
});

var swiper1 = new Swiper(".mySwiper", {
    slidesPerView: 'auto',
    spaceBetween: 0,
    navigation: {
        nextEl: ".product__next",
        prevEl: ".product__prev",
    },
});

var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 'auto',
    spaceBetween: 0,
});


swiper1.controller.control = swiper2;
swiper2.controller.control = swiper1;

swiper1.on("mouseenter", function () {
    swiper1.navigation.$nextEl.css("opacity", "1");
    swiper1.navigation.$prevEl.css("opacity", "1");
});

swiper1.on("mouseleave", function () {
    swiper1.navigation.$nextEl.css("opacity", "0");
    swiper1.navigation.$prevEl.css("opacity", "0");
});

stars.forEach(item => {
    item.addEventListener('click', function() {
        item.parentNode.dataset.startotal = item.dataset.star;
    });
});

function cardHeight() {
    cardText.forEach(item => {
        if(maxHeight < item.offsetHeight) {
            maxHeight = item.offsetHeight;
        } 
    });
    
    for(let i = 0; i < cardText.length; i++) {
        cardText[i].style.marginBottom = (maxHeight - cardText[i].offsetHeight + 17) + 'px';
    }
}

cardHeight();

let strokeEquipment = document.querySelectorAll('.slide-equipment');
let equipmentParametr = document.querySelectorAll('.equipment__subtitle');
let arrayStroke = [];
let equipmentHeight = 0;

// Присваиваем каждому элементу data-атрибут strokeNumber

function parametrHight() {
    for(let i = 0; i < equipmentParametr.length; i++) {
        equipmentParametr[i].dataset.strokeNumber = i + 1;
    }
    
    strokeEquipment.forEach(item => {
        for(let i = 0; i < item.children.length; i++) {
            item.children[i].dataset.strokeNumber = i + 1;
        }
    });
    
    // Собираем все уникальные значения strokeNumber
    document.querySelectorAll('[data-stroke-number]').forEach(item => {
        arrayStroke.push(item.dataset.strokeNumber);
    });
    
    const strokeNums = [...new Set(arrayStroke)];
    
    // Для каждой строки находим максимальную высоту элемента и применяем её ко всем элементам строки
    strokeNums.forEach(item => {
        const elements = document.querySelectorAll(`[data-stroke-number="${item}"]`);
        let maxHeight = 0;
    
        // Находим максимальную высоту среди элементов строки
        elements.forEach(element => {
            const elementHeight = element.offsetHeight;
            if (elementHeight > maxHeight) {
                maxHeight = elementHeight;
            }
        });
    
        // Устанавливаем максимальную высоту для всех элементов строки
        elements.forEach(element => {
            element.style.minHeight = `${maxHeight}px`;
        });
    });
}

parametrHight();

window.addEventListener('resize', function() {
    cardHeight();
    parametrHight();
});