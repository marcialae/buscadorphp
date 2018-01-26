<?php
$nameFile="data-1.json";
$file=fopen($nameFile,"r");
$response['cadena']=fread($file,filesize($nameFile));
$response['titulo']='Proceso exitoso';
fclose($file);
echo json_encode($response);

?>                                                                                                                                                                                                                                                                                               