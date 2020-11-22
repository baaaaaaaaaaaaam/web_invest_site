import scrapy

from invest_crawler.items import InvestCrawlerItem
from selenium import webdriver
import time
from scrapy.selector import Selector
from method import insert_db
from time_type import before_minute,time_separate_check

# 한국증권신문-국내
class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="news3"
    allowed_domains=["http://www.ksdaily.co.kr/"]
    start_urls=["http://www.ksdaily.co.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm"]
    
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
        rows= selector.xpath('//*[@id="user-container"]/div[2]/div[2]/section/article/div[2]/section/div')

        domain="http://www.ksdaily.co.kr"

        items=[]
        for row in rows:
            item=InvestCrawlerItem()
            # 이미지 유무 검사 
            tmp_img=row.xpath('./div[1]/a/img/@src').extract()
            
            if not tmp_img:
                item['imgPath']=tmp_img
                item['title']=row.xpath('./div[1]/a/strong/text()').extract()
                item['urlPath']=domain+row.xpath('./div[1]/a/@href')[0].extract()
                tmp_time=row.xpath('./div[2]/text()').extract()
            else:
                item['imgPath']=domain+"/news/"+tmp_img[0]
                item['title']=row.xpath('./div[2]/a/strong/text()').extract()
                item['urlPath']=domain+row.xpath('./div[2]/a/@href')[0].extract()
                tmp_time=row.xpath('./div[3]/text()').extract()
            # 이미지가없는 파일의경우 div[2] , 이미지가 있는 경우 div[3]임
            split_tmp_time=tmp_time[0][len(tmp_time)-17:]
            result_time=time_separate_check("yyyy-mm-dd",split_tmp_time)
            item['issue']=result_time
            item['newspaper']="한국증권신문-국내"
            items.append(item)
            # 로그를 남길려면 yield로 리턴해야함 
            yield item
        items.reverse()
        try:
            insert_db(items,"한국증권신문-국내")
        finally:
            self.browser.quit()



