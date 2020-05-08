import urllib.request

def linkDingyang():
    url = 'http://ts.tcualhp.cn/dingyang/#/home'
    try:
        response = urllib.request.urlopen(url,timeout=3)
    except urllib.error.URLError:
        print(u"url error")
        exit()
    with open('./dingyang_old.txt','wb') as fp:
        fp.write(response.read())
    print('ok')

if __name__ == '__main__':
    linkDingyang()