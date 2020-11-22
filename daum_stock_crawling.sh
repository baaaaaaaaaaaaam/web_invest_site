echo "daum_stock_crawling" >> /home/test/log/daum_finance_$(date +\%y\%m\%d).log

cd /var/www/html/web/invest_crawler/invest_crawler/

~/.local/bin/scrapy crawl daum_kosdaq >> /home/test/log/daum_stock_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl daum_kospi >> /home/test/log/daum_stock_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl daum_kospi200 >> /home/test/log/daum_stock_$(date +\%y\%m\%d).log
echo "daum_stock finish" >> /home/test/log/daum_finance_$(date +\%y\%m\%d).log
