import scrapy
from invest_crawler.items import InvestCrawlerItem
from selenium import webdriver
import time
from scrapy.selector import Selector
from method import insert_db
from time_type import before_minute,time_separate_check

# 서울증시
class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="news6"
    allowed_domains=["https://sedaily.com/"]
    start_urls=["https://sedaily.com/NewsList/GA01"]

    def __init__(self):
        scrapy.Spider.__init__(self)
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
        rows= selector.xpath('//*[@id="ContentForm"]/div/ul/li')
      
                      
        items=[]
        for row in rows:
            item=InvestCrawlerItem()

            item['imgPath']=row.xpath('./a/div[1]/span/img/@src').extract()


            domain="https://sedaily.com/"
            
            array=[]
            # 이미지가 없는경우 시간 위치는 div , 이미지가 있는경우 div[2] 
            if not item['imgPath']:
               
                item['title']=row.xpath('./a/div/h3/text()').extract()
                issue1 = row.xpath('./a/div/div[1]/span[2]/text()').extract()
                issue2 = row.xpath('./a/div/div[1]/span[3]/text()').extract()
                if not issue2:
                  
                    item['issue']=before_minute(issue1[0])
                else:
                    save_time = time_separate_check("yyyy.mm.dd",issue1[0]+" "+issue2[0])
                    item['issue']=save_time
            else:
                # 해당 사이트는 30분이내의 게시글은 30분전으로 표시하고 30분지난게시글은 년월일 과 시간,분,초 로 표시한다
                item['title']=row.xpath('./a/div[2]/h3/text()').extract()
                issue1 = row.xpath('./a/div[2]/div[1]/span[2]/text()').extract()
                issue2 = row.xpath('./a/div[2]/div[1]/span[3]/text()').extract()
                if not issue2:
                   item['issue']=before_minute(issue1[0])
                else:
                    save_time = time_separate_check("yyyy.mm.dd",issue1[0]+" "+issue2[0])
                    item['issue']=save_time
                    

            item['urlPath']=domain+row.xpath('./a/@href')[0].extract()
            item['newspaper']="서울경제"
            
            items.append(item)
         
            # yield item
        items.reverse()
      
        try:
            insert_db(items,"서울경제")
            
        finally:
            self.browser.quit()



