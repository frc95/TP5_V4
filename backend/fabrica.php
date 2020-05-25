<?php

require "interfaces.php";


class Fabrica implements IArchivo
{
    private $_cantidadMaxima;
    private $_empleados;
    private $_razonSocial;

    public function __construct($razonSocial)
    {
        $this->_razonSocial=$razonSocial;
        $this->_cantidadMaxima=7;
        $this->_empleados=array();
    }

    public function AgregarEmpleado($emp)
    {
        $validar=false;
        
        if( count($this->_empleados) < $this->_cantidadMaxima)
        {
            array_push($this->_empleados,$emp);

            $this->EliminarEmpleadoRepetido();
        
            $validar=true;
        }
        
        
        return $validar;
    }

    public function CalcularSueldos()
    {
        $total=0;
        foreach($this->_empleados as $empleado)
        {
            $total=$total+$empleado->GetSueldo();
        }
        return $total;
    }

    public function EliminarEmpleado($emp)
    {
        $validar=false;
        $contador=0;
        foreach($this->_empleados as $empleado)
        {
            
            
            if($empleado->GetLegajo() == $emp->GetLegajo())
            {
                $ruta=trim($emp->GetPathFoto());
                unlink($ruta);
                unset($this->_empleados[$contador]);
                
                $validar=true;
                break;
            }
            $contador++;
        }
        return $validar;
    }

    private function EliminarEmpleadoRepetido()
    {
        
        $this->_empleados=array_unique($this->_empleados,SORT_REGULAR);
    }

    public function GetEmpleados()
    {
        return $this->_empleados;
    }
    
    public function ToString()
    {
        $salida=$this->_razonSocial."-".$this->_cantidadMaxima."<br>";
        foreach($this->_empleados as $empleado)
        {
            $salida=$salida."-".$empleado->ToString()."<br>";
        }
        return $salida;
    }


    function GuardarEnArchivo($nombreArchivo)
    {
        $archivo = fopen($nombreArchivo, "w+");    
        foreach($this->_empleados as $empleado)
        {
            
            if($empleado!=null)
            {
                $empleadoSinEspacio=trim($empleado->ToString());
                $cant = fwrite($archivo,$empleadoSinEspacio."\r\n");
                if($cant <= 0)
                {
	                echo "<h2>Error en la escritura </h2><br/>";
                }
                
            }  
        }  
        fclose($archivo);
    }

    function TraerDeArchivo($nombreArchivo)
    {
        if(file_exists($nombreArchivo))
        {
            $archivo = fopen($nombreArchivo, "r");
            while(!feof($archivo))
            {
	            $datos=explode("-",fgets($archivo));
            
	            if($datos[0]!=null)
	            {
                    
                    $empleado = new Empleado($datos[1],$datos[2],$datos[0],$datos[3],$datos[4],$datos[5],$datos[6]);
                    $empleado->SetPathFoto($datos[7]."-".$datos[8]);
                    
		            $this->AgregarEmpleado($empleado);
	            }
            }
            fclose($archivo);   
        }
 
        
    }
}