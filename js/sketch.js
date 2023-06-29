let trazos = [];
let nivel = 0;
let velocidad = 1; // Velocidad de movimiento global para todos los trazos
let randomValue = Math.random(); // Genera un número aleatorio entre 0 y 1

let mic,amp;

function preload() {
  trazos.push(
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713196/trazo1_fgthgz.png"),
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713196/trazo1_fgthgz.png"), //Copia 1
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713193/trazo2_rngnwj.png"),
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713193/trazo2_rngnwj.png"), //Copia 2
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713197/trazo3_peahwl.png"),
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713197/trazo3_peahwl.png"), //Copia 3
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713192/trazo4_xcc9sk.png"),
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713192/trazo4_xcc9sk.png"), //Copia 4
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713193/trazo5_ysumim.png"),
    loadImage("https://res.cloudinary.com/dctwdrrg2/image/upload/v1686713193/trazo5_ysumim.png") //Copia 5
  );
}
class Trazo {
  constructor(imagen, x, y, ancho, alto) {
    this.imagen = imagen;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.moving = true;
  }

  mostrar() {
    if (this.moving) {
      this.x += velocidad;
      this.y += velocidad;

      // Mantener el trazo dentro del lienzo
      this.x = constrain(this.x, 0, width - this.ancho);
      this.y = constrain(this.y, 0, height - this.alto);
    }

    image(this.imagen, this.x, this.y, this.ancho, this.alto);
  }
}

function setup() { //inicializar
  const canvas = createCanvas(500, 500);
  canvas.attribute('willReadFrequently', 'true'); // Para que no tire este error: willReadFrequently.

  for (let i = 0; i < trazos.length; i++) {
    trazos[i] = new Trazo(trazos[i], random(width), random(height), random(100, 300), random(100, 300));
  }
  mic = new p5.AudioIn();  
  mic.start(); 
}
function draw() {
  amp = mic.getLevel();
  userStartAudio();
  lienzo();

  if (amp > 0.1) {
    console.log("amp tiene un valor distinto de cero: " + amp);
    for (let i = 0; i < trazos.length; i++) {
      trazos[i].moving = false; // Detener movimiento de los trazos
    }
  } else {
    console.log("amp es cero");
  }

  if (amp > 0.1) {
    for (let i = 0; i < trazos.length; i++) {
      trazos[i].moving = false; // Detener movimiento de los trazos
    }
  }

  if (amp > 0.3) {
    nivel += 1;
  }
}

function lienzo() {
  if (nivel === 0) {
    background(255); //Backgroud Blanco
    spawnTrazos();
  }

  if (nivel === 1) { // Nivel === 1, Es para generar las líneas
    strokeWeight(10);
  
    if (randomValue < 0.5) {
      // Dibuja líneas verticales
      let goldenLines = 0; // Contador para las líneas doradas
  
      for (let y = 30; y < height; y += 30) {
        if (goldenLines < 4 && amp > 0.3) {
          stroke(218, 165, 32); // Trazo Dorado
          goldenLines++;
        } else if (goldenLines < 2 && amp > 0.2) {
          stroke(218, 165, 32); // Trazo Dorado
          goldenLines++;
        } else {
          stroke(255);
        }
      
        line(0, x, width, x);
      }
    } //else {
      // Dibuja líneas horizontales
      let goldenLines = 0; // Contador para las líneas doradas
  
      for (let x = 30; x < width; x += 30) {
        if (goldenLines < 4 && amp > 0.3) {
          stroke(218, 165, 32); // Trazo Dorado
          goldenLines++;
        } else if (goldenLines < 2 && amp > 0.2) {
          stroke(218, 165, 32); // Trazo Dorado
          goldenLines++;
        } else {
          stroke(255);
        }
      
        line(0, x, width, x);
      }
      
    }
  }
  

function spawnTrazos() {
  const tamanios = [700, 600, 500]; //Tamanios posibles que pueden tomar
  const rango = [-250, 400]; //Rango de spawn
  const colores = ["#CDD31A", "#B67964", "#EAC9AF", "#57B89D", "#C7937B", "#8672B0", "#EF5047", "#F3A09C", "#A7654C", "#784B44"];

  for (let i = 0; i < 9; i++) { // Recorre las posiciones del trazos[]
    const tamanio = tamanios[i % tamanios.length]; // Utilizar el módulo para ajustar el índice al tamaño del array tamanios
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    const colorAleatorio = colores[indiceAleatorio];

    tint(color(colorAleatorio)); //Elije un color random del array de colores
    image(trazos[i].imagen, random(...rango), random(...rango), tamanio, tamanio);
    colores.splice(indiceAleatorio, 1); // Para eliminar ese color del array de colores
  }
}

