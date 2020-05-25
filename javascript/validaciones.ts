


function AdministrarValidaciones() : void
{
    let dni : string = (<HTMLInputElement> document.getElementById("txtDni")).value;
    let apellido : string = (<HTMLInputElement> document.getElementById("txtApellido")).value;
    let nombre : string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    let legajo : string = (<HTMLInputElement> document.getElementById("txtLegajo")).value;
    let sueldo : string = (<HTMLInputElement> document.getElementById("txtSueldo")).value;
    let sexo : string = (<HTMLInputElement> document.getElementById("cboSexo")).value;

    let minDni : string = (<HTMLInputElement> document.getElementById("txtDni")).min;
    let maxDni : string = (<HTMLInputElement> document.getElementById("txtDni")).max;

    let minLegajo : string = (<HTMLInputElement> document.getElementById("txtLegajo")).min;
    let maxLegajo : string = (<HTMLInputElement> document.getElementById("txtLegajo")).max;



    let minSueldo : string = (<HTMLInputElement> document.getElementById("txtSueldo")).min;
    
    let turno : string = ObtenerTurnoSeleccionado();

    (<HTMLInputElement> document.getElementById("txtSueldo")).max=ObtenerSueldoMaximo(turno).toString();

    let maxSueldo : string = (<HTMLInputElement> document.getElementById("txtSueldo")).max;

    let foto : string = (<HTMLInputElement> document.getElementById("imageFoto")).value;


    AdministrarSpanError("spanDni", ValidarCamposVacios(dni));
    AdministrarSpanError("spanApellido", ValidarCamposVacios(apellido));
    AdministrarSpanError("spanNombre", ValidarCamposVacios(nombre));
    AdministrarSpanError("spanLegajo", ValidarCamposVacios(legajo));
    AdministrarSpanError("spanSueldo", ValidarCamposVacios(sueldo));
    AdministrarSpanError("spanSexo", ValidarCombo(sexo,""));
    AdministrarSpanError("spanFoto", ValidarCamposVacios(foto));

    AdministrarSpanError("spanDni", ValidarRangoNumerico(Number(dni),Number(minDni),Number(maxDni)));
    AdministrarSpanError("spanLegajo", ValidarRangoNumerico(Number(legajo),Number(minLegajo),Number(maxLegajo)));
    AdministrarSpanError("spanSueldo", ValidarRangoNumerico(Number(sueldo),Number(minSueldo),Number(maxSueldo)));
    

    if(ObtenerTurnoSeleccionado()=="")
    {
        alert("Por favor elija un turno");
    }
    
}

function ValidarCamposVacios(campo :string) : boolean
{
    let validar : boolean=false;

    if(campo=="")
    {
        validar=true;
    }
    return validar;
}

function ValidarRangoNumerico(numero : number, min : number, max : number): boolean
{
    let validar : boolean = true;
    if(numero>=min && numero<=max)
    {
        validar=false;
    }
    return validar;
}


function ValidarCombo(primerValor : string, SegundoValor :string): boolean
{
    let validar : boolean=true;
    if(primerValor!=SegundoValor)
    {
        validar=false;
    }
    return validar;
}

function ObtenerTurnoSeleccionado(): string
{
    

    let checks : HTMLCollectionOf<HTMLInputElement> = 
    <HTMLCollectionOf<HTMLInputElement>> document.getElementsByTagName("input");

    let seleccionado : string = "";


    for (let index = 0 ; index < checks.length ; index++)
    {
        let input = checks[index];

        if(input.type == "radio")
        {
            if(input.checked == true)
            {
                seleccionado = input.value;
                break;
            }
        }
    }

    

    return seleccionado;



}

function ObtenerSueldoMaximo(turno : string): number
{
    let maximo : number=0;
    if(turno=="M")
    {
        maximo=20000;
    }
    if(turno=="T")
    {
        maximo=18500;
    }
    if(turno=="N")
    {
        maximo=25000;
    }
    return maximo;
}



//FUNCIONES DE LA PARTE 4

function AdministrarValidacionesLogin() : void
{
    let dni : string = (<HTMLInputElement> document.getElementById("txtDni")).value;
    let apellido : string = (<HTMLInputElement> document.getElementById("txtApellido")).value;

    let minDni : string = (<HTMLInputElement> document.getElementById("txtDni")).min;
    let maxDni : string = (<HTMLInputElement> document.getElementById("txtDni")).max;

   
    AdministrarSpanError("spanDni", ValidarCamposVacios(dni));
    AdministrarSpanError("spanDni", ValidarRangoNumerico(Number(dni),Number(minDni),Number(maxDni)));
    AdministrarSpanError("spanApellido", ValidarCamposVacios(apellido));

    if(VerificarValidacionesLogin())
    {
        alert("Todo Ok");
    }

}


function AdministrarSpanError(id:string, validar:boolean): void
{
    if(validar)
    {
        
        (<HTMLElement> document.getElementById(id)).style.display="block"; 
        
        
    }
    else
    {
        
        (<HTMLElement> document.getElementById(id)).style.display="none";
           
    }
}

function VerificarValidacionesLogin(): boolean
{
    let validar=false;
 
    if((<HTMLElement> document.getElementById("spanDni")).style.display=="none")
    if((<HTMLElement> document.getElementById("spanApellido")).style.display=="none")
    {
        validar=true;
    }
    return validar;
}

//FUNCION DE LA PARTE 5
function AdministrarModificar(dni : string):void
{
    (<HTMLInputElement> document.getElementById("hdDni")).value=dni;
    (<HTMLFormElement>document.getElementById("formModificar")).submit();
}




