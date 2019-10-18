<template src="./comp.html"></template>
<style lang="scss"  src="./comp.scss"></style>
<script>
    import MgSelectList from './list';
    import { indexOf,matchTree } from "./util";
    var compId = (function () {
        var i = 1;
        return function () {
            return 'mg-select-' + (i++);
        }
    })();
    var selectCompId = null;
    export default {
        name: 'mg-select',
        components:{
            'mg-select-list':MgSelectList
        },
        props:{
            maxHeight:{
                type:String
            },
            identify:{
                type:String,
                default:'id'
            },
            disableCollapse:{
                type:Boolean,
                default:false
            },
            multi:{
                type:Boolean,
                default:false
            },
            filter:{
                type:Boolean,
                default:false
            },
            display:{
                type:String,
                default:'name'
            },
            initCollapse:{
                type:Boolean,
                default:true
            },
            items:{
                type:Array,
                default: function () {
                    return [];
                }
            },
            value:{
                type:Array,
                default:function () {
                    return []
                }
            },
            iconPosition:{
                type:String,
                default:'right'
            },
            placeholder: {
                type: String,
                default: ''
            },
            fixed:{
                type:Boolean,
                default:false
            },
            clickRemove:{
                type:Boolean,
                default:false
            }
        },
        data: function () {
            var _data = {
                compId:compId(),
                collapse:this.initCollapse,
                keyword:'',
                fixedLayout:this.fixed,
                select:[]
            };
            if(this.value){
                _data.select = _data.select.concat(this.value);
            }
            if(!this.multi){
                _data.select.splice(1);
            }
            return _data;
        },
        methods:{
            isSelect: function (item) {
                var selects = this.select;
                if(!selects){
                    return false;
                }
                if(!(selects instanceof Array)){
                    selects = [selects];
                }
                return indexOf(selects,item,this.identify) >= 0;
            },
            removeKeyword: function () {
                this.keyword = '';
            },
            toggleCollapse: function () {
                if(this.disableCollapse){
                    return;
                }
                this.collapse = !this.collapse;
                if(this.fixedLayout && !this.collapse){
                    var timeout = () => {
                        var pop = this.$refs['pop'];
                        if(!pop){
                            setTimeout(timeout,100);
                        }else{
                            this.resizeLayout();
                        }
                    };
                    timeout();
                }
            },
            click: function () {
                selectCompId = this.compId;
            },
            toggleSelect: function (item) {
                var selects = this.select || [];
                if(!(selects instanceof Array)){
                    selects = [selects];
                }
                var index = indexOf(selects,item,this.identify);
                if(index >= 0){
                    if(this.multi || this.clickRemove){
                        selects.splice(index,1);
                    }
                }else{
                    if(this.multi){
                        selects.push(item);
                    }else{
                        selects.splice(0,selects.length,item);
                        if(!this.disableCollapse){
                            this.collapse = true;
                        }
                    }

                }
                this.select = selects;
                this.$emit('input',selects);
                this.$emit('change',this.select);
            },
            resizeLayout:function(){
                if(!this.fixedLayout || this.collapse){
                    return;
                }
                var el = this.$refs['el'],
                    pop = this.$refs['pop'];
                if(!pop){
                    return;
                }
                var bound = el.getBoundingClientRect();
                var parent = pop;
                var relPanel = null;
                while((parent = parent.parentNode) && parent !== document.body){
                    if(parent.nodeType !== 1){
                        continue;
                    }
                    var transform = window.getComputedStyle(parent).transform;
                    if(transform !== 'none'){
                        relPanel = parent;
                        break;
                    }
                }
                var top = bound.top,left = bound.left;
                if(relPanel){
                    var relBound = relPanel.getBoundingClientRect();
                    top -= relBound.top;
                    left -= relBound.left;
                }
                pop.style.top = (bound.height + top) + 'px';
                pop.style.left = left + 'px';
                pop.style.width = bound.width + 'px';
                pop.style.opacity = 1;
            }
        },
        watch:{
            keyword: function (keyword) {
                if(!keyword){
                    keyword = '';
                }
                matchTree(this.items,keyword);
            },
            value:function () {
                var value = this.value || [];
                this.select = value;
                if(!this.multi){
                    if(this.select.length > 1){
                        this.select.splice(1);
                    }
                }
            }
        },
        mounted: function () {
            this.collapseBox = () => {
                if(this.disableCollapse){
                    return;
                }
                if(selectCompId === this.compId){
                    selectCompId = null;
                }else{
                    this.collapse = true;
                }
            };
            document.body.addEventListener('mousedown', this.collapseBox);

            if(!this.fixedLayout){
                return;
            }
            this.resizePop = () => {
                this.resizeLayout();
            };
            document.body.addEventListener('scroll', this.resizePop,true);
            window.addEventListener('resize', this.resizePop);
        },
        destroyed: function () {
            document.body.removeEventListener('mousedown', this.collapseBox);
            document.body.removeEventListener('scroll', this.resizePop);
            window.removeEventListener('resize', this.resizePop);
        }
    }
</script>
