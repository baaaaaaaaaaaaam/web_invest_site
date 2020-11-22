from datetime import datetime, timedelta, timezone 

# 서울 경제
# 기사 등록시간이 0분부터 30분 전 사이에는  X분 전으로 표시되고 30분 이후부터는 2020.11.05 18:11 형태로 표시된다
# 결과로는 시간 정규화 형태인 2020-11-06 08:03:00 datetime 형태로 반환할 것이다
def before_minute(input_time):
    minute=input_time.split("분")  #30분전 을 split 하여 30 만 추출한다
    tmp_time=datetime.now() 
    result_time =tmp_time - timedelta(minutes=int(minute[0]))  # 추출한 30을 현재 크롤링 하는 시점의 시간에서 뺀다.
    # result_time은 실제 글이 작성된 시간이다. (ex  2020-11-06 13:32:28.129970 )
    result_time=str(result_time)
    return_value=result_time.split('.')    # 2020-11-06 13:32:28.129970  에서 .129970 을 버리고 2020-11-06 13:32:28 만 사용한다 
    return return_value[0]



# 신문사마다 저장하는 시간의 형태가 다르다 
# ex( 2020.11.11 , 20.11.11 , 11.11 ,2020-11,11 , 11-11 )
# 서울경제 2020.11.05 18:11
# 이 문자들을 입력받아 하나의 2020-11-06 13:32:28 의 형태로 반환할것이다.
def time_separate_check(time_separate,time):
    
    if time_separate == "yyyy.mm.dd" :
        return_time=time_parsing(time)
    elif time_separate == "yyyy-mm-dd" :
        return_time=time_parsing1(time)
    elif time_separate == "mm-dd" :
        return_time=time_parsing2(time)
    

    return str(return_time)


def time_parsing(item):
    save_time=item.split(' ')
    date = save_time[0].split('.')
    time=save_time[1].split(':')
    result_time = datetime(int(date[0]), int(date[1]), int(date[2]),int(time[0]),int(time[1])) 
    return result_time


def time_parsing1(item):
    save_time= item.split(" ")
    date = save_time[0].split('-')
    time=save_time[1].split(':')
    result_time = datetime(int(date[0]), int(date[1]), int(date[2]),int(time[0]),int(time[1])) 
    return result_time

def time_parsing2(item):
    save_time= item.split(" ")
    date = save_time[0].split('-')
    time=save_time[1].split(':')
    result_time = datetime(datetime.now().year, int(date[0]), int(date[1]),int(time[0]),int(time[1])) 
    return result_time