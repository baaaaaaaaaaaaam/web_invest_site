cd /var/www/html/
  cp -rf `ls ./ | grep -v send_mail.php | grep -v invest_db.php | grep -v kiwoom_send_mail.php` /home/ubuntu/git/web_invest_site/
  cp -rf /home/ubuntu/log /home/ubuntu/git/web_invest_site/
  cp -rf /home/ubuntu/auto_shell_script/ /home/ubuntu/git/web_invest_site/
