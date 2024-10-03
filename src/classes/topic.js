export class Topic {
    constructor(icono, titulo, porcentaje, descripcion, color) {
        this.icono = icono; // Puede ser un componente o URL
        this.titulo = titulo; // Título del tema
        this.porcentaje = porcentaje; // Porcentaje relacionado con el tema
        this.descripcion = descripcion; // Descripción del tema
        this.color = color; // Color de fondo para el ícono
    }
    // Método para actualizar el porcentaje
    actualizarPorcentaje(nuevoPorcentaje) {
        this.porcentaje = nuevoPorcentaje;
    }
}