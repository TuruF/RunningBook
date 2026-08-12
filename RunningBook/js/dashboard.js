// DASHBOARD

async function cargarDashboard() {

    try {

        // LEER JSON
        const respuesta = await fetch("data/entrenamientos.json");
        const entrenamientos = await respuesta.json();

        // Si no hay entrenamientos
        if (entrenamientos.length === 0) return;

        // CALCULOS

        // Total entrenamientos
        const totalEntrenamientos = entrenamientos.length;

        // Kilómetros acumulados
        const totalKm = entrenamientos.reduce(
            (total, ent) => total + ent.distancia,
            0
        );

        // Tiempo total en segundos
        const tiempoTotal = entrenamientos.reduce(
            (total, ent) => total + tiempoASegundos(ent.tiempo),
            0
        );

        const horas = Math.floor(tiempoTotal / 3600);
        const minutos = Math.floor((tiempoTotal % 3600) / 60);
        
        // Ritmo medio REAL
        const ritmoMedioSeg = tiempoTotal / totalKm;

        // Ritmos individuales
        const ritmosSegundos = entrenamientos.map(ent =>
            calcularRitmo(ent)
        );

        // Mejor ritmo
        const mejorRitmoSeg = Math.min(...ritmosSegundos);

        // Mejor tirada
        const mejorTirada = Math.max(
            ...entrenamientos.map(ent => ent.distancia)
        );

        // Último entrenamiento por fecha
        const ultimo = entrenamientos.reduce((ultimo, actual) => {

            return new Date(actual.fecha) > new Date(ultimo.fecha)
                ? actual
                : ultimo;

        });

        // ESCRIBIR EN HTML

        document.getElementById("totalEntrenamientos").textContent =
            totalEntrenamientos;

        document.getElementById("totalKm").textContent =
            `${totalKm.toFixed(2)} km`;

        document.getElementById("ritmoMedio").textContent =
            `${segundosARitmo(ritmoMedioSeg)} min/km`;

        document.getElementById("mejorRitmo").textContent =
            `${segundosARitmo(mejorRitmoSeg)} min/km`;

        document.getElementById("horasAcumuladas").textContent =
            `${horas}h ${String(minutos).padStart(2, "0")}min`;

        document.getElementById("mejorTirada").textContent =
            `${mejorTirada.toFixed(2)} km`;

        // ULTIMO ENTRENAMIENTO

        document.getElementById("ultimoFecha").textContent =
            formatearFecha(ultimo.fecha);

        document.getElementById("ultimoTipo").textContent =
            ultimo.tipo;

        document.getElementById("ultimoKm").textContent =
            `${ultimo.distancia} km`;

        document.getElementById("ultimoTiempo").textContent =
            ultimo.tiempo;

        document.getElementById("ultimoRitmo").textContent =
            `${ultimo.ritmo} min/km`;

    }

    catch (error) {

        console.error("Error cargando dashboard:", error);

    }

}