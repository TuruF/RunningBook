// EVOLUCIÓN CORPORAL
async function cargarPeso() {

    try {

        // Leer JSON
        const respuesta = await fetch("data/peso.json");
        const registros = await respuesta.json();

        if (registros.length === 0) return;

        const contenedor = document.getElementById("bodyEvolutionGrid");

        contenedor.innerHTML = "";

        // AGRUPAR POR AÑO
        const años = {};

        registros.forEach(registro => {

            const año = new Date(registro.fecha).getFullYear();

            if (!años[año]) {

                años[año] = [];

            }

            años[año].push(registro);

        });

        // ORDENAR AÑOS
        const añosOrdenados = Object.keys(años)
            .sort((a, b) => b - a);

        // CREAR AÑOS
        añosOrdenados.forEach((año, indice) => {

            // Contenedor del año
            const bloqueAño = document.createElement("div");

            bloqueAño.className = "peso-año";

            // Año más reciente abierto
            if (indice === 0) {

                bloqueAño.classList.add("abierto");

            }

            // CABECERA DEL AÑO
            const cabecera = document.createElement("button");

            cabecera.className = "peso-año-header";

            cabecera.innerHTML = `

                <span>
                    ${año}
                </span>

                <span class="peso-flecha">
                    ${indice === 0 ? "▼" : "▶"}
                </span>

            `;

            // CONTENEDOR TARJETAS
            const tarjetas = document.createElement("div");

            tarjetas.className = "peso-tarjetas";

            // ORDENAR REGISTROS
            años[año]
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .forEach(registro => {

                    const tarjeta = document.createElement("article");

                    tarjeta.className = "peso-card";

                    tarjeta.innerHTML = `

                        <div class="peso-header">

                            ${formatearFechaSinAño(registro.fecha)}

                        </div>

                        <div class="peso-body">

                            <div class="peso-row">

                                <span>
                                    Peso
                                </span>

                                <strong>
                                    ${registro.peso} kg
                                </strong>

                            </div>

                            <div class="peso-row">

                                <span>
                                    IMC
                                </span>

                                <strong>
                                    ${registro.imc}
                                </strong>

                            </div>

                            <div class="peso-row">

                                <span>
                                    Grasa corporal
                                </span>

                                <strong>
                                    ${registro.grasa !== undefined
                                        ? registro.grasa + " %"
                                        : "—"}
                                </strong>

                            </div>

                            <div class="peso-row">

                                <span>
                                    % agua
                                </span>

                                <strong>
                                    ${registro.agua !== undefined
                                        ? registro.agua + " %"
                                        : "—"}
                                </strong>

                            </div>

                            <div class="peso-row">

                                <span>
                                    Masa ósea
                                </span>

                                <strong>
                                    ${registro.masaOsea !== undefined
                                        ? registro.masaOsea + " kg"
                                        : "—"}
                                </strong>

                            </div>

                            <div class="peso-row">

                                <span>
                                    Músculo
                                </span>

                                <strong>
                                    ${registro.musculo !== undefined
                                        ? registro.musculo + " %"
                                        : "—"}
                                </strong>

                            </div>

                        </div>

                    `;

                    tarjetas.appendChild(tarjeta);

                });

            // ABRIR / CERRAR AÑO
            cabecera.addEventListener("click", () => {

                bloqueAño.classList.toggle("abierto");

                const abierto = bloqueAño.classList.contains("abierto");
                const flecha = cabecera.querySelector(".peso-flecha");

                flecha.textContent = abierto ? "▼" : "▶";

            });

            // Añadir elementos
            bloqueAño.appendChild(cabecera);
            bloqueAño.appendChild(tarjetas);

            contenedor.appendChild(bloqueAño);

        });

    }

    catch (error) {

        console.error(
            "Error cargando evolución corporal:",
            error
        );

    }

}