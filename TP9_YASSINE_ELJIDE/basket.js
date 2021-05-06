"use strict";

let ajax = new XMLHttpRequest();

ajax.onreadystatechange = function () {
    if (ajax.readyState === 4 && ajax.status === 200) {
        let data = JSON.parse(ajax.responseText);
        let table = document.getElementById("basket");
        let quantity = document.getElementById("quantity");
        data.forEach(ele => {
            const {name, quantity} = ele
            table.innerHTML += `<tr><td>${name}</td><td>${quantity}</td></tr>`;
        });

        quantity.innerText = data.reduce((acc, val) => {
            return acc + val.quantity;
        }, 0);

    }
};

ajax.open("GET", "fruits.json", true);
ajax.overrideMimeType("application/json");
ajax.send();