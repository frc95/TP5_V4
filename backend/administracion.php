<?php
require "persona.php";
require "empleado.php";
require "fabrica.php";

$nombre = htmlspecialchars($_POST["nombre"]);
$apellido = htmlspecialchars($_POST["apellido"]);
$dni = htmlspecialchars($_POST["dni"]);
$sexo = htmlspecialchars($_POST["sexo"]);
$legajo = htmlspecialchars($_POST["legajo"]);
$sueldo = htmlspecialchars($_POST["sueldo"]);
$turno = htmlspecialchars($_POST["rdoTurno"]);


$destino = "fotos/" . $_FILES["archivo"]["name"];
$tipoArchivo = pathinfo($destino, PATHINFO_EXTENSION);

$validarDniLegajo=false;
$empleadoEncontrado="";

$hidden=htmlspecialchars($_POST["hdnModificar"]);

$fabrica= new Fabrica("Grupo UTN");
$fabrica->TraerDeArchivo("archivos/empleados.txt");


if($hidden)
{
    $empleados=$fabrica->GetEmpleados();
    foreach($empleados as $empleado)
    {
        if($empleado->GetDni() == $dni)
        {
            $fabrica->EliminarEmpleado($empleado);
            break;
        }
    }
}


//Validar Legajo y dni
$empleados=$fabrica->GetEmpleados();
foreach($empleados as $empleado)
{
    if($empleado->GetDni() == $dni || $empleado->GetLegajo() == $legajo)
    {
        $validarDniLegajo=true;
        $empleadoEncontrado=$empleado->ToString();
        break;
    }
}

if(!$validarDniLegajo)
{

    if($tipoArchivo == "jpeg" || $tipoArchivo == "jpg" || $tipoArchivo == "bmp" || $tipoArchivo == "gif" || $tipoArchivo == "png")
    {
        echo "Cumple con la extension <br>";
        if ($_FILES["archivo"]["size"] <= 1000000 )
        {   
            echo "El tamaño del archivo es correcto <br>";

            if (file_exists($destino)) 
            {
                echo "El archivo ya existe <br>";
                
            }
            else
            {

                $empleado = new Empleado($nombre,$apellido,$dni,$sexo,$legajo,$sueldo,$turno);
                $empleado->SetPathFoto("fotos/".$dni."-".$apellido.".".$tipoArchivo);

                

                if($fabrica->AgregarEmpleado($empleado))
                {
                    if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino))
                    {
                        rename($destino,"fotos/".$dni."-".$apellido.".".$tipoArchivo);
                        echo "El archivo ha sido subido exitosamente.<br>";
                    } 
                    else 
                    {
                        echo "Lamentablemente ocurrio un error y no se pudo subir el archivo.<br>";
                    }

                    $fabrica->GuardarEnArchivo("archivos/empleados.txt");
                    echo "Haga click "."<a href='mostrar.php'>aqui</a>"." para ver el contenido del archivo";
                }
                else
                {
                    echo "<h2>La fabrica esta llena</h2><br/>";
                    echo "Haga click "."<a href='index.php'>aqui</a>"." para volver al formulario";
                }
                
            }
        }
        else
        {
            echo "El archivo es demasiado grande <br>";
            echo "Haga click "."<a href='index.php'>aqui</a>"." para volver al formulario";
        }
    }
    else
    {
        echo "No se acepta esa extension <br>";
        echo "Haga click "."<a href='index.php'>aqui</a>"." para volver al formulario";
    }
}
else
{
    echo "Existe un empleado con ese legajo o DNI <br>";
    echo $empleadoEncontrado;
    echo "<br> Haga click "."<a href='index.php'>aqui</a>"." para volver al formulario";
}  









