'use strict';

let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY';

// Page
const page = {
    menu: document.querySelector('.menu__list'),
    header: {
        h1: document.querySelector('.habbit__name'),
        progreePercent: document.querySelector('.progress__percent'),
        progressCoverBar: document.querySelector('.progress__cover-bar'),
    },
    content: {
        daysConteiner: document.getElementById('days'),
        nextDay: document.querySelector('.habbit__day'),
    }
};

//  Utils
function loadData() {
    const habbitsString = localStorage.getItem(HABBIT_KEY);
    const habbitArray = JSON.parse(habbitsString);

    if (Array.isArray(habbitArray)) {
        habbits = habbitArray;
    }
}

function saveData() {
    localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

//  Render
function rerenderMenu(activHabbit) {
    for (const habbit of habbits) {
        const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
        if (!existed) {
            const element = document.createElement('button');
            element.setAttribute('menu-habbit-id', habbit.id);
            element.classList.add('menu__item');
            element.addEventListener('click', () => rerender(habbit.id));
            element.innerHTML = `<img src="images/${habbit.icon}.svg" alt="${habbit.name}">`
            
            if (activHabbit.id === habbit.id) {
                element.classList.add('menu__item__active');
            }
            page.menu.appendChild(element);
            continue;
        }
        if (activHabbit.id === habbit.id) {
            existed.classList.add('menu__item__active');
        } else {
            existed.classList.remove('menu__item__active');
        }
    }
}

function rerenderHeader(activHabbit) {
    page.header.h1.innerText = activHabbit.name;
    const progress = activHabbit.days.length / activHabbit.target > 1 
        ? 100
        : activHabbit.days.length / activHabbit.target * 100;
    page.header.progreePercent.innerText = progress.toFixed(0) + '%';
    page.header.progressCoverBar.setAttribute('style', `width: ${progress}%`);
}

function rerenderContent(activHabbit) {
    page.content.daysConteiner.innerHTML = '';
    for (const index in activHabbit.days) {
        const element = document.createElement('div');
        element.classList.add('habbit');
        element.innerHTML = `<div class="habbit__day">День ${Number(index) + 1}</div>
                <div class="habbit__comment">${activHabbit.days[index].comment}</div>
                <button class="habbit__delete">
                    <img src="images/delete.svg" alt="Удалить день ${index + 1}">
                </button>`;
        page.content.daysConteiner.appendChild(element);
    }
    page.content.nextDay.innerHTML = `День ${activHabbit.days.length + 1}`;
}



function rerender(activHabbitId) {
    const activHabbit = habbits.find(habbit => habbit.id === activHabbitId);
    if (!activHabbit) {
        return;
    }
    rerenderMenu(activHabbit);
    rerenderHeader(activHabbit);
    rerenderContent(activHabbit);
}


// Init
(() => {
    loadData();
    rerender(habbits[0].id);
})();


































































































































































































































