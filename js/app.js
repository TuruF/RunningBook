// APLICACION PRINCIPAL

document.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp() {

    console.log("🏃 RunningBook iniciado");

    // Header
    actualizarFechaInicio();
    actualizarDias();

    // Dashboard
    cargarDashboard();

    // Récords
    cargarRecords();

    // Cronología
    cargarTimeline();

    // Estadísticas
    cargarStatistics();
    
    // Diario
    cargarDiario();

}