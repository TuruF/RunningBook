// HEADER
const FECHA_INICIO = new Date(2025, 5, 11);

// Mostrar fecha de inicio
function actualizarFechaInicio() {

    const opciones = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    document.getElementById("fechaInicio").textContent =
        FECHA_INICIO.toLocaleDateString("es-ES", opciones);

}

// Calcular días transcurridos
function actualizarDias() {

    const hoy = new Date();

    const diferencia = hoy - FECHA_INICIO;

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    document.getElementById("dias").textContent =
        `${dias} días escribiendo`;

}