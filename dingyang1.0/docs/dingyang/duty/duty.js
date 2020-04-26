import Vue from '../../core/vue/index.js';
export default Vue.extend({
    components: {
        Icon: () => import('../icon/icon.js'),
    },
    template: /*html*/ `
    <article class="duty">
      <div class="header"><icon margin="right" name="triangle"></icon>信念使命</div>
      <p><strong>投资需要信仰。</strong></p>
      <p>
      长期以来，我们一直追随一个梦想，中华民族伟大复兴，再现国富民强、社会和谐稳定的贞观盛世，中华民族立志以崭新的面貌昭示世人。我们坚信，一个正在快速崛起、积极参与世界分工的开放中国，正迎来历史上千载难逢的发展机遇。
      </p>
      <p>
      投资是一种智慧的博弈。然而严酷的现实却是，对大部分甚至绝大部分投资者而言，股市并没有给他们带来财富，与短暂获利的喜悦相交替的是漫长熊途以及被套斩仓的痛苦。中小投资者作为股市中的弱势群体，需要关怀和慰藉，这是一种社会责任。我们深知，培育造血功能比直接输血更有益世人。因此，期望传播正确的思想与科学的方法，让投资成为投资者生命中快乐而健康的一部分，“传承投资智慧，播种希望工程”成为我们的重要使命。
      </p>
      <p>
      我坚信，正是腾飞的中国经济给了我一次历史性的机遇，回报社会也是义不容辞的责任。我们积极参加社会公益组织，凝聚更多的爱心人士一起参与到慈善事业，将来我们自社会的财富，回报到社会！这是人生的最高意义和境界。
      </p>
    </article>
  `,
});
//# sourceMappingURL=duty.js.map