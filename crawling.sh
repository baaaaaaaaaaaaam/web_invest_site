

echo "crawling start" >> /home/test/log/$(date +\%y\%m\%d).log

cd /var/www/html/web/invest_crawler/invest_crawler/

 scrapy crawl daum_kosdaq >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl daum_kospi >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl daum_kospi200 >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl news1 >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl news2 >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl news3 >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl news4 >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl news5 >> /home/test/log/$(date +\%y\%m\%d).log
 scrapy crawl news6 >> /home/test/log/$(date +\%y\%m\%d).log

echo "crawling finish" >> /home/test/log/$(date +\%y\%m\%d).log
