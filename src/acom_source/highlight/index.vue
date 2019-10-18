<template>
    <span :title="text" v-html="highlight"></span>
</template>
<style lang="scss" src="./index.scss"></style>
<script>
    class Ranges{
        constructor(){
            this._ranges = [];
        }
        add(range){
            this._ranges.push(range);

        }
        getRanges(){
            var ranges = this._ranges;
            var _ranges = [];
            ranges.forEach(function (rge) {
                var exist = false;
                _ranges = _ranges.filter(function (_rge) {
                    if(rge.start <= _rge.start && rge.end >= _rge.end){
                        return false;
                    }
                    if(_rge.start <= rge.start && _rge.end >= rge.end){
                        exist = true;
                    }
                    return true;
                });
                if(!exist){
                    _ranges.push(rge);
                }
            });
            ranges = _ranges.sort(function (v1,v2) {
                if(v1.start > v2.start){
                    return 1;
                }else if(v1.start < v2.start){
                    return -1;
                }
                return 0;
            });

            _ranges = [];
            for(var i = 0;i < ranges.length;){
                let rge = ranges[i];
                for(var j = i + 1;j < ranges.length;j++){
                    var _rge = ranges[j];
                    if(_rge.start <= rge.end + 1){
                        rge.end = _rge.end;
                        i++;
                    }
                }
                _ranges.push(rge);
                i++;
            }
            return _ranges;
        }
    }
    export default {
        name:'mg-highlight',
        props:{
            keyword:{
                type:[String,Array],
                default:function () {
                    return '';
                }
            },
            text:{
                type:[String,Number],
                default:''
            },
            ignoreCase:{
                type:Boolean,
                default:true
            }
        },
        data: function () {
            return {

            };
        },
        computed:{
            highlight: function () {
                var text = String(this.text) || '';
                var keywords = this.keyword || [];
                if(keywords && !(keywords instanceof Array)){
                    keywords = [keywords];
                }

                if(!text || keywords.length === 0){
                    return text;
                }

                keywords = keywords.map(function (keyword) {
                    return keyword.replace(/(\?|\(|\)|\.|\+)/g,'\\$1');
                });

                var options = ['g'];
                if(this.ignoreCase){
                    options.push('i');
                }

                var ranges = new Ranges();
                keywords.forEach(function (keyword) {
                    var regexp = keyword;
                    try{
                        regexp = new RegExp(keyword,options.join(''));
                    }catch(e){
                        console.error(e);
                    }
                    text.replace(regexp,function (all,index) {
                        ranges.add({
                            start:index,
                            end:index + all.length - 1
                        });
                        return all;
                    });
                });
                ranges = ranges.getRanges();
                var texts = [];
                ranges.forEach(function (range,index) {
                    var subText = text.slice(range.start,range.end + 1);
                    if(index === 0){
                        if(range.end > 0){
                            texts.push({
                                text:text.slice(0,range.start)
                            });
                        }
                    }else{
                        let _range = ranges[index - 1];
                        if(range.start > _range.end){
                            texts.push({
                                text:text.slice(_range.end + 1,range.start)
                            });
                        }
                    }
                    texts.push({
                        highlight:true,
                        text:subText
                    });
                });
                if(ranges.length === 0){
                    return text;
                }
                var range = ranges[ranges.length - 1];
                if(range.end < text.length - 1){
                    texts.push({
                        text:text.slice(range.end + 1)
                    });
                }

                texts = texts.map(function (item) {
                    var text = item.text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                    if(!item.highlight){
                        return text;
                    }
                    return '<i class="mg-highlight">' + text + '</i>';
                });

                return texts.join('');
            }
        }
    }
</script>