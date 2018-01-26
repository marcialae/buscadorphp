<?php
$nameFile="data-1.json";
$file=fopen($nameFile,"r");
$recupera=fread($file,filesize($nameFile));
$data = json_decode($recupera, true);
fclose($file);    
 $mini=$_POST['minimo'];
 $maxi=$_POST['maximo'];
 $tipo=$_POST['tipo'];
 $ciudad=$_POST['ciudad'];
 $salida='[';
  foreach ($data as $key => $value) {
       if(revisaPrecio($mini,$maxi,$value['Precio']) && revisaOtro($tipo,$value['Tipo']) && revisaOtro($ciudad,$value['Ciudad'])){
	   $salida.='{"Id":'.$value['Id'].',';
	   $salida.='"Direccion":"'.$value['Direccion'].'",';
	   $salida.='"Ciudad":"'.$value['Ciudad'].'",';
	   $salida.='"Telefono":"'.$value['Telefono'].'",';
	   $salida.='"Codigo_Postal":"'.$value['Codigo_Postal'].'",';
	   $salida.='"Tipo":"'.$value['Tipo'].'",';
	   $salida.='"Precio":"'.$value['Precio'].'"},';         
       }
   
  }    
$salida=substr($salida, 0, -1).']'; 
$response['cadena']=$salida;
$response['titulo']='cargado';
echo json_encode($response);

//Revisa si el valor esta en el rango dado
function revisaPrecio($minimo,$maximo,$valor){
 $numero=1000*strtr(substr($valor,1),',','.');
   if($numero>=(1*$minimo) && $numero<=(1*$maximo)){
     return true;
   } 
   return false;
}
//Revisa si los valores dados son iguales
function revisaOtro($ciudad,$valor){
   if($ciudad==$valor || $ciudad==""){
     return true;
   } 
   return false;
}


?>
