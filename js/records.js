// RECORDS

async function cargarRecords() {

    try {

        const respuesta = await fetch("data/entrenamientos.json");
        const entrenamientos = await respuesta.json();

        if (entrenamientos.length === 0) return;

        // MEJOR RITMO
        const mejorRitmo = entrenamientos.reduce((mejor, actual) => {

            return calcularRitmo(actual) < calcularRitmo(mejor)
                ? actual
                : mejor;

        });

        // MEJOR TIRADA
        const mejorTirada = entrenamientos.reduce((mayor, actual) => {

            return actual.distancia > mayor.distancia
                ? actual
                : mayor;

        });

        // MEJOR TEMPO
        const tempos = entrenamientos.filter(ent =>
            ent.tipo.toLowerCase() === "tempo"
        );

        let mejorTempo = null;

        if (tempos.length > 0) {

            mejorTempo = tempos.reduce((mejor, actual) => {

                return calcularRitmo(actual) < calcularRitmo(mejor)
                    ? actual
                    : mejor;

            });

        }

        // MEJOR SERIE
        const series = entrenamientos.filter(ent =>
            ent.tipo.toLowerCase() === "series"
        );

        let mejorSerie = null;

        if (series.length > 0) {

            mejorSerie = series.reduce((mejor, actual) => {

                return calcularRitmo(actual) < calcularRitmo(mejor)
                    ? actual
                    : mejor;

            });

        }

        // ESCRIBIR HTML

        // Mejor ritmo

        document.getElementById("recordRitmo").textContent =
            segundosARitmo(calcularRitmo(mejorRitmo));

        document.getElementById("recordRitmoFecha").textContent =
            formatearFecha(mejorRitmo.fecha);

        document.getElementById("recordRitmoTipo").textContent =
            mejorRitmo.tipo;

        // Mejor tirada

        document.getElementById("recordTirada").textContent =
            mejorTirada.distancia;

        document.getElementById("recordTiradaFecha").textContent =
            formatearFecha(mejorTirada.fecha);

        // Mejor tempo

        if (mejorTempo) {

            document.getElementById("recordTempo").textContent =
                segundosARitmo(calcularRitmo(mejorTempo));

            document.getElementById("recordTempoFecha").textContent =
                formatearFecha(mejorTempo.fecha);

        }

        // Mejor serie

        if (mejorSerie) {

            document.getElementById("recordSerie").textContent =
                segundosARitmo(calcularRitmo(mejorSerie));

            document.getElementById("recordSerieFecha").textContent =
                formatearFecha(mejorSerie.fecha);

        }

    }

    catch (error) {

        console.error("Error cargando récords:", error);

    }
}