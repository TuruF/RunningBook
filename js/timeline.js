// CRONOLOGIA

async function cargarTimeline() {

function activarAcordeonTimeline() {

    const headers = document.querySelectorAll(".timeline-header");

    headers.forEach(header => {

        header.addEventListener("click", () => {

            const contenido = header.nextElementSibling;
            const flecha = header.querySelector(".timeline-flecha");

            document.querySelectorAll(".timeline-contenido").forEach(item => {

                if (item !== contenido) {

                    item.classList.remove("abierto");

                }

            });

            document.querySelectorAll(".timeline-flecha").forEach(f => {

                if (f !== flecha) {

                    f.textContent = "▶";

                }

            });

            contenido.classList.toggle("abierto");

            flecha.textContent =
                contenido.classList.contains("abierto")
                ? "▼"
                : "▶";

        });

    });

}

    try {

        // Leer JSON
        const respuesta = await fetch("data/entrenamientos.json");
        const entrenamientos = await respuesta.json();

        if (entrenamientos.length === 0) return;

        // Ordenar por fecha (más reciente primero)
        entrenamientos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // Agrupar por mes
        const meses = {};

        entrenamientos.forEach(entreno => {

            const fecha = new Date(entreno.fecha);

            const clave = fecha.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric"
            });

            if (!meses[clave]) {

                meses[clave] = [];

            }

            meses[clave].push(entreno);

        });

        // Crear HTML
        let html = "";

        for (const mes in meses) {

            const lista = meses[mes];

            const totalKm = lista.reduce(
                (total, ent) => total + ent.distancia,
                0
            );

            html += `
            <div class="timeline-mes">

                <button class="timeline-header">

                    <span class="timeline-flecha">
                        ${Object.keys(meses)[0] === mes ? "▼" : "▶"}
                    </span>

                    <span class="timeline-titulo">
                        ${mes.toUpperCase()}
                    </span>

                    <span class="timeline-resumen">
                        ${lista.length} entrenamientos · ${totalKm.toFixed(2)} km
                    </span>

                </button>

                <div class="timeline-contenido ${Object.keys(meses)[0] === mes ? "abierto" : ""}">
            `;

            lista.forEach(entreno => {

                html += `

                <article class="timeline-card ${obtenerClase(entreno.tipo)}">

                    <div class="timeline-fecha">
                        ${formatearFecha(entreno.fecha)}
                    </div>

                    <div class="timeline-tipo">
                        ${entreno.tipo}
                    </div>

                    <div class="timeline-datos">

                        <span>📏 ${entreno.distancia} km</span>

                        <span>⏱ ${entreno.tiempo}</span>

                        <span>⚡ ${entreno.ritmo} min/km</span>

                    </div>

                </article>

                `;

            });

            html += `

                </div>

            </div>

            `;

        }

        document.getElementById("timelineContainer").innerHTML = html;
        
        activarAcordeonTimeline();
    }

    catch (error) {

        console.error("Error cargando cronología:", error);

    }

}