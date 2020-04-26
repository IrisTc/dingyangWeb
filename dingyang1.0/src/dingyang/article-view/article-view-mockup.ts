import { ArticleDetail } from './article-view'

const content = `11月超跌低价股掀起\`涨停潮\`，随着**监管强化**，~~前期龙头冲锋结束~~，后一阶段将进入到个股补涨循环，大盘依然以*阶段震荡*为主。

# 标题1

[习主席](https://github.com/miaolz123/vue-markdown)在进博会上宣布设立科创板，推进注册制。

## 标题2

科创板的实质是扩容。对于科创股而言，业绩要求应该放宽，只要前景好，业绩亏损也可以上市。像在美国股市登陆的拼多多、去哪儿就是如此。按照原来的标准，这些三年亏损的公司即使上市，也会被ST。

### 标题3

- 亏损股可以上市放开了口子，这就为垃圾股启动提供了环境。在爆仓股中，基本面恶化的股票跌的最凶。但是科创一来，业绩亏损已经不是问题，因此越是没有基本面的股票涨幅越猛。随着监管介入，超跌低价股的第一波猛炒结束。
- 没有基本面的股票能够高位震荡，那么还有题材和基本面的低价股就被封杀了下跌空间，个股炒作进入分化阶段。经过一轮熊市清洗，大多数股票进入低价股序列，挨个进入补涨。
  1. 大盘在维稳力量监控下，还要保住2500点以上的成果。因此后面阶段的大盘，将走出震荡模式。跌一阵，就有资金进场带来赚钱效应；涨几天，就会有资金借势退出。只要把握好个股的弹性，机会还是非常丰富的。
  2. 由此看到，注册制并非是坏事。将来市场真正推行注册制时，会带来更大的行情。

> 引用文本


# 券商行情结束

从证监会对机构扣上“野蛮人”的帽子开始，市场资金就开始进入撤退状态。肖刚时代，证监会请马云来进行培训。意味着创业板崛起。当前改变强监管政策，将使资金继续蜂拥而进，并且题材股大行其道。

只有上涨才会带来信心。在高层关注股市波动情况下，此轮介入股市的维稳力量实力非同小可，券商股借势猛攻，成功点燃行情启动线索。银行保险迅速跟进，将大盘带动到2700点高度，补掉了10月中旬的跳空缺口。

券商股龙头由小盘券商股组成，连续涨停树立了榜样，吸引场外游资返场照抄涨停模式，超跌股掀起涨停潮。凡是跌幅达到60%以上的股票，基本上拥有过涨停。

由于券商龙头已经完成翻番，券商股行情已经走完。后市个股进入分化演绎阶段。

\`\`\`JSON
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "noImplicitAny": true,
    "strictNullChecks": true,
    "sourceMap": true,
    "outDir": "docs/",
    "allowJs": false
  }
}
\`\`\`

# 贸易战已无影响

贸易战虽未结束，但是画上了休止符。股市以大阳线热烈欢迎谈判结果。11月末的下跌似乎是为这根大阳线腾出空间。

打贸易战的目的是为了不打贸易战。此次斗争的结果，在我国放开市场、降低税率方面是有积极意义的，老百姓未来会享受到更多的实惠。

通过本次谈判，贸易战的关税惩罚都已经亮明底牌，今后无论是什么结果，都已经在预期范围之内。可以说贸易战对股市的影响已经终结。今后大盘何时再度启动，要看加杠杆何时开启。

中央既定方针是去杠杆，要坚持原则，忍住阵痛。因此大盘在上行中有减持压力，在下行中有政策底托住，未来一段时间市场大盘以震荡为主。

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
Content in the 3rd column | Content in the 3rd column

`
const description = '11月超跌低价股掀起涨停潮，随着监管强化，前期龙头冲锋结束，后一阶段将进入到个股补涨循环，大盘依然以阶段震荡为主。'
const coverUrl = '1.jpg'
export const getArticleMockup = async (): Promise<ArticleDetail[]> => {
  const items = [
    {
      title: '个股分化演绎1',
      date: new Date('2019-06-09'),
      id: 1,
      description,
      content,
      coverUrl,
    },
  ]
  for (let i = 2; i < 15; i++) {
    items.push({
      title: `个股分化演绎${i}`,
      date: new Date('2019-06-10'),
      id: i,
      description,
      content,
      coverUrl,
    })
  }
  return items
}