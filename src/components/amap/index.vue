<template src="./index.html"></template>
<style lang="less" src="./index.less"></style>
<script>
    import mainMixin from './main-mixin'
    import selectionMixin from './selection-mixin'
    import trackMixin from './track-mixin'
    import markerMixin from './marker-mixin'
    export default {
        mixins:[mainMixin,selectionMixin,trackMixin,markerMixin]
    }
</script>
