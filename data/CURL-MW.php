<?php

//@header( 'Content-Type: text/xml' );
function getXML()
{

$projectxml = "http://production.marketwatch-amp.virginia.onservo.com/flipboard/rss/aapl_news?format=extended&images=true&num=30";
$ch = curl_init();
$proxy = "proxy.dowjones.net";
$agent = "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.4) Gecko/20030624 Netscape/7.1 (ax)";
//define the URL and any post/get fields you want to send...
//$theUrl = "http://www.wsj.com";
//$theUrl = "http://online.wsj.com/public/resources/documents/LUGECOURSE100216_metaData.xml";
//$the_post_fields = "id=123456&name=test&Slug=asdasdad";
//other curl options...
curl_setopt($ch, CURLOPT_URL, $projectxml);
curl_setopt($ch, CURLOPT_USERAGENT, $agent);
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
//curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_PROXY, $proxy);
curl_setopt($ch, CURLOPT_PROXYPORT, '80');
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);//return data as string 
curl_setopt($ch, CURLOPT_POST, 1);
//curl_setopt($ch, CURLOPT_POSTFIELDS, $the_post_fields);
//catch the output of the script...
$curl_verbose_out =curl_setopt($ch, CURLOPT_VERBOSE, 1); 
//echo $curl_verbose_out;
//EXECUTE THE CURL COMMAND
$curlCall = curl_exec ($ch);
curl_error($ch);
curl_close ($ch);
//return $curlCall;

//$objDOM->save();


echo $curlCall;
}
//$x = getXML();

getXML();

?>