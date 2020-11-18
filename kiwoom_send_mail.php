<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '/var/www/html/web/PHPMailer/src/Exception.php';
require '/var/www/html/web/PHPMailer/src/PHPMailer.php';
require '/var/www/html/web/PHPMailer/src/SMTP.php';





$auth=getenv('auth');

if($auth=="ansgyqja"){
    $value=rand(000000,999999);
$mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch $mail->IsSMTP(); // telling the class to use SMTP
$mail->IsSMTP(); // telling the class to use SMTP
try {
$mail->CharSet = "utf-8"; //한글이 안깨지게 CharSet 설정
$mail->Encoding = "base64";
$mail->Host = "smtp.naver.com"; // email 보낼때 사용할 서버를 지정
$mail->SMTPAuth = true; // SMTP 인증을 사용함
$mail->Port = 465; // email 보낼때 사용할 포트를 지정
$mail->SMTPSecure = "ssl"; // SSL을 사용함
$mail->Username = "<input your email id>"; // Gmail 계정
$mail->Password = "<input your email pw>"; // 패스워드
$mail->SetFrom('<send user email address >', '<tmp name>'); // 보내는 사람 email 주소와 표시될 이름 (표시될 이름은 생략가능)


// 메일 보내기 
require('invest_db.php');
$sql ="select email from member where lebel=3";
$result = mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($result)){
    $mail->AddAddress($row['email']);
}


$mail->Subject = '<input your title> '; // 메일 제목
$mail->Body =
"<input your content>";

// 파일경로 및 파일이름 참조
$_sql ="select file_name from kiwoom_daily_report order by created desc limit 1";
$_result = mysqli_query($conn,$_sql);
while($_row=mysqli_fetch_array($_result)){
    $file_name=$_row['file_name'];
}
$file_name='/var/www/html/web/invest_crawler/'.$file_name;
// echo $file_name;
mysqli_close($conn);


$mail->AddAttachment($file_name);

$mail->Send(); // 발송

echo "성공";
}
catch (phpmailerException $e) {
echo $e->errorMessage(); //Pretty error messages from PHPMailer
} catch (Exception $e) {
echo $e->getMessage(); //Boring error messages from anything else!
}
}else{
    echo "인증실패";
}
?>
