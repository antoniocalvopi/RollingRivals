function localStorage() {
    // Inicializar el contador local
    let localCount = localStorage.getItem('localCount') ? parseInt(localStorage.getItem('localCount')) : 0;
    localCount++; // Incrementar el contador local
    localStorage.setItem('localCount', localCount); // Guardar el nuevo valor en localStorage
    document.getElementById('localCount').textContent = localCount; // Actualizar el contador en la página
}
