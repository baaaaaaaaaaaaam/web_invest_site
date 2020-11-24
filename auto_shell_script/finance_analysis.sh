echo "finance_analysis" >> /home/ubuntu/log/finance_analysis_$(date +\%y\%m\%d).log
cd /var/www/html/invest_crawler/
/usr/local/bin/scrapy crawl finance_analysis >> /home/ubuntu/log/finance_analysis_$(date +\%y\%m\%d).log
echo "finance_analysis finish" >> /home/ubuntu/log/finance_analysis_$(date +\%y\%m\%d).log

