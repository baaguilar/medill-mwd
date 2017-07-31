<?php $curl = curl_init();

curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_URL, "http://www.marketwatch.com/news/rss/aapl_news?images=true");

$xml = curl_exec($curl);

curl_close($curl);

echo $xml;
?>