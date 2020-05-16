import urllib.request

def linkDingyang():
    url = 'http://dingyang.net'
    try:
        response = urllib.request.urlopen(url,timeout=3)
    except urllib.error.URLError:
        print(u"url error")
        exit()
    with open('./dingyangnet.txt','wb') as fp:
        fp.write(response.read())
    print('ok')

if __name__ == '__main__':
    linkDingyang()