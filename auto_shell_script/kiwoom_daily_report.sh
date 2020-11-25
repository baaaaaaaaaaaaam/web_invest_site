echo "kiwoom_daily_report start" >> /home/ubuntu/log/kiwoom_daily_report__$(date +\%y\%m\%d).log

cd /var/www/html/invest_crawler/

~/.local/bin/scrapy crawl kiwoom_daily_report >> /home/ubuntu/log/kiwoom_daily_report_$(date +\%y\%m\%d).log


echo "kiwoom_daily_report finish" >> /home/ubuntu/log/kiwoom_daily_report_$(date +\%y\%m\%d).log


