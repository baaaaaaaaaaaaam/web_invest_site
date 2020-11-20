echo "finance_analysis" >> /home/test/log/finance_analysis_$(date +\%y\%m\%d).log
cd /var/www/html/web/invest_crawler/invest_crawler/
~/.local/bin/scrapy crawl finance_analysis >> /home/test/log/finance_analysis_$(date +\%y\%m\%d).log
echo "finance_analysis finish" >> /home/test/log/finance_analysis_$(date +\%y\%m\%d).log

