echo "daum_stock_crawling" >> /home/ubuntu/log/daum_finance_$(date +\%y\%m\%d).log

cd /var/www/html/invest_crawler/

/usr/local/bin/scrapy crawl daum_kosdaq >> /home/ubuntu/log/daum_stock_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl daum_kospi >> /home/ubuntu/log/daum_stock_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl daum_kospi200 >> /home/ubuntu/log/daum_stock_$(date +\%y\%m\%d).log
echo "daum_stock finish" >> /home/ubuntu/log/daum_finance_$(date +\%y\%m\%d).log
