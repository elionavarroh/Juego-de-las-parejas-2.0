import {
    Carta,
    Tablero,
} from "./model"

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
const generarNumeroAleatorio = (indiceArray: number) => {
    return Math.floor(Math.random() * (indiceArray + 1));
};

const barajarCartas = (cartas : Carta[]): Carta[] => {
    const copiaCartas = [...cartas]
    for (let i = copiaCartas.length - 1; i > 0; i--) {
        const j = generarNumeroAleatorio(i);
        [{...copiaCartas[i]}, {...copiaCartas[j]}] = [copiaCartas[j], copiaCartas[i]];
      };
    return copiaCartas;
  };
  
  /*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
  const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    return !tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta
  };

export const esVolteableLaCarta = (tablero: Tablero, indice: number): boolean => {
  return sePuedeVoltearLaCarta(tablero, indice);
};
  
export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  };
  tablero.cartas[indice].estaVuelta = true;
};
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
  export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
  };
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceA].estaVuelta = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.cartas[indiceB].estaVuelta = true;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = "CeroCartasLevantadas";
  };
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
  export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    tablero.cartas[indiceA].encontrada = false;
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].encontrada = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = "CeroCartasLevantadas";
  };
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
  //export const esPartidaCompleta(tablero: Tablero) : boolean => {
    //...
  //}
  
  /*
  Iniciar partida
  */
  
  export const iniciaPartida = (tablero: Tablero): void => {
    const cartasBarajadas: Carta [] = barajarCartas(tablero.cartas);
    tablero.cartas = [...cartasBarajadas];
    tablero.estadoPartida = "CeroCartasLevantadas"
  };