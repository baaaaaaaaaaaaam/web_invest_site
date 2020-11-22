from datetime import datetime, timedelta, timezone 

import pymysql
# 날짜시간 사이의 차이 계산 





# save_time="2020.10.30 10:18"

# save_time= save_time.split(' ')
# print(a)
# date = save_time[0].split('.')
# print(date)
# time=save_time[1].split(':')
# print(time)
# TimeOne = datetime.now() 
# TimeTwo = datetime(2020,10,10,11,30) 
# TimeInterval = TimeOne - TimeTwo 

# print("타입확인")  
# print(type(TimeOne)) 
# print(type(TimeTwo)) 
# print(type(TimeInterval)) 
# print("날짜 간의 차이 계산")  
# print(TimeOne) 
# print(TimeTwo) 
# print(TimeInterval) 
# print(TimeInterval.days) 
# print(TimeInterval.seconds) 
# print(TimeInterval.seconds/3600)
# print("년, 월, 일, 시간, 분, 초 단위의 차이를 계산 ") 

# print(TimeOne.year - TimeTwo.year) 
# print(TimeOne.month - TimeTwo.month) 
# print(TimeOne.day - TimeTwo.day) 
# print(TimeOne.hour - TimeTwo.hour) 
# print(TimeOne.minute - TimeTwo.minute) 
# print(TimeOne.second - TimeTwo.second) 
# print(type(TimeOne.year - TimeTwo.year)) 
# print(type(TimeOne))
# 날짜 더하기와 빼기 AddTime = TimeOne + timedelta(days=100) SubtractTime = AddTime - timedelta(days=100) print(TimeOne) print(AddTime) print(SubtractTime) print(type(AddTime))

text = '2020-11-18 / hit : 1,275'
_text=text.split('/')
print(_text)
issue = _text[0].strip()
print(issue)