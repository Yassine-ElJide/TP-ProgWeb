"use strict";
class MemoryGame {
  constructor(images, blank) {
    this.cards = images;
    this.back = blank;
    this.shuffle = shuffleCards(images.length);
    this.find = [];
    this.attente = -1;
    this.image;
  }
  build(div) {
    for (let i = 0; i < this.shuffle.length; i++) {
      createImg(this, div, i);
    }
  }
}

const handleClick = (element, div, i, j) => {
  element.onclick = () => {
    const child = document.createElement("p");
    child.innerHTML = `${i} ${j}`;
    div.appendChild(child);
  };
};

const showImage = (element, image) => {
  element.onclick = () => {
    element.children[0].src = image;
  };
};

const flipCards = (element, memory, i) => {
  element.onclick = () => {
    if (!memory.find[i]) {
      var j = memory.shuffle[i];
      var pCN = memory.attente;
      var pE = memory.image;
      if (memory.attente == -1) {
        memory.find[i] = true;
        memory.attente = i;
        memory.image = element;
        element.children[0].src = memory.cards[j];
      } else if (memory.shuffle[memory.attente] == j) {
        memory.find[i] = true;
        memory.attente = -1;
        element.children[0].src = memory.cards[j];
      } else {
        memory.find[i] = true;
        memory.attente = -1;
        element.children[0].src = memory.cards[j];
        window.setTimeout(function () {
          memory.find[pCN] = false;
          memory.find[i] = false;
          pE.children[0].src = memory.back;
          element.children[0].src = memory.back;
        }, 500);
      }
    }
  };
};

const createImg = (instance, div, i) => {
  const innerDiv = document.createElement("div");
  const img = document.createElement("img");
  img.alt = "card";
  img.src = instance.back;
  innerDiv.appendChild(img);
  div.appendChild(innerDiv);
  instance.find.push(false);
  flipCards(innerDiv, instance, i);
};

const swap = (tab, i, j) => {
  let a = tab[i]; //temporary variable
  tab[i] = tab[j];
  tab[j] = a;
};

const shuffleCards = (length) => {
  const cards = [];
  for (let i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  // Mode aléatoire des cartes
  let x = 0;
  for (let i = 0; i < cards.length; i++) {
    let y = i + Math.floor((cards.length - i) * Math.random());
    swap(cards, i, y);
  }
  return cards;
};
