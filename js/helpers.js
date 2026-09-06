// Convierte "01:08:30" a segundos
function tiempoASegundos(tiempo) {

    const partes = tiempo.split(":").map(Number);

    if (partes.length === 3) {

        const [horas, minutos, segundos] = partes;

        return horas * 3600 +
               minutos * 60 +
               segundos;

    }

    if (partes.length === 2) {

        const [minutos, segundos] = partes;

        return minutos * 60 +
               segundos;

    }

    return 0;

}

// Convierte segundos a formato ritmo "5:14"
function segundosARitmo(segundos) {

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.round(segundos % 60);

    return `${minutos}:${segundosRestantes
        .toString()
        .padStart(2, "0")}`;

}

// Devuelve el ritmo de un entrenamiento en segundos
function calcularRitmo(entrenamiento) {

    const ritmo = entrenamiento.ritmo
        .replace("min/km", "")
        .trim();

    const [minutos, segundos] = ritmo
        .split(":")
        .map(Number);

    return minutos * 60 + segundos;

}

// Formato: 19 julio 2026
function formatearFecha(fecha) {

    return new Date(fecha).toLocaleDateString("es-ES", {

        day: "numeric",
        month: "long",
        year: "numeric"

    });

}

// Formato: julio 2026
function formatearMes(fecha) {

    return new Date(fecha).toLocaleDateString("es-ES", {

        month: "long",
        year: "numeric"

    });

}

// Formato de fecha sin año
function formatearFechaSinAño(fecha) {

    return new Date(fecha).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long"
    });

}

// Clase CSS
function obtenerClase(tipo) {

    switch (tipo.toLowerCase()) {

        case "rodaje":
            return "rodaje";

        case "tempo":
            return "tempo";

        case "tirada":

        case "tirada larga":
            return "tirada";

        case "series":
            return "series";

        default:
            return "";

    }

}