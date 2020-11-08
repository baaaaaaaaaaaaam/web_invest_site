import scrapy
from invest_crawler.items import InvestCrawlerItem,Finance_point
from selenium import webdriver
import time
from scrapy.selector import Selector
from method import finance_poitnt_insert_db

# 서울증시
class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="daum_kospi200"
    allowed_domains=["https://www.daum.net/"]
    start_urls=["https://finance.daum.net/domestic/kospi200"]

    def __init__(self):
        scrapy.Spider.__init__(self)
        # chrome드라이버 절대경로
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('window-size=1920x1080')
        options.add_argument("disable-gpu")
        # options.add_argument("--disable-gpu")
        self.browser= webdriver.Chrome('/home/test/Downloads/chromedriver',chrome_options=options)

    def parse(self,response):
        self.browser.get(response.url)

        # 대기할 시간
        time.sleep(1)

        # 전체 데이터 불러와서 html에 저장
        html=self.browser.find_element_by_xpath('//*').get_attribute('outerHTML')
        selector=Selector(text=html)
        # 파싱
        rows= selector.xpath('//*[@id="boxDailyHistory"]/div[2]/div/table/tbody/tr')

                      
        items=[]
        for row in rows:
            item=Finance_point()
            item['name']="kospi200"
            item['date']=row.xpath('./td[1]/span/text()')[0].extract()
            item['point']=(row.xpath('./td[2]/span/text()')[0].extract()).replace(',','')
            item['tmp']=row.xpath('./td[3]/span/i/text()')[0].extract()
            item['contrast']=(row.xpath('./td[3]/span/text()')[0].extract()).replace(',','')
            item['upNdown']=(row.xpath('./td[4]/span/text()')[0].extract()).replace(',','')
            item['amount']=(row.xpath('./td[5]/span/text()')[0].extract()).replace(',','')
            item['ant']=(row.xpath('./td[7]/span/text()')[0].extract()).replace(',','')
            item['foreigner']=(row.xpath('./td[8]/span/text()')[0].extract()).replace(',','')
            item['organ']=(row.xpath('./td[9]/span/text()')[0].extract()).replace(',','')
            items.append(item)
            # 로그를 남길려면 yield로 리턴해야함 
            yield item
        items.reverse()
        try:
            finance_poitnt_insert_db(items,"daum_kospi200")
        finally:
            self.browser.quit()




