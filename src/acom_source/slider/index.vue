<template src="./comp.html"></template>
<style lang="scss" src="./comp.scss"></style>
<script>
    var colors = ['#ef7164','#eea95e','#efcf68','#6fb8ef','#88c966'];
    function normalizeBlockFormat(val) {
        val = 100 * val;
        val = Math.round(val);
        return val + '%';
    }
    function blockFormat(val) {
        if(this.normalize){
            return normalizeBlockFormat(val);
        }
        return val.toFixed(2);
    }
    function isNumber(v) {
        return typeof v === 'number';
    }
    export default {
        name:'mg-slider',
        props:{
            title:{
                type:String,
                default:''
            },
            maxTitle:{
                type:String,
                default:'高'
            },
            minTitle:{
                type:String,
                default:'低'
            },
            colors:{
                type:Array,
                default:function () {
                    return colors;
                }
            },
            value:{
                type:Array,
                default:function () {
                    return [];
                }
            },
            sliderCount:{
                type:Number,
                default:5
            },
            options:{
                type:Array,
                default:function () {
                    return [0,0.25,0.5,0.75,1];
                }
            },
            disperse:{
                type:Boolean,
                default:true
            },
            blockCaption:{
                type:Function,
                default:blockFormat
            },
            normalize:{
                type:Boolean,
                default:false
            }
        },
        data: function () {

            var _data = {
                _value:this.value,
                indicator:{
                    max:0,
                    min:0,
                    maxHeight:0
                },
                handler:{
                    mouseDown:null,
                    mouseMove:null,
                    mouseUp:null,
                    _mouseDown:null,
                    _mouseMove:null,
                    _mouseUp:null
                }
            };
            return _data;
        },
        computed:{
            values:function () {
                return this.options.map(function (option) {
                    if(isNumber(option)){
                        return {
                            name:option,
                            value:option
                        };
                    }
                    return option;
                }).sort(function (v1,v2) {
                    if(v1.value > v2.value){
                        return 1;
                    }else if(v1.value < v2.value){
                        return -1;
                    }
                    return 0;
                });
            },
            reverseValues:function () {
                return [].concat(this.values).reverse();
            },
            max:function () {
                return this.values[this.values.length - 1].value;
            },
            min:function () {
                return this.values[0].value;
            },
            maxValue: function () {
                var indicator = this.indicator;
                return indicator.max / indicator.maxHeight;
            },
            minValue: function () {
                var indicator = this.indicator;
                return indicator.min / indicator.maxHeight;
            },
            maxCaption: function () {
                var value = this.maxValue;
                return this.applyBlockFormat(value);
            },
            minCaption: function () {
                var value = this.minValue;
                return this.applyBlockFormat(value);
            }
        },
        mounted: function () {

            var valPos = this.valuePosition();
            var maxPos = valPos[1];
            var minPos = valPos[0];

            var indicator = this.indicator;
            var indicatorEl = this.$refs['indicator'];
            var indicatorMax = this.$refs['indicatorMax'],
                indicatorMin = this.$refs['indicatorMin'];

            indicatorMax._indicator = indicatorMin._indicator = true;
            indicatorMax._isMax = true;
            indicatorMin._isMin = true;

            var maxHeight = indicatorEl.clientHeight;
            indicator.max = maxHeight * maxPos;
            indicator.maxHeight = maxHeight;

            indicator.min = maxHeight * minPos;
            var handler = this.handler;
            var current = {
                pos:null
            };
            function getPos(e){
                return {
                    x:e.pageX || e.clientX,
                    y:e.pageY || e.clientY
                };
            }
            handler.mouseDown = function (e) {
                var target = e.target;
                if(!target._indicator){
                    return;
                }
                var _indicator = target._isMax ? indicatorMax : indicatorMin;
                var bound = _indicator.getBoundingClientRect();
                var panelBound = indicatorEl.getBoundingClientRect();
                var ePos = getPos(e);
                current.pos = {
                    baseY:panelBound.top,
                    baseHeight:panelBound.height,
                    height:bound.height,
                    x:bound.left - ePos.x,
                    y:bound.top - ePos.y
                }

                current.isMax = target._isMax;
                current.isMin = target._isMin;
            };
            handler.mouseMove = function (e) {
                if(!current.pos){
                    return;
                }
                var ePos = getPos(e);
                var pos = current.pos;
                var top = pos.y + ePos.y - pos.baseY;
                var bottom = pos.baseHeight - top;
                if(current.isMax){
                    var max = bottom - pos.height;
                    max = Math.max(0,max);
                    max = Math.max(max,indicator.min);
                    max = Math.min(max,maxHeight);
                    indicator.max = max;
                }else{
                    var min = bottom;
                    min = Math.max(0,min);
                    min = Math.min(min,indicator.max);
                    min = Math.min(min,maxHeight);
                    indicator.min = min;
                }
            };
            handler.mouseUp = function () {
                current = {};
            };
            indicatorEl.addEventListener('mousedown',handler.mouseDown);
            document.body.addEventListener('mousemove',handler.mouseMove);
            document.body.addEventListener('mouseup',handler.mouseUp);
        },
        beforeDestroy: function () {
            var indicatorEl = this.$refs['indicator'];
            var handler = this.handler;
            indicatorEl.removeEventListener('mousedown',handler.mouseDown);
            document.body.removeEventListener('mousemove',handler.mouseMove);
            document.body.removeEventListener('mouseup',handler.mouseUp);
        },
        watch:{
            'indicator.max':function () {
                var values = [].concat(this._value);
                var max = this.min + this.maxValue * (this.max - this.min);
                values[1] = max;
                values = this.ensureValue(values);
                this._value = values;
                this.$emit('input',values);
                this.$emit('change',values);
            },
            'indicator.min':function () {
                var values = [].concat(this._value);
                var min = this.min + this.minValue * (this.max - this.min);
                values[0] = min;
                values = this.ensureValue(values);
                this._value = values;
                this.$emit('input',values);
                this.$emit('change',values);
            },
            value:function () {
                this._value = this.value;
                var indicator = this.indicator;
                var indicatorEl = this.$refs['indicator'];
                var maxHeight = indicatorEl.clientHeight;
                var valPos = this.valuePosition();
                var maxPos = valPos[1];
                var minPos = valPos[0];
                indicator.max = maxHeight * maxPos;
                indicator.min = maxHeight * minPos;
            }
        },
        methods: {
            ensureValue:function (value) {
                var values = [].concat(value || this._value || []);
                if(!isNumber(values[0]) || values[0] < this.min){
                    values[0] = this.min;
                }
                if(!isNumber(values[1]) || values[1] > this.max){
                    values[1] = this.max;
                }
                return values;
            },
            valuePosition:function () {
                var values = this.ensureValue();
                var distance = this.max - this.min;
                var maxPos = (values[1] - this.min) / distance;
                var minPos = (values[0] - this.min) / distance;
                return [minPos,maxPos];
            },
            getSliderBg: function (i) {
                var colors = this.colors;
                return colors[i % colors.length];
            },
            sliderHeight: function (option,index) {
                var min = this.min,
                    max = this.max;
                var value = option.value;
                var values = this.reverseValues;
                if(index < values.length){
                    value -= values[index].value;
                }else{
                   value = 0;
                }
                return 100 * value / (max - min) + '%';
            },
            executeBlockCaption:function (val) {
                var blockCaption = this.blockCaption;
                if(typeof blockCaption === 'function'){
                    val = blockCaption.bind(this)(val);
                }
                return val;
            },
            applyBlockFormat:function (ratio) {
                var val = this.min + ratio * (this.max - this.min);
                return this.executeBlockCaption(val);
            }
        }
    }
</script>