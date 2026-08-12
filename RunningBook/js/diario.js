// DIARIO

async function cargarDiario() {

    try {

        // Leer JSON
        const respuesta = await fetch("data/entrenamientos.json");
        const entrenamientos = await respuesta.json();

        const contenedor = document.getElementById("diarioContainer");

        contenedor.innerHTML = "";

        if (entrenamientos.length === 0) return;

        // Mostrar del más reciente al más antiguo
        entrenamientos
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .forEach(ent => {

                const tarjeta = document.createElement("article");

                tarjeta.className = `diario-card ${obtenerClase(ent.tipo)}`;

                // Temperatura (solo si existe)
                const temperaturaHTML = ent.temperatura
                    ? `
                        <div class="dato">

                            <span class="dato-label">
                                Temperatura
                            </span>

                            <span class="dato-valor">
                                ${ent.temperatura}
                            </span>

                        </div>
                    `
                    : "";

                tarjeta.innerHTML = `

                    <div class="diario-header">

                        <div class="diario-tipo">

                            <span class="tipo-texto ${obtenerClase(ent.tipo)}">
                                ${ent.tipo.toUpperCase()}
                            </span>

                        </div>

                        <div class="diario-fecha">
                            ${formatearFecha(ent.fecha)}
                        </div>

                    </div>

                    <div class="diario-datos">

                        <div class="dato">

                            <span class="dato-label">
                                Distancia
                            </span>

                            <span class="dato-valor">
                                ${ent.distancia} km
                            </span>

                        </div>

                        <div class="dato">

                            <span class="dato-label">
                                Tiempo
                            </span>

                            <span class="dato-valor">
                                ${ent.tiempo}
                            </span>

                        </div>

                        <div class="dato">

                            <span class="dato-label">
                                Ritmo
                            </span>

                            <span class="dato-valor">
                                ${ent.ritmo} min/km
                            </span>

                        </div>

                        ${temperaturaHTML}

                    </div>

                    <div class="diario-seccion">

                        <span class="diario-label">
                            Sensaciones
                        </span>

                        <p class="diario-texto">
                            ${ent.sensaciones || "—"}
                        </p>

                    </div>

                `;

                contenedor.appendChild(tarjeta);

            });

    }

    catch (error) {

        console.error("Error cargando diario:", error);

    }

}