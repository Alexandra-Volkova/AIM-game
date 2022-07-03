const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
let time = 0;
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let score = 0;
const colors = ['red', 'orange', 'yellow', 'yellowgreen', 'green', 'seagreen', 'spreenggreen', 'blue', 'indigo', 'violet', 'purple', 'pink'];

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCurcle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCurcle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчёт: <span class='primary'>${score}</span></h1>`;
}

function createRandomCurcle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;

    setColor(circle);

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function winTheGame() {
    function killCircle() {
        const circle = document.querySelector('.circle');

        if (circle) {
            circle.click();
        }
    }

    setInterval(killCircle, 42);
}