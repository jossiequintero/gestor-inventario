var arregloPuntos = []
var numeroPuntos = 1;

function nuevoPunto() {

    numeroPuntos++;

    const puntosEntrada = document.getElementById('puntos-entrada');
    const fielset = document.createElement('fieldset');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    const input3 = document.createElement('input');

    span1.innerText = `P${numeroPuntos} ( `;
    span2.innerText = ` , `;
    span3.innerText = ` ) T = `;

    input1.type = "number";
    input1.id = `punto_${numeroPuntos}_x1`
    input1.classList.add('puntos')

    input2.type = "number";
    input2.id = `punto_${numeroPuntos}_x2`
    input2.classList.add('puntos')

    input3.type = "number";
    input3.id = `punto_${numeroPuntos}_t`
    input3.classList.add('puntos')

    fielset.appendChild(span1)
    fielset.appendChild(input1)
    fielset.appendChild(span2)
    fielset.appendChild(input2)
    fielset.appendChild(span3)
    fielset.appendChild(input3)

    puntosEntrada.appendChild(fielset)
}

function llenar() {
    limpiarTabla()

    arregloPuntos = []

    const tabla = document.getElementById('tabla');

    for (let index = 1; index <= numeroPuntos; index++) {
        let nombre = `P${index}`;
        let nombre_x1 = "punto_" + index + "_x1"
        let nombre_x2 = "punto_" + index + "_x2"
        let nombre_t = "punto_" + index + "_t"
        let x1 = document.getElementById(nombre_x1);
        let x2 = document.getElementById(nombre_x2);
        let t = document.getElementById(nombre_t);
        arregloPuntos[nombre] = [x1.value, x2.value, t.value]
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const ten = document.createElement('td');
        td1.innerText = `P${index}`
        tr.appendChild(td1)
        td2.innerText = x1.value
        tr.appendChild(td2)
        td3.innerText = x2.value
        tr.appendChild(td3)
        ten.innerText = t.value
        tr.appendChild(ten)
        tabla.appendChild(tr);
    }
}

function limpiarTabla() {
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = ""
    tabla.innerHTML = "<tr><th>Puntos</th><th>x1</th><th>x2</th><th>T</th></tr>"
}

// // function
// class Entrada{
//   constructor(nombre.valor, ){

//   }

class Neurona {
    constructor(entrada, peso, sesgo, nuevoPuntosPrueba) {
        this.Entradas = Object.entries(entrada);
        this.Pesos = peso;
        this.Sesgo = sesgo;
        this.puntosPrueba = nuevoPuntosPrueba
        this.iterar = false;
    }
    aprender() {
        do {
            let indexPunto = 0;
            for (const entradaActual of this.Entradas) {
                indexPunto++;
                console.group(`Valores punto ${entradaActual[0]}`)
                let valorEsperado = entradaActual[1][2];
                let valorCalculadoNuevo = this.calcularSalida(entradaActual);
                valorCalculadoNuevo = valorCalculadoNuevo.toFixed(2);
                let valorHardLims = this.funcionHardlims(valorCalculadoNuevo);
                let error = 0;
                let pesoNuevo = this.Pesos;
                let BIASNuevo = this.Sesgo;
                if (valorHardLims != valorEsperado) {
                    console.log(`Tengo que aprender ...`);
                    error = this.calcularError(valorEsperado, valorHardLims);
                    error = (Number)(error.toFixed(2))
                    pesoNuevo = this.calcularNuevoPeso(error, entradaActual);
                    BIASNuevo = this.calcularsesgo(error);
                    // this.iterar = true;
                } else {
                    console.log(`No Tengo que aprender ...`);
                }
                entradaActual['calculado'] = (Number)(valorCalculadoNuevo)
                entradaActual['hardlims'] = (Number)(valorHardLims);
                entradaActual['error'] = (Number)(error);
                entradaActual['peso'] = pesoNuevo;
                entradaActual['BIAS'] = BIASNuevo;
                this.Pesos = pesoNuevo
                this.Sesgo = BIASNuevo
                console.log(entradaActual);
                console.log(`Valor esperado: ${valorEsperado}`);
                console.groupEnd()
            }
        } while (this.iterar);
    }
    calcularSalida(punto) {
        let valorPunto = punto[1]
        let suma = (valorPunto[0] * this.Pesos[0]) + (valorPunto[1] * this.Pesos[1])
        return suma + this.Sesgo;
    }
    funcionHardlims(valorCalculado) {
        return (valorCalculado > 0) ? 1 : -1
    }
    calcularError(valorEsperado, valorHardLims) {
        return valorEsperado - valorHardLims;
    }
    calcularNuevoPeso(error, punto) {
        let valoresPunto = punto[1];
        let peso1 = this.Pesos[0] + (error * valoresPunto[0])
        let peso2 = this.Pesos[1] + (error * valoresPunto[1])
        peso1 = (Number)(peso1.toFixed(2))
        peso2 = (Number)(peso2.toFixed(2))
        return [peso1, peso2]
    }
    calcularsesgo(error) {
        let BIASNuevo = this.Sesgo + error;
        return BIASNuevo;
    }
}
const nuevaEntrada = {
    'P1': [2, 1, 1],
    'P2': [0, -1, 1],
    'P3': [-2, 1, -1],
    'P4': [0, 2, -1]
}
let nuevoPeso = [-0.7, 0.2];
let sesgo = 0.5;
const neurona = new Neurona(nuevaEntrada, nuevoPeso, sesgo);
console.log(neurona);
neurona.aprender();

/*
Si encuentro un nuevo peso, tengo que volver a iterar hasta el punto donde alle ese nuevo peso

P1 => Aprendo => Defino su peso y bias => si ya tiene asisnado uno y es igual al ultimo peso no tengo que volver a aprender
P2 => No aprendo
P3 => No aprendo
P4 => No aprendo

*/