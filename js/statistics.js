// ESTADISTICAS

async function cargarStatistics() {

    try {

        // Leer JSON
        const respuesta = await fetch("data/entrenamientos.json");
        const entrenamientos = await respuesta.json();

        if (entrenamientos.length === 0) return;

        const contenedor = document.getElementById("statisticsGrid");
        contenedor.innerHTML = "";

        // Agrupar entrenamientos por mes
        const meses = {};

        entrenamientos.forEach(ent => {

            const fecha = new Date(ent.fecha);

            // Clave para ordenar
            const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;

            // Nombre que se mostrará
            const nombre = fecha.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric"
            }).toUpperCase();

            if (!meses[clave]) {

                meses[clave] = {
                    nombre,
                    entrenamientos: []
                };

            }

            meses[clave].entrenamientos.push(ent);

        });

        // Mostrar primero los meses más recientes
        const mesesOrdenados = Object.entries(meses)
            .sort((a, b) => b[0].localeCompare(a[0]));

        mesesOrdenados.forEach(([_, mes]) => {

            // Cálculos
            const datos = mes.entrenamientos;

            const entrenamientosMes = datos.length;

            const kmTotales = datos.reduce(
                (total, ent) => total + ent.distancia,
                0
            );

            const tiempoTotal = datos.reduce(
                (total, ent) => total + tiempoASegundos(ent.tiempo),
                0
            );

            const horas = Math.floor(tiempoTotal / 3600);
            const minutos = Math.floor((tiempoTotal % 3600) / 60);

            const ritmoMedio = tiempoTotal / kmTotales;

            const ritmos = datos.map(ent => calcularRitmo(ent));

            const mejorRitmo = Math.min(...ritmos);
            const peorRitmo = Math.max(...ritmos);

            // Tarjeta
            const tarjeta = document.createElement("article");
            tarjeta.className = "statistics-card";

            tarjeta.innerHTML = `

                <div class="statistics-header">
                    ${mes.nombre}
                </div>

                <div class="statistics-body">

                    <div class="statistics-row">
                        <span>Entrenamientos</span>
                        <strong>${entrenamientosMes}</strong>
                    </div>

                    <div class="statistics-row">
                        <span>Kilómetros</span>
                        <strong>${kmTotales.toFixed(2)} km</strong>
                    </div>

                    <div class="statistics-row">
                        <span>Tiempo</span>
                        <strong>${horas}h ${minutos}min</strong>
                    </div>

                    <div class="statistics-row">
                        <span>Ritmo medio</span>
                        <strong>${segundosARitmo(ritmoMedio)}</strong>
                    </div>

                    <div class="statistics-row">
                        <span>Mejor ritmo</span>
                        <strong>${segundosARitmo(mejorRitmo)}</strong>
                    </div>

                    <div class="statistics-row">
                        <span>Peor ritmo</span>
                        <strong>${segundosARitmo(peorRitmo)}</strong>
                    </div>

                </div>

            `;

            contenedor.appendChild(tarjeta);

        });

    }

    catch (error) {

        console.error("Error cargando estadísticas:", error);

    }

}