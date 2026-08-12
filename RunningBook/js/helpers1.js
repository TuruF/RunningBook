//FUNCIONES AUXILIARES

//Convierte un tiempo HH:MM:SS a segundos
function tiempoASegundos(tiempo) {

    const [horas, minutos, segundos] = tiempo.split(":").map(Number);

    return horas * 3600 + minutos * 60 + segundos;

}
//Calcula el ritmo (seg/km) de un entrenamiento
function calcularRitmo(entrenamiento) {

    const tiempo = tiempoASegundos(entrenamiento.tiempo);

    return tiempo / entrenamiento.distancia;

}

//Convierte segundos a formato MM:SS
function segundosARitmo(segundos) {

    const min = Math.floor(segundos / 60);
    const seg = Math.round(segundos % 60);

    return `${min}:${seg.toString().padStart(2, "0")}`;

}

//Formatea la fecha al formato español
function formatearFecha(fecha) {

    const d = new Date(fecha);

    return d.toLocaleDateString("es-ES");

}

let entrenamientos = [];

async function cargarEntrenamientos() {

    if (entrenamientos.length > 0) {
        return entrenamientos;
    }

    const respuesta = await fetch("data/entrenamientos.json");
    entrenamientos = await respuesta.json();

    return entrenamientos;

}

//Reutilizar colores
function obtenerClaseTipo(tipo) {

    switch (tipo.toLowerCase()) {

        case "series":
            return "series";

        case "tempo":
            return "tempo";

        case "tirada":
            return "tirada";

        case "rodaje":
            return "rodaje";

        default:
            return "";
    }

}