<template>
    <i class="mdi icon" :class="iconClass"></i>
</template>
<style lang="stylus" scoped>
.icon {
  line-height: 1;
  font-size: inherit;
  color: inherit;
  margin-top: 8px;
}
</style>
<script>
import "../style/font/css/materialdesignicons.min.css"
export default({
    name: "icon-component",
    props: ['name', 'margin'],
    computed: {
        iconClass() {
            return [
                'mdi-' + this.name,
                this.margin,
            ];
        }
    }
});
</script>