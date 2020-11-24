import scrapy

from invest_crawler.items import InvestCrawlerItem
from selenium import webdriver
import time
from scrapy.selector import Selector

from method import insert_db
from time_type import before_minute,time_separate_check

# 머니투데이
class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="news2"
    allowed_domains=["https://news.mt.co.kr/"]
    start_urls=["https://news.mt.co.kr/newsList.html?comd=7&pDepth=stock&pDepth1=sNews&pDepth2=Ftotal"]

    def __init__(self):
        scrapy.Spider.__init__(self)
        # chrome드라이버 절대경로
        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        options.add_argument('window-size=1920x1080')
        options.add_argument("disable-gpu")
        # options.add_argument("--disable-gpu")
        self.browser= webdriver.Chrome('/home/ubuntu/download/chromedriver',chrome_options=options)

    def parse(self,response):
        self.browser.get(response.url)

        # 대기할 시간
        time.sleep(1)

        # 전체 데이터 불러와서 html에 저장
        html=self.browser.find_element_by_xpath('//*').get_attribute('outerHTML')
        selector=Selector(text=html)
        # 파싱
        rows= selector.xpath('//*[@id="content"]/ul/li')


        items=[]
        for row in rows:
            item=InvestCrawlerItem()
            item['title']=row.xpath('./div/strong/a/text()').extract()
             

            tmp_time=row.xpath('./div/p/span/text()').extract()
            split_tmp_time=tmp_time[0][len(tmp_time)-17:]
            result_time=time_separate_check("yyyy.mm.dd",split_tmp_time)
            item['issue']=result_time
            item['imgPath']=row.xpath('./a/img/@src').extract()
            item['urlPath']=row.xpath('./div/strong/a/@href').extract()
            item['newspaper']="머니투데이"
            items.append(item)
            # 로그를 남길려면 yield로 리턴해야함 
            yield item
        items.reverse()
     
        try:
            insert_db(items,"머니투데이",)
        finally:
            self.browser.quit()
        


