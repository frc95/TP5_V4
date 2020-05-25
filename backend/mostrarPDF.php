<?php
require_once __DIR__ . '/vendor/autoload.php';
require "persona.php";
require "empleado.php";
require "fabrica.php";

ob_start();

header('content-type:application/pdf');

header('Content-Transfer-Encoding: binary');
header('Accept-Ranges: bytes');

session_start();

$mpdf = new \Mpdf\Mpdf(['orientation' => 'P', 
                        'pagenumPrefix' => 'Página nro. ',
                        'pagenumSuffix' => ' - ',
                        'nbpgPrefix' => ' de ',
                        'nbpgSuffix' => ' páginas']);
$dni=$_SESSION["DNIEmpleado"];

$mpdf->SetProtection(array(), $dni, $dni);

$mpdf->SetHeader('Amarilla Godoy Franco Nahuel||{PAGENO}{nbpg}');
$mpdf->setFooter('https://tp5-pdo-franco-v4.herokuapp.com/||{PAGENO}');

$datos="";
$fabrica= new Fabrica("Grupo UTN");
$fabrica->TraerDeArchivo("archivos/empleados.txt");
$empleados=$fabrica->GetEmpleados();
foreach($empleados as $empleado)
{
    $path=$empleado->GetPathFoto();

    $datos= $datos."<tr>".
                        "<td>". $empleado->ToString() ."</td>".
                        "<td>".
                            "<img src='$path' height='90px' width='90px'>".
                        "</td>".
                    "</tr>";	
}

$tabla='<table align="">
            <tr>
                <td><h4>Info</h4></td>
            </tr>
            <tr>
                <td colspan="4"><hr></td>
            </tr>'.
            $datos.
            '<tr>
			    <td colspan="4"><hr></td>
		    </tr>
	    </table>';

$mpdf->WriteHTML('<h2>Listado de Empleados</h2>',1);
$mpdf->debug = true;
$mpdf->WriteHTML($tabla,2);

$mpdf->Output('mi_pdf.pdf', 'I');

