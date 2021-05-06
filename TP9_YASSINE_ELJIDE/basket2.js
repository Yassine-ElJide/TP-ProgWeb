"use strict";

let ajaxFruits = new XMLHttpRequest();
let ajaxPrices = new XMLHttpRequest();

ajaxFruits.onload = function () {
  let json = JSON.parse(ajaxFruits.responseText);
  let table = document.getElementById("basket");
  let quantity = document.getElementById("quantity");
  let price = document.getElementById("price");

  let totalPrice = 0;
  ajaxPrices.send();

  ajaxPrices.onload = function () {
    let json_2 = JSON.parse(ajaxPrices.responseText);
    for (let i = 0; i < json.length; i++) {
      const { name, quantity } = json[i];
      table.innerHTML += `<tr><td>${name}</td><td>${quantity}</td><td>${json_2[i].price}</td></tr>`;
      totalPrice += json[i].quantity * json_2[i].price;
    }

    quantity.innerText = json.reduce((acc, val) => {
      return acc + val.quantity;
    }, 0);
    price.innerText = totalPrice;
  };
};

ajaxFruits.open("GET", "fruits.json", true);
ajaxPrices.open("GET", "prices.json", true);
ajaxFruits.overrideMimeType("application/json");
ajaxPrices.overrideMimeType("application/json");
ajaxFruits.send();
