import scrapy

from invest_crawler.items import InvestCrawlerItem
from selenium import webdriver
import time
from scrapy.selector import Selector
from method import insert_db
from time_type import before_minute,time_separate_check

# 한국경제
class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="news1"
    allowed_domains=["http://hankyung.com/"]
    start_urls=["https://www.hankyung.com/finance/0104"]

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
        rows= selector.xpath('//*[@id="container"]/div[1]/div[1]/ul/li')

        items=[]
        for row in rows:
           
            item=InvestCrawlerItem()
            item['title']=row.xpath('./div[1]/h3/a/text()').extract()

            # 시간 형식 통일 작업
            tmp_time=row.xpath('./div[2]/span/text()').extract()
            result_time=time_separate_check("yyyy.mm.dd",tmp_time[0])
            item['issue']=result_time
    
            tmp_img=row.xpath('./div[1]/span/a/img/@src').extract()
            
            if not tmp_img:
                 item['imgPath']=''
            else:
                item['imgPath']="http:"+tmp_img[0]
            item['urlPath']=row.xpath('./div[1]/h3/a/@href').extract()
            item['newspaper']="한국경제"
            items.append(item)
            # 로그를 남길려면 yield로 리턴해야함 
            yield item
        items.reverse()
     
        try:
            insert_db(items,"한국경제")
        finally:
            self.browser.quit()
        