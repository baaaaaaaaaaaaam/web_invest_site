import scrapy
from invest_crawler.items import InvestCrawlerItem
from selenium import webdriver
import time
from scrapy.selector import Selector
from method import insert_db
from time_type import before_minute,time_separate_check

# 연합뉴스
class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="news5"
    allowed_domains=["https://www.yna.co.kr/"]
    start_urls=["https://www.yna.co.kr/economy/stock-market?site=navi_economy_depth02"]

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
        rows= selector.xpath('//*[@id="container"]/div/div/div[1]/section/div[1]/ul/li/div[not(@class="con ads-latest01")]')
      
                      
        items=[]
        for row in rows:
            item=InvestCrawlerItem()
            item['title']=row.xpath('./div[2]/a/strong/text()').extract()
            # 이미지가없는 파일의경우 div[2] , 이미지가 있는 경우 div[3]임

            # 시간 설정
            tmp_time=row.xpath('./div[1]/span[2]/text()').extract()
            result_time=time_separate_check("mm-dd",tmp_time[0])
            item['issue']=result_time
            
            tmp_img=row.xpath('./figure/a/img/@src').extract()
            if not tmp_img:
                item['imgPath']=tmp_img
            else:
                item['imgPath']="http:"+tmp_img[0]

         
            item['urlPath']="http:"+row.xpath('./div[2]/a/@href')[0].extract()
            item['newspaper']="연합뉴스"
            
            items.append(item)
            # 로그를 남길려면 yield로 리턴해야함 
            yield item
        items.reverse()
       
        try:
            insert_db(items,"연합뉴스",)
        finally:
            self.browser.quit()



