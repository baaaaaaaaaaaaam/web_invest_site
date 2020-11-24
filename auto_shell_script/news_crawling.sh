echo "news_crawling" >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log

cd /var/www/html/invest_crawler/

/usr/local/bin/scrapy crawl news1 >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl news2 >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl news3 >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl news4 >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl news5 >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log
/usr/local/bin/scrapy crawl news6 >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log

echo "news_crawling finish" >> /home/ubuntu/log/news_crawling_$(date +\%y\%m\%d).log
