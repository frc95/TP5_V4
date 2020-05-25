"use strict";
function AdministrarValidaciones() {
    var dni = document.getElementById("txtDni").value;
    var apellido = document.getElementById("txtApellido").value;
    var nombre = document.getElementById("txtNombre").value;
    var legajo = document.getElementById("txtLegajo").value;
    var sueldo = document.getElementById("txtSueldo").value;
    var sexo = document.getElementById("cboSexo").value;
    var minDni = document.getElementById("txtDni").min;
    var maxDni = document.getElementById("txtDni").max;
    var minLegajo = document.getElementById("txtLegajo").min;
    var maxLegajo = document.getElementById("txtLegajo").max;
    var minSueldo = document.getElementById("txtSueldo").min;
    var turno = ObtenerTurnoSeleccionado();
    document.getElementById("txtSueldo").max = ObtenerSueldoMaximo(turno).toString();
    var maxSueldo = document.getElementById("txtSueldo").max;
    var foto = document.getElementById("imageFoto").value;
    AdministrarSpanError("spanDni", ValidarCamposVacios(dni));
    AdministrarSpanError("spanApellido", ValidarCamposVacios(apellido));
    AdministrarSpanError("spanNombre", ValidarCamposVacios(nombre));
    AdministrarSpanError("spanLegajo", ValidarCamposVacios(legajo));
    AdministrarSpanError("spanSueldo", ValidarCamposVacios(sueldo));
    AdministrarSpanError("spanSexo", ValidarCombo(sexo, ""));
    AdministrarSpanError("spanFoto", ValidarCamposVacios(foto));
    AdministrarSpanError("spanDni", ValidarRangoNumerico(Number(dni), Number(minDni), Number(maxDni)));
    AdministrarSpanError("spanLegajo", ValidarRangoNumerico(Number(legajo), Number(minLegajo), Number(maxLegajo)));
    AdministrarSpanError("spanSueldo", ValidarRangoNumerico(Number(sueldo), Number(minSueldo), Number(maxSueldo)));
    if (ObtenerTurnoSeleccionado() == "") {
        alert("Por favor elija un turno");
    }
}
function ValidarCamposVacios(campo) {
    var validar = false;
    if (campo == "") {
        validar = true;
    }
    return validar;
}
function ValidarRangoNumerico(numero, min, max) {
    var validar = true;
    if (numero >= min && numero <= max) {
        validar = false;
    }
    return validar;
}
function ValidarCombo(primerValor, SegundoValor) {
    var validar = true;
    if (primerValor != SegundoValor) {
        validar = false;
    }
    return validar;
}
function ObtenerTurnoSeleccionado() {
    var checks = document.getElementsByTagName("input");
    var seleccionado = "";
    for (var index = 0; index < checks.length; index++) {
        var input = checks[index];
        if (input.type == "radio") {
            if (input.checked == true) {
                seleccionado = input.value;
                break;
            }
        }
    }
    return seleccionado;
}
function ObtenerSueldoMaximo(turno) {
    var maximo = 0;
    if (turno == "M") {
        maximo = 20000;
    }
    if (turno == "T") {
        maximo = 18500;
    }
    if (turno == "N") {
        maximo = 25000;
    }
    return maximo;
}
//FUNCIONES DE LA PARTE 4
function AdministrarValidacionesLogin() {
    var dni = document.getElementById("txtDni").value;
    var apellido = document.getElementById("txtApellido").value;
    var minDni = document.getElementById("txtDni").min;
    var maxDni = document.getElementById("txtDni").max;
    AdministrarSpanError("spanDni", ValidarCamposVacios(dni));
    AdministrarSpanError("spanDni", ValidarRangoNumerico(Number(dni), Number(minDni), Number(maxDni)));
    AdministrarSpanError("spanApellido", ValidarCamposVacios(apellido));
    if (VerificarValidacionesLogin()) {
        alert("Todo Ok");
    }
}
function AdministrarSpanError(id, validar) {
    if (validar) {
        document.getElementById(id).style.display = "block";
    }
    else {
        document.getElementById(id).style.display = "none";
    }
}
function VerificarValidacionesLogin() {
    var validar = false;
    if (document.getElementById("spanDni").style.display == "none")
        if (document.getElementById("spanApellido").style.display == "none") {
            validar = true;
        }
    return validar;
}
//FUNCION DE LA PARTE 5
function AdministrarModificar(dni) {
    document.getElementById("hdDni").value = dni;
    document.getElementById("formModificar").submit();
}
//# sourceMappingURL=validaciones.js.map