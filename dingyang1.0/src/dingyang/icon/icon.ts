import Vue from '../../core/vue/index.js'

export default Vue.extend({
  template: /*html*/`<i class="mdi icon" :class="iconClass"></i>`,
  props: ['name', 'margin'],
  computed: {
    iconClass() {
      return [
        'mdi-' + this.name,
        this.margin,
      ]
    }
  }
})