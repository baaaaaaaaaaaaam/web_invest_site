echo "kiwoom_daily_report start" >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log

cd /var/www/html/web/invest_crawler/

~/.local/bin/scrapy crawl kiwoom_daily_report >> /home/test/log/kiwoom_daily_report_$(date +\%y\%m\%d).log


echo "kiwoom_daily_report finish" >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log


