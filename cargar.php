<?php
$nameFile="data-1.json";
$file=fopen($nameFile,"r");
$recupera=fread($file,filesize($nameFile));
$data = json_decode($recupera, true);
fclose($file);    
 $i=0;
 $vector=array();
 $campo=$_POST['campo'];
 $salida='[';
 foreach ($data as $key => $value) {
       if(!revisa($vector,$value[$campo])){
 	    $vector[$i]=$value[$campo];
         $i=$i+1;
       }
  }
 asort($vector);
 foreach ($vector as $key => $value) {
         $salida.='{"Tipo":"'.$value.'"},';
  }

 $salida=substr($salida, 0, -1).']';
 $response['cadena']=$salida;
 $response['titulo']='cargado';
 echo json_encode($response);

// Revisa si el valor($valu) ya existe en el array($vec)
function revisa($vec,$valu){
   foreach ($vec as $pos => $valor) {
      if ($valu==$valor) {
        return true;
      }
    }
    return false;
}


?>