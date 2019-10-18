<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>
<script>
    import TableHeader from './header';
    import TableCell from './cell';
    import TableRow from './row';

    export { TableHeader }
    export  { TableCell }
    export { TableRow }

    function Rule(selector){
        if(!selector){
            throw new TypeError('param selector needed !');
        }
        this.selector = selector;
        this.attrs = {};
    }
    Rule.prototype.attr = function (name,val) {
        if(arguments.length === 1){
            return this.attrs[name];
        }
        this.attrs[name] = val;
    };
    Rule.prototype.toString = function () {
        var attrs = this.attrs;
        var texts = [];
        Object.keys(attrs).forEach(function (name) {
            texts.push(name + ':' + attrs[name] + ';');
        });
        return this.selector + '{' + texts.join('') + '}\n';
    };
    function bindEvent(el,context){
        var headerContent = el.querySelector('.mg-table-header .mg-header-content'),
            body = el.querySelector('.mg-table-body');

        body.addEventListener('scroll',  function() {
            headerContent.style.left = -body.scrollLeft + 'px';
            context.$emit('scroll',{
                scrollTop:body.scrollTop,
                scrollLeft:body.scrollLeft
            });
        });
    }
    function getWidth(el){
        return Math.max(el.clientWidth,el.offsetWidth);
    }
    function parseDomWidth(dom,styleName,styleValue){
        var _style = dom.style[styleName];
        dom.style[styleName] = styleValue;
        var width = getWidth(dom);
        dom.style[styleName] = _style;
        return width;
    }
    function parseMinWidth(cell){
        var minWidth = cell.getAttribute('min-width');
        if(minWidth){
            return parseInt(minWidth);
        }
    }
    function parseMaxWidth(cell){
        var maxWidth = cell.getAttribute('max-width');
        if(maxWidth){
            return parseInt(maxWidth);
        }
    }
    function parseWidth(cell){
        var w = cell.getAttribute('width');
        if(!w){
            return;
        }

        w = parseDomWidth(cell,'width',w);

        var minWidth = parseMinWidth(cell),
            maxWidth = parseMaxWidth(cell);

        if(minWidth){
            w = Math.max(minWidth,w);
        }
        if(maxWidth){
            w = Math.min(maxWidth,w);
        }

        return w;
    }
    function requestWidth(cells,width,w){
        w = w || 0;
        var allFail = true;
        var finished = cells.some(function (cell) {
            var minW = cell._minWidth;
            var cw = cell._width;
            if(cw < 20){
                return;
            }

            if(!minW || (cw - 1) > minW){
                w += 1;
                cell._width -= 1;
                allFail = false;
            }
            return w >= width;
        });
        if(!finished && !allFail){
            requestWidth(cells,width,w);
        }
    }
    function releaseWidth(cells,width,w){
        w = w || 0;
        var allFail = true;
        var finished = cells.some(function (cell) {
            var maxW = cell._maxWidth;
            var cw = cell._width;
            if(!maxW || (cw + 1) < maxW){
                w += 1;
                cell._width += 1;
                allFail = false;
            }
            return w >= width;
        });
        if(!finished && !allFail){
            releaseWidth(cells,width,w);
        }
    }
    function applyCellsWidth(cells,totalWidth){
        var num = cells.length;
        var ratio = 0;
        if(totalWidth <= 0){
            cells.forEach(function (cell) {
                var w = getWidth(cell);
                var maxW = parseMaxWidth(cell),
                    minW = parseMinWidth(cell);
                if(minW){
                    w = Math.max(w,minW);
                }
                if(maxW){
                    w = Math.min(w,maxW);
                }
                cell._width = w;
            });
            return;
        }

        function layout(){
            var _cells = [];
            cells.forEach(function (cell) {
                var maxW,minW;
                if(cell._width){
                    maxW = cell._maxWidth;
                    minW = cell._minWidth;
                }else{
                    var cw = totalWidth / num;
                    var _cw = Math.floor(cw);
                    ratio += (cw - _cw);
                    if(ratio >= 1){
                        ratio -= 1;
                        cw = _cw + 1;
                    }else{
                        cw = _cw;
                    }
                    cell._width = cw;
                    maxW = parseMaxWidth(cell);
                    minW = parseMinWidth(cell);
                    cell._maxWidth = maxW;
                    cell._minWidth = minW;
                }
                if((maxW && cw > maxW) || (minW && cw < minW)){
                    _cells.push(cell);
                }
            });

            _cells.forEach(function (cell) {
                var maxW = cell._maxWidth;
                var minW = cell._minWidth;
                var w = cell._width;
                if((maxW && w > maxW)){
                    cell._width = maxW;
                    releaseWidth(cells,w - maxW);
                    return;
                }
                if(minW && w < minW){
                    cell._width = minW;
                    requestWidth(cells,minW - w);
                }

            });
        }

        layout();

    }
    function toArray(typeArray){
        return Array.prototype.slice.call(typeArray);
    }
    function update(el,scrollSize){

        var style = el.querySelector('style[mg-table]');
        if(!style){
            style = document.createElement('style');
            style.setAttribute('mg-table','');
            style.setAttribute('scoped','')
            style.type = 'text/css';
            el.appendChild(style);
        }
        style.innerHTML = '';
        var header = el.querySelector('.mg-table-header'),
            body = el.querySelector('.mg-table-body');

        var width = header.clientWidth;
        var headerContent = header.querySelector('.mg-header-content'),
            bodyContent = body.querySelector('.mg-body-content');

        var headerCells = toArray(headerContent.querySelectorAll('.mg-header-cell'));
        var _width = 0;
        var _cells = [];
        headerCells.forEach(function (cell) {
            var w = parseWidth(cell);
            if(w === void 0){
                _cells.push(cell);
                cell._width = undefined;
                return;
            }
            _width += w;
            cell._width = w;

        });

        var leftWidth = width - _width;
        leftWidth -= scrollSize;

        applyCellsWidth(_cells,leftWidth);

        _width = 0;
        var styleText = '';
        var compAttr = el._compAttr;
        headerCells.forEach(function (cell,index) {
            var rule = new Rule('[' + compAttr + '] ' + '.mg-table-cell:nth-child(' + (index + 1) + ')');
            rule.attr('width',cell._width + 'px');
            _width += cell._width;
            styleText += rule.toString();
        });

        headerContent.style.width = _width + 'px';
        bodyContent.style.width = _width + 'px';

        style.innerHTML = styleText;

    }
    var isChrome = /chrome\//g.test(navigator.appVersion);
    var compId = 1;
    export default {
        name:'mg-table',
        props:{
            scrollSize:{
                type:Number,
                default:isChrome ? 8 : 18
            },
            windowResize:{
                type:Boolean,
                default:true
            },
            observer:{
                type:[String,Number,Object,Array]
            }
        },
        data: function () {
            return {
                layout:false,
                onResize:null,
                resizeTimeout:0
            };
        },
        watch:{
            observer: function () {
                this.update();
            }
        },
        methods:{
            update: function () {
                var el = this.$refs['el'];
                this.layout = false;
                this.$nextTick(function () {
                    update(el,this.scrollSize);
                    this.layout = true;
                }.bind(this));
            }
        },
        beforeDestroy: function () {
            if(this.onResize){
                window.removeEventListener('resize', this.onResize);
            }
        },
        mounted: function () {
            var el = this.$refs['el'];
            var compAttr = 'mg-table__' + (compId++);
            el._compAttr = compAttr;
            el.setAttribute(compAttr,'');
            bindEvent(el,this);

            if(this.windowResize){
                this.onResize = () => {
                    if(this.resizeTimeout){
                        clearTimeout(this.resizeTimeout);
                        this.resizeTimeout = 0;
                    }
                    this.resizeTimeout = setTimeout(() => {
                        this.update();
                    },100);
                };
                window.addEventListener('resize', this.onResize);
            }
            this.update();
        }
    };
</script>