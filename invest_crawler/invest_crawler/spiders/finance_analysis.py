import scrapy

from invest_crawler.items import InvestCrawlerItem
from selenium import webdriver
import time
from scrapy.selector import Selector
from method import finance_analysis ,insert_finance_analysis ,check_date1

# php 파일 실행시키는용도 
import os

class investSpider(scrapy.Spider):
    # scrapy crawl invest -o test.csv  로 실행함
    name="finance_analysis"
    allowed_domains=["https://www.onestopsamsungpop.co.kr/"]
    start_urls=["https://newpoptv.samsungpop.com/html/board/ContentListPage.jsp?contentCd=&currPage=&boardType=IN_INVEST_INFO&schCateCd=1607011641125593H6N6&schTab=1607011641125593H6N6"]


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
        time.sleep(2)
        
        # 디비에 저장된 가장 최신 날짜 분석물 가져오기
        # 값이 있는경우 recently_date[0][0]
        # 값이 없는경우 if not recently_date

        recently_date = finance_analysis()
        

        print(recently_date)
        # 파일명 ( 디비에 저장하고 검사 후 중복이면 다운로드안함, 중복아니면 다운로드 )
        try:
             for i in range(7,2,-1):
                    _tmp='//*[@id="contents"]/div[2]/div/div[3]/div/a['+str(i)+']'
                    self.browser.find_element_by_xpath(_tmp).click()
                    time.sleep(2)
                    for i in range(9, 0 , -1): 
                        
                        time_tmp='//*[@id="contents"]/div[2]/div/div[2]/div['+str(i)+']/div[2]/span'
                        issue = self.browser.find_element_by_xpath(time_tmp).text
                        
                        # 시간 정형화
                        _issue=issue.split('/')
                        save_time=_issue[0].strip()
                        
                        # 게시물 클릭
                        tmp = '//*[@id="contents"]/div[2]/div/div[2]/div['+str(i)+']/div[2]/h3/a'
                        time.sleep(1)
                        self.browser.find_element_by_xpath(tmp).click()
                        time.sleep(2)
                        # 프레임전환
                        self.browser.switch_to.frame('subframe')
                        # 제목추출
                        title = self.browser.find_element_by_xpath('/html/body/section/article/div[1]/h1').text
                        # 내용 추출
                        content = self.browser.find_element_by_xpath('/html/body/section/article/div[1]/h3').text
                        # url 추출
                        url=self.browser.current_url
                        # 뒤로가기 
                        self.browser.back()
                        time.sleep(2)
                        # db에저장 
                        if not recently_date:
                            print("무조건저장")
                            # 무조건 저장
                            insert_finance_analysis(title,content,save_time,url)
                        else:
                            # 크롤링한데이터가 더 최신 데이터이면 True , 아닌경우False 
                            #  ex ) 2020-11-11 < 2020-11-12  ==>True 
                            time_diff=check_date1(recently_date[0][0],save_time)
                            if time_diff:
                                print("신규데이터")
                                insert_finance_analysis(title,content,save_time,url)
                            else:
                                print("이미 저장된 데이터")

                        print(title,content,save_time,url)
                        time.sleep(2)
               
        
           

        finally:
            self.browser.quit()