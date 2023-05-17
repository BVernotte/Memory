

// function createElement(tag, params, html) {

//     if (typeof params === 'string') {
//         html = params;
//         params = {};
//     }



//     if (typeof tag !== 'string') {
//         throw new TypeError('tag must be a String');
//     }

//     params ??= {}
//     html ??= '';

//     const elem = document.createElement(tag);

//     for (let attr in params) {
//         let value = params[attr];
//         if (attr === 'html') {
//             html = value;
//             continue;
//         }

//         if (typeof value === 'string') {
//             elem.setAttribute(attr, value);
//         }
//         else {
//             elem[attr] = value;
//         }
//     }



//     if (html instanceof Element || typeof html === 'string') {
//         html = [html];
//     }

//     if (Array.isArray(html) || html instanceof NodeList) {

//         html.forEach(item => {
//             if (item instanceof Element) {
//                 elem.appendChild(item);
//             } else if (typeof item === 'string') {
//                 elem.innerHTML += item;
//             }
//         });

//     }

//     return elem;

// }


// document.getElementById("firstpage").appendChild(
//     createElement('div',
//         {
//             class: 'thirdd',
//             style: 'border: solid black 1px; width: 150px; height: 70px; margin-top: 30px; display:flex; flex-direction:column',
//             onclick() {
//                 alert(this.innerText)
//             }
//         },
//         [
//             "Arthur", "8x8"

//         ]


//     ));



//Création H1 + Test + style
const title = document.createElement("h1");
title.innerHTML = "Bonjour"
title.style.fontSize = "100px";
document.getElementById("firstpage").appendChild(title);


//Création div Choisir difficulté 

const diff = document.createElement("h2");
diff.innerHTML = "Choisis ta difficulté";
diff.style.fontSize = "50px";
document.getElementById("firstpage").appendChild(diff);

// création premiere difficulté 

const firstd = document.createElement("div");
firstd.className = "firstd";

firstd.style.border = "solid black 1px";
firstd.style.width = "150px";
firstd.style.height = "70px";
firstd.style.marginTop = "30px";
firstd.innerHTML = "Kadoc <br> 4x4";

document.getElementById("firstpage").appendChild(firstd);

// Div diff 2 

const secd = document.createElement("div");
secd.className = "secd";

secd.style.border = "solid black 1px";
secd.style.width = "150px";
secd.style.height = "70px";
secd.style.marginTop = "30px";
secd.innerHTML = "Merlin <br> 6x6";

document.getElementById("firstpage").appendChild(secd);

//Div diff 3
const thirdd = document.createElement("div");
thirdd.className = "thirdd";

thirdd.style.border = "solid black 1px";
thirdd.style.width = "150px";
thirdd.style.height = "70px";
thirdd.style.marginTop = "30px";
thirdd.innerHTML = "Arthur <br> 8x8";

document.getElementById("firstpage").appendChild(thirdd);



//Hidden sur gamearea
const gamearea = document.getElementById("gamearea");
gamearea.classList.add("hidden");

// Fonction pour créer une carte
function createCard() {
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "card-front";
    front.style.background = "brown";

    const back = document.createElement("div");
    back.className = "card-back";
    back.style.backgroundImage = "url(https://picsum.photos/200/300?random=)";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
        console.log(e);
        card.classList.toggle("flipCard");
    });

    return card;
}

//fonction pour generer les cartes
function generateCards(rows, columns) {
    const gamearea = document.getElementById("gamearea");
    gamearea.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "grid";
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const cards = [];

    for (let i = 0; i < rows * columns; i++) {
        const card = createCard();
        grid.appendChild(card);
        cards.push(card);
    }

    gamearea.appendChild(grid);
    gamearea.classList.remove("hidden");

    return cards;
}


// Boutton difficulter + carte
document.addEventListener("DOMContentLoaded", function () {

    const firstd = document.querySelector(".firstd");
    firstd.addEventListener("click", function () {
        generateCards(4, 4);
    });


    const secd = document.querySelector(".secd");
    secd.addEventListener("click", function () {
        generateCards(6, 6);
    });


    const thirdd = document.querySelector(".thirdd");
    thirdd.addEventListener("click", function () {
        generateCards(8, 8);
    });
});

