<template>
    <div class="mg-body-cell mg-table-cell" @click="selectCell"><slot></slot></div>
</template>
<script>
    export default {
        name:'mg-table-cell',
        props:{
            value:{}
        },
        methods:{
            selectCell:function(){
                this.$emit('click',this.value);
            }
        }
    }
</script>