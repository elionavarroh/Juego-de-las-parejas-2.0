import { 
    tablero,
    Tablero,
    Carta,
 } from "./model";

import {
    iniciaPartida,
    esVolteableLaCarta,
    voltearLaCarta,
    sonPareja,
    parejaEncontrada,
    parejaNoEncontrada,
} from "./motor";

const clickBotonEmpezarPartida = () => {
    iniciaPartida(tablero);
    console.log(tablero);
};

export const agregarEventoBotonIniciarPartida = () => {
    const botonEmpezarPartida = document.getElementById("empezarPartida");
    if (botonEmpezarPartida !== null && botonEmpezarPartida !== undefined && botonEmpezarPartida instanceof HTMLButtonElement) {
        botonEmpezarPartida.addEventListener("click", clickBotonEmpezarPartida);
    };
};

export const crearTablero = () => {
    for (let indice = 0; indice < tablero.cartas.length; indice++) {
      mapearDivsCartas(indice, tablero); 
    };
};

const mapearDivsCartas = (indiceCartas: number, tablero: Tablero) => {
    const dataIndiceId = `div[data-indice-id="${indiceCartas}"]`;
    const elementoDiv = document.querySelector(dataIndiceId);
    if(elementoDiv !== null && elementoDiv !== undefined && elementoDiv instanceof HTMLDivElement) {
        elementoDiv.addEventListener("click",() => {
            if (tablero.estadoPartida !== "PartidaNoIniciada") {
                handleDivCarta(tablero, indiceCartas);
            };
        });
    };
};

const handleDivCarta = (tablero: Tablero, indice: number) => {
    if (esVolteableLaCarta(tablero, indice)) {
        volteaCarta(tablero, indice);
    } else {
    };
};

const volteaCarta = (tablero: Tablero, indice: number) => {
    const urlAnimal = tablero.cartas[indice].imagen;
    voltearLaCarta(tablero, indice);
    mostrarImagenAnimal(indice, urlAnimal);
    mirarSiEsLaSegundaCarta(tablero);
};

const mostrarImagenAnimal = (indice: number, urlAnimal: string) => {
    const dataIndiceId = `img[data-indice-id="${indice}"]`;
    const elementoImg = document.querySelector(dataIndiceId);
    if(elementoImg !==null && elementoImg !== undefined && elementoImg instanceof HTMLImageElement) {
        elementoImg.src = urlAnimal;
    };
};

const mirarSiEsLaSegundaCarta = (tablero: Tablero) => {
    const indiceA = tablero.indiceCartaVolteadaA;
    const indiceB = tablero.indiceCartaVolteadaB;
    if (indiceA !== undefined && indiceB !== undefined) {
        if (sonPareja(indiceA, indiceB, tablero)) {
            encontradaPareja(tablero, indiceA, indiceB);
        } else {
            noEncontradaPareja(tablero, indiceA, indiceB);
        };
    };
};

const encontradaPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
    parejaEncontrada(tablero, indiceA, indiceB);
};

const noEncontradaPareja = (tablero: Tablero, indiceA: number, indiceB: number) => {
    parejaNoEncontrada(tablero, indiceA, indiceB);
    voltearLasCartasQueNoSonPareja(tablero.cartas);
};

const voltearLasCartasQueNoSonPareja = (cartas: Carta[]) => {
    setTimeout(() => ponerImagenBocaAbajo(cartas), 1000);
};

const ponerImagenBocaAbajo = (cartas: Carta[]) => {
    for (let i = 0; i < cartas.length; i++) {
        if (!cartas[i].encontrada && !cartas[i].estaVuelta) {
            darleLaVueltaALaCarta(i);
        };
    };
};

const darleLaVueltaALaCarta = (indice: number) => {
    const dataIndiceId = `img[data-indice-id="${indice}"]`;
    const elementoImg = document.querySelector(dataIndiceId);
    if(elementoImg !==null && elementoImg !== undefined && elementoImg instanceof HTMLImageElement) {
        elementoImg.src = "";
    };
};