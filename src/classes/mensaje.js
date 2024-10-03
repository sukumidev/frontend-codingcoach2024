export class Mensaje {
    constructor(tipo, mensaje) {
      this.tipo = tipo;
      this.mensaje = mensaje;
      this.enviado = new Date().toLocaleTimeString(); // Hora de envío
    }
  }
  