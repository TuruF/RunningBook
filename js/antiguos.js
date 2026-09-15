// ENTRENAMIENTOS ANTERIORES
async function cargarAntiguos() {

    try {

        const respuesta = await fetch("data/antiguos.json");
        const entrenamientos = await respuesta.json();

        const contenedor = document.getElementById("oldTrainingsContainer");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        if (entrenamientos.length === 0) return;

        const tabla = document.createElement("table");

        tabla.className = "antiguos-tabla";

        tabla.innerHTML = `
            <thead>
                <tr>
                    <th></th>
                    <th>Distancia</th>
                    <th>Tiempo</th>
                    <th>Ritmo</th>
                </tr>
            </thead>

            <tbody></tbody>
        `;

        const cuerpo = tabla.querySelector("tbody");

        entrenamientos.forEach((ent, indice) => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${indice + 1}</td>
                <td>${ent.distancia} km</td>
                <td>${ent.tiempo}</td>
                <td><strong>${ent.ritmo} min/km</strong></td>
            `;

            cuerpo.appendChild(fila);

        });

        contenedor.appendChild(tabla);

    } catch (error) {

        console.error(
            "Error cargando entrenamientos anteriores:",
            error
        );

    }

}