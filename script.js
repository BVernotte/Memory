

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



// //Hidden sur gamearea
// const gamearea = document.getElementById("gamearea");
// gamearea.classList.add("hidden");

// Variables du jeu
// Cartes retournées
let flippedCards = [];
// Nombre de paires trouvées
let matchedCards = 0;

// Bloquer le tableau pendant la comparaison des cartes
let lockBoard = false;

// Fonction de gestion des clics sur les cartes
function cardClick() {
    // Ne rien faire si le tableau est verrouillé ou si la carte est déjà retournée
    if (lockBoard || this === flippedCards[0]) {
        return;
    }

    // Retourner la carte
    this.classList.toggle("flipCard");

    // Ajouter la carte retournée au tableau
    flippedCards.push(this);

    // Vérifier si deux cartes ont été retournées
    if (flippedCards.length === 2) {
        // Verrouille le tableau pendant la comparaison
        lockBoard = true;

        // Compare les cartes
        if (flippedCards[0].dataset.cardType === flippedCards[1].dataset.cardType) {

            // Les cartes correspondent - marquer comme trouvées
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.removeEventListener("click", cardClick);
                    card.classList.add("matched");
                });
                flippedCards = [];
                matchedCards++;

                // Vérifier si toutes les paires ont été trouvées
                if (matchedCards === totalPairs) {

                    // Toutes les paires ont été trouvées - afficher un message de victoire
                    setTimeout(() => {
                        alert("Félicitations, vous avez gagné !");
                    }, 500);
                }

                lockBoard = false;
            }, 1000);
        } else {
            // Les cartes ne correspondent pas - retourne les cartes
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove("flipCard");
                });
                flippedCards = [];

                lockBoard = false;
            }, 1000);
        }
    }
}


let images = {};

// Fonction pas de doublon image
//Creation objet 
async function getRandomImage(cardType) {



    if (images['i' + cardType]) {
        return images['i' + cardType];
    }


    let url;

    do {
        url = await fetch("https://picsum.photos/200/300?random=" + cardType, { redirect: "follow" }).then(resp => resp.url);
    } while (Object.values(images).includes(url));

    images['i' + cardType] = url;
    return url;
}

// Fonction pour créer une carte
async function createCard(cardType) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.cardType = cardType;

    const front = document.createElement("div");
    front.className = "card-front";
    front.style.background = "brown";

    const back = document.createElement("div");
    back.className = "card-back";



    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", cardClick);
    return await getRandomImage(cardType).then(url => {
        back.style.backgroundImage = "url(" + url + ")";
        return card;
    });

}

// Fonction pour mélanger les cartes
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    console.debug(cards);
}

// Fonction pour générer les cartes du jeu
async function generateCards(rows, columns) {
    images = {};
    const gamearea = document.getElementById("gamearea");
    gamearea.innerHTML = "";

    const totalPairs = (rows * columns) / 2;

    const cards = [];
    for (let i = 1; i <= totalPairs; i++) {
        cards.push(await createCard(i));
        cards.push(await createCard(i));
    }

    shuffleCards(cards);

    const grid = document.createElement("div");
    grid.className = "grid";
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    cards.forEach(card => {
        grid.appendChild(card);
    });

    gamearea.appendChild(grid);
}

let totalPairs = 0

// Appel de la fonction pour générer les cartes lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    const firstd = document.querySelector(".firstd");
    firstd.addEventListener("click", function () {
        generateCards(4, 4);
        totalPairs = 8;
    });

    const secd = document.querySelector(".secd");
    secd.addEventListener("click", function () {
        generateCards(6, 6);
        totalPairs = 18;
    });

    const thirdd = document.querySelector(".thirdd");
    thirdd.addEventListener("click", function () {
        generateCards(8, 8);
        totalPairs = 32;
    });

});


// const timer = document.createElement("div");
// timer.innerHTML = "00:00";
// document.getElementById("gamearea").appendChild(timer);