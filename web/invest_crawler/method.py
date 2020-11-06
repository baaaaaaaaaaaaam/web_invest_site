from datetime import datetime, timedelta, timezone 
import pymysql


# 년 월 일 시 분 비교 
# time1 :디비에 저장된 가장 최신 게시물의 게시 시간
# time2 : 크로링한 게시물의 게시 시간
def time_compare(t1,t2):

    # value 는 연산을 통해 얻은 숫자이다
    _t1= t1.split(" ")
    _date1 = _t1[0].split('-')
    _time1 = _t1[1].split(':')
    value1=calculate_date(_date1[0],_date1[1],_date1[2])

    _t2= t2.split(" ")
    _date2 = _t2[0].split('-')
    _time2 = _t2[1].split(':')
    value2=calculate_date(_date2[0],_date2[1],_date2[2])


    if value1 < value2:
        return True
    elif value1 == value2:
        if int(_time1[0]) < int(_time2[0]):
            return True
        elif int(_time1[0]) == int(_time2[0]):
            if int(_time1[1]) < int(_time2[1]):
                return True
                
    return False
# 년월일 을 곱셈하여 비교할수있게한다.
def calculate_date(year,month,day):

    value=int(year)*416
    value=value+int(month)*32
    value=value+int(day)
    return value


def check_date(saved_date,crawl_date):
    _saved_date=saved_date.split(".")
    saved=calculate_date(_saved_date[0],_saved_date[1],_saved_date[2])
    _crawl_date=crawl_date.split(".")
    crawl=calculate_date(_crawl_date[0],_crawl_date[1],_crawl_date[2])
    if saved < crawl:
        return True
    else:
        return False

    
    


def dbconn():
    db=pymysql.connect(
    user='invest', 
    passwd='akwldrk1', 
    host='localhost', 
    db='invest', 
    charset='utf8'
    )
    return db


# newspaper = 언론사 , time_separate = 시간 기록 형태 구분 , item =가져온 크롤링 데이터 
def insert_db(items,newspaper):
    db=dbconn()
    try:
        with db.cursor() as curs:
            # 크롤링한 데이터 데이터베이스에 넣기전 중복검사 하기( 가장 최신글 이후에 등록된 글만 저장 )

            # 한국경제 정보중 가장 최신에 등록된 게시글의 시간을 불러온다 
            sql = "select issue from news_crawling where newspaper=%s order by issue desc limit 1"
            curs.execute(sql,newspaper)
            rs = curs.fetchone()

            # 만약 처음으로 한국 경제 신문사에서 크롤링을 진행한다면 데이터베이스에 저장한 데이터가 없기때문에 
            # null 이 발생한다. 그런경우 당일 -1 ( 어제 ) 발행한 신문부터 크롤링 한다.
            if not rs:
                tmp_time=datetime.now()
                last_save_time =tmp_time - timedelta(days=5)
            else:
                last_save_time=rs[0]
            print("디비에 저장된 가장 최근 게시물 시간",last_save_time)
            # 불러온 시간과 item['issue'] 을 비교한다

            for item in items:
               
                insert_sava_time=item['issue']
             
                result_compare_time=time_compare(str(last_save_time),insert_sava_time)


                #  비교후 저장된 시간 이후에 등록된 게시글만 저장한다.
                if result_compare_time:
                    sql='insert into news_crawling (title,imgPath,urlPath,issue,newspaper) values (%s,%s,%s,%s,%s)'
                    # 이미지는 없을 수 있음으로 없을 경우 default 경로 설정해야할듯 
                    if not item['imgPath']:
                        item['imgPath']="not image"
                    # 실제 데이터 저장
                    curs.execute(sql,(item['title'],item['imgPath'],item['urlPath'],insert_sava_time,item['newspaper']))
                    db.commit()
                    print(item['newspaper'],insert_sava_time,"저장")
                else:
                    print(item['newspaper'],insert_sava_time,"저장안함")
                    
    finally:
        db.close()
        print("종료")

def finance_poitnt_insert_db(items,table_name):
    db=dbconn()
    try:
        with db.cursor() as curs:
            sql=""
            if table_name=="daum_kospi":
                sql = "select date from daum_kospi where name='kospi' order by date desc limit 1"
            elif table_name=="daum_kospi200":
                sql = "select date from daum_kospi200 where name='kospi200' order by date desc limit 1"
            elif table_name=="daum_kosdaq":
                sql = "select date from daum_kosdaq where name='kosdaq' order by date desc limit 1"
            curs.execute(sql)
            rs = curs.fetchone()
            saved_date=rs[0]
            print("디비에 저장된 가장 최근 날자",saved_date)
            for item in items:
                # 저장된 가장 최신 날자를 비교하여 불러온정보와 비교한다. 불러온 최신날자보다 이전에 작성된 글이면 저장하지 않는다.
                value = check_date(saved_date,item['date'])
                if value is True:
                    if item['name'] == 'kospi':
                        sql='insert into daum_kospi (name,date,point,tmp,contrast,upNdown,amount,ant,foreigner,organ) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                    elif item['name'] == 'kosdaq':
                        sql='insert into daum_kosdaq (name,date,point,tmp,contrast,upNdown,amount,ant,foreigner,organ) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                    elif item['name'] == 'kospi200':
                        sql='insert into daum_kospi200 (name,date,point,tmp,contrast,upNdown,amount,ant,foreigner,organ) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                    curs.execute(sql,(item['name'],item['date'],item['point'],item['tmp'],item['contrast'],item['upNdown'],item['amount'],item['ant'],item['foreigner'],item['organ']))
                    db.commit()
                    print(item['name'],item['date'],"저장")
                else:
                    print(item['name'],item['date'],"저장 안함")
    finally:
        db.close()
        print("종료")