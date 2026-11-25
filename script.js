class Usuario {

    constructor(nombre, edad, dni) {
        this.datoNombre = nombre;
        this.datoEdad = edad;
        this.datoDni = dni;
        this.datoPesos = 0;
        this.datoDolares = 0;
    }

    get nombre() {
        return this.datoNombre;
    }

    get edad() {
        return this.datoEdad;
    }

    get dni() {
        return this.datoDni;
    }

    get pesos() {
        return this.datoPesos;
    }

    set pesos(valor) {
        if (valor >= 0) {
            this.datoPesos = valor;
        }
    }

    get dolares() {
        return this.datoDolares;
    }

    set dolares(valor) {
        if (valor >= 0 && valor <= 200) {
            this.datoDolares = valor;
        }
    }

}

class Banco {

    constructor(usuario) {
        this.cliente = usuario;
    }

    ingresarPesos(monto) {
        if (monto <= 0) {
            return "Monto inválido.";
        }

        this.cliente.pesos = this.cliente.pesos + monto;
        this.guardar();
        return "Ingresaste $" + monto;
    }

    comprarDolares(cantidad) {
        let costo = cantidad * 1200;

        if (cantidad <= 0) {
            return "Cantidad inválida.";
        }

        if (this.cliente.dolares + cantidad > 200) {
            return "Error: límite máximo de 200 dólares.";
        }

        if (costo > this.cliente.pesos) {
            return "Error: no tenés suficientes pesos.";
        }

        this.cliente.pesos = this.cliente.pesos - costo;
        this.cliente.dolares = this.cliente.dolares + cantidad;
        this.guardar();
        return "Compraste US$" + cantidad;
    }

    guardar() {
        let datos = {
            nombre: this.cliente.nombre,
            edad: this.cliente.edad,
            dni: this.cliente.dni,
            pesos: this.cliente.pesos,
            dolares: this.cliente.dolares
        };
        localStorage.setItem("cuentaBanco", JSON.stringify(datos));
    }

    cargar() {
        let datos = JSON.parse(localStorage.getItem("cuentaBanco"));
        if (datos != null) {
            this.cliente = new Usuario(datos.nombre, datos.edad, datos.dni);
            this.cliente.pesos = datos.pesos;
            this.cliente.dolares = datos.dolares;
        }
    }

}

let usuario = new Usuario("Invitado", 18, "00000000");
let banco = new Banco(usuario);

function guardarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let dni = document.getElementById("dni").value;

    if (nombre == "" || edad == "" || dni == "") return;

    usuario = new Usuario(nombre, edad, dni);
    banco = new Banco(usuario);
    banco.guardar();
    actualizar();
}

function depositar() {
    let monto = document.getElementById("montoPesos").value * 1;
    document.getElementById("mensaje").textContent = banco.ingresarPesos(monto);
    document.getElementById("montoPesos").value = "";
    actualizar();
}

function comprar() {
    let cantidad = document.getElementById("montoDolares").value * 1;
    document.getElementById("mensaje").textContent = banco.comprarDolares(cantidad);
    document.getElementById("montoDolares").value = "";
    actualizar();
}

function actualizar() {
    let cliente = banco.cliente;
    document.getElementById("infoUsuario").textContent = cliente.nombre + " | Edad: " + cliente.edad + " | DNI: " + cliente.dni;
    document.getElementById("saldoPesos").textContent = "Pesos: $" + cliente.pesos;
    document.getElementById("saldoDolares").textContent = "Dólares: US$" + cliente.dolares;
}

banco.cargar();
actualizar();