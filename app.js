"use strict";
document.addEventListener("DOMContentLoaded", init);
let stockar;
let baver;
function initReferences() {
    stockar = document.querySelector("#stockar");
    baver = document.querySelector("#bäver");
}
function initListeners() {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case ("ArrowDown"): {
                jumpDown();
                break;
            }
            case ("ArrowRight"): {
                moveHorizontally(true);
                break;
            }
            case ("ArrowLeft"): {
                moveHorizontally(false);
                break;
            }
            default: {
                return;
            }
        }
        let stockTvaPos = Array.from(stockar.querySelectorAll("div"))[1].style.getPropertyValue("--x");
        if (stockTvaPos !== "40%" && stockTvaPos !== "50%" && stockTvaPos !== "60%") {
            setTimeout(() => { alert("Du ramlade i!"); });
            document.location.reload();
        }
    });
}
function startGame() {
    let grass = createStock(0, -70);
    grass.className = "stock gräs";
    let x = 50;
    let antalStockar = 50;
    for (let i = 0; i < antalStockar; i++) {
        createStock(x, i * 70);
        x += (Math.floor(Math.random() * 5) - 2) * 10;
    }
    let grass2 = createStock(0, antalStockar * 70);
    grass2.className = "stock gräs gräs2";
}
function createStock(x, y) {
    let stock = document.createElement("div");
    stock.className = "stock";
    stock.style.setProperty("--x", x + "%");
    stock.style.setProperty("--y", y + "px");
    stockar.appendChild(stock);
    return stock;
}
function jumpDown() {
    Array.from(stockar.querySelectorAll("div")).forEach(element => {
        element.style.setProperty("--y", Number(element.style.getPropertyValue("--y").substring(0, element.style.getPropertyValue("--y").length - 2)) - 70 + "px");
        console.log(element.style.getPropertyValue("--y"));
        if (element.style.getPropertyValue("--y") === "-140px")
            element.remove();
    });
    if (Array.from(stockar.querySelectorAll("div")).length <= 2) {
        setTimeout(() => { alert("Du vann!"); });
        document.location.reload();
    }
}
function moveHorizontally(right) {
    Array.from(stockar.querySelectorAll("div")).forEach(element => {
        if (right)
            element.style.setProperty("--x", Number(element.style.getPropertyValue("--x").substring(0, element.style.getPropertyValue("--x").length - 1)) - 10 + "%");
        else
            element.style.setProperty("--x", Number(element.style.getPropertyValue("--x").substring(0, element.style.getPropertyValue("--x").length - 1)) + 10 + "%");
    });
}
function init() {
    initReferences();
    initListeners();
    startGame();
}
