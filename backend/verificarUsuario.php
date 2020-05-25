<?php


$apellido = htmlspecialchars($_POST["apellido"]);
$dni = htmlspecialchars($_POST["dni"]);


if(file_exists("archivos/empleados.txt"))
{
    
    $archivo = fopen("archivos/empleados.txt", "r");
    while(!feof($archivo))
    {
	    $datos=explode("-",fgets($archivo));
            
	    if($datos[0]!=null)
	    {
            if($datos[0]==$dni && $datos[2]==$apellido)
            {
                session_start();
                $_SESSION["DNIEmpleado"]=$dni;
                header("Location: mostrar.php");
            }
            
                    

	    }
    }
    fclose($archivo);
    
    echo "Error no se encontro el empleado <br>";
    echo "Haga click "."<a href='../login.html'>aqui</a>"." para volver al login";
    
    
    
}