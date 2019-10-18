<template>
    <div class="mg-table-row" @click="selectRow"><slot></slot></div>
</template>
<script>
    export default {
        name:'mg-table-row',
        props:{
            value:{}
        },
        methods:{
            selectRow:function(){
                this.$emit('click',this.value);
            }
        }
    }
</script>