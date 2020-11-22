# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class InvestCrawlerItem(scrapy.Item):

    title =scrapy.Field()
    imgPath=scrapy.Field()
    urlPath=scrapy.Field()
    issue=scrapy.Field()
    newspaper=scrapy.Field()

    # define the fields for your item here like:
    # name = scrapy.Field()
    # pass


class Finance_point(scrapy.Item):
    name =scrapy.Field()
    date =scrapy.Field()
    point=scrapy.Field()
    tmp=scrapy.Field()
    contrast=scrapy.Field()
    upNdown=scrapy.Field()
    amount=scrapy.Field()
    ant=scrapy.Field()
    foreigner=scrapy.Field()
    organ=scrapy.Field()
    

class kiwoom_daily_report(scrapy.Item):
    file_urls = scrapy.Field()
    files = scrapy.Field()