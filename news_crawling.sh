echo "news_crawling" >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log

cd /var/www/html/web/invest_crawler/invest_crawler/

 scrapy crawl news1 >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log
 scrapy crawl news2 >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log
 scrapy crawl news3 >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log
 scrapy crawl news4 >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log
 scrapy crawl news5 >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log
 scrapy crawl news6 >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log

echo "news_crawling finish" >> /home/test/log/news_crawling_+$(date +\%y\%m\%d).log
