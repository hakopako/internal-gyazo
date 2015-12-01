<?PHP

define("EXPORT_PATH", "/tmp/gyazo/");
define("URL_BASE", "https://bar.foo/");

/**
 * ランダム文字列生成 (英数字)
 * $length: 生成する文字数
 */
function makeRandStr($length) {
    $str = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
    $r_str = "";
    for ($i = 0; $i < $length; $i++) {
        $r_str .= $str[rand(0, count($str))];
    }
    return $r_str;
}


$hashFileName = makeRandStr(16).'.png';
$url = URL_BASE.$hashFileName;
$data = file_get_contents($_FILES['UploadFile']['tmp_name']);
file_put_contents(EXPORT_PATH.$hashFileName, $data);

echo $url;

?>
