import Vue from '../../core/vue/index.js';
export default Vue.extend({
    template: `
      <footer>
        <div class="logo">
          <img :src="logoPath" height="48">
          <span class="logo-text">Dingyang.net</span>
        </div>
        <div class="footer-text">
          Redesign Demos - Dingyang | 2019 © Grant Howard
        </div>
      </footer>
    `,
    props: ['logoPath'],
});
//# sourceMappingURL=footer.js.map