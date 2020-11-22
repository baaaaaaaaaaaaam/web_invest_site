cd /var/www/html/web/
  cp -rf `ls ./ | grep -v send_mail.php | grep -v invest_db.php | grep -v kiwoom_send_mail.php` /home/test/git/web_invest_site/
  cp /home/test/daum_stock_crawling.sh /home/test/git/web_invest_site/
  cp /home/test/kiwoom_daily_report.sh /home/test/git/web_invest_site/
  cp /home/test/news_crawling.sh /home/test/git/web_invest_site/
  cp /home/test/finance_analysis.sh /home/test/git/web_invest_site/
  cp -rf /home/test/log /home/test/git/web_invest_site/ 
  cp -rf /home/test/invest_git_upload.sh /home/test/git/web_invest_site/


