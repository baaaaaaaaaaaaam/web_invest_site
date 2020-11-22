echo "news_crawling" >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log

cd /var/www/html/web/invest_crawler/invest_crawler/

~/.local/bin/scrapy crawl news1 >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl news2 >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl news3 >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl news4 >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl news5 >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log
~/.local/bin/scrapy crawl news6 >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log

echo "news_crawling finish" >> /home/test/log/news_crawling_$(date +\%y\%m\%d).log

