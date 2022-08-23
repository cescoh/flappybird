var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

//funcion que se ejecutara cada vez que la animacion corra, cada vez que corra volvera a esta funcion
hole.addEventListener("animationiteration", () => {
    var random = Math.random() * 3;
    var top = (random * 100) + 150;
    hole.style.top = -(top) + "px"; //hara que el hoyo aparezca entre -150 y -450 de manera random
    counter++;
});
//funcion que se ejecuta cada 10 segundos, esta funcion simulara la gravedad
setInterval(function () {
    var characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top")); //cada vez que se ejecuta la funcion el punto vuelve a su posicion inicial
    if (jumping == 0) { //la gravedad solo cambiara "top" si no se esta saltando
        character.style.top = (characterTop + 3) + "px"; //cada vez que se ejecuta el punto cae 3 pixeles desde el lugar en donde se encontraba
    }
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top")); //cada vez que se ejecuta la funcion el punto vuelve a su posicion inicial
    var cTop = -(500 - characterTop);
    if ((characterTop > 480) || ((blockleft < 20) && (blockleft - 50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) { //los statements OR primero indican que si el bloque izquierdo es menos que 20 y tambien si el bloque izquierdo es mayor que el numero -50, significa que el bloque esta tocando la pelota en  cualquier forma a la izquierda.
        //o completamente en el medio.
        //el ultimo statement OR, indica que si cTop es mayor a holeTop+130. 130 porque la altura de Hole es de 150.Es 150 - la pelota. La pelota tiene 20 px, por lo que el agujero es de solo 130px.
        alert("Game over! Puntaje obtenido: " + counter); //si la pelota llega hasta el final del cuadro por gravedad, el cartel dara por finalizado el juego, muestra el score logrado
        character.style.top = 100 + "px"; //vuelve a la posicion de 100px 
        counter = 0;
    }
}, 10);

function jump() {
    jumping = 1;
    jumpCount = 0; //contara cuantos saltos damos, no queremos que salte para siempre solo saltar un poco y que vuelva a caer por gravedad

    var jumpInterval = setInterval(function () {
        var characterTop =
            parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if ((characterTop > 6) && (jumpCount < 15)) { //if que hara que no se salga de cuadro the bird, sobre los blockes.
            character.style.top = (characterTop - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval) //si nuestro intervalo de salto es mas que 20 dejara de ejecutarse
            jumping = 0;
            jumpCount = 0; //todo a 0, la gravedad volvera a ejecutarse
        }
        jumpCount++
    }, 10)
}