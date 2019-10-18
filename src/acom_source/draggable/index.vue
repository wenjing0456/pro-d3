<template>
    <div class="mg-draggable" :style="{left:position.x + 'px',top:position.y + 'px'}" :class="{'mg-draggable-global':global}" ref="el">
        <slot></slot>
    </div>
</template>
<style lang="scss" src="./comp.scss"></style>
<script>
    function parseNumber(v) {
        if(typeof v === 'string'){
            v = parseFloat(v);
        }
        return typeof v === 'number' ? v : undefined;
    }
    function getPosition(e){
        var x = e.clientX || e.pageX,
            y = e.clientY || e.pageY;
        return {
            x:x,
            y:y
        };
    }
    function getElPosition(el){
        var style = window.getComputedStyle(el);
        return {
            x:parseFloat(style.left) || 0,
            y:parseFloat(style.top) || 0
        };
    }
    function getLimitPos(panel, parent) {
        return {
            left: 0,
            top: 0,
            right: parent.clientWidth - panel.offsetWidth,
            bottom: parent.clientHeight - panel.offsetHeight
        }
    }
    function enableDrag(panel,trigger){
        if(!trigger){
            trigger = panel;
        }
        var _this = this;
        var position = this.position;
        var left = position.x + 'px',
            top = position.y + 'px';
        panel.style.left = left;
        panel.style.top = top;
        var runtime = {
            running:false,
            relX:null,
            relY:null,
            mouseDown:null,
            mouseMove:null,
            cancelDrag:null
        };
        panel._runtime = runtime;
        trigger.addEventListener('mousedown', runtime.mouseDown = function (e) {
            var evtPos = getPosition(e);
            var panelPos = getElPosition(panel);
            runtime.relX = evtPos.x - panelPos.x;
            runtime.relY = evtPos.y - panelPos.y;
            runtime.running = true;
            _this.$emit('drag-start',e);
        });

        var parent = this.global ? document.body : (panel._parent = getParent(panel));
        var limitRange = this.limitRange;
        parent.addEventListener('mousemove', runtime.mouseMove = function (e) {
            if(!runtime.running){
                return;
            }
            var curPos = getPosition(e);

            var panelX = curPos.x - runtime.relX,
                panelY = curPos.y - runtime.relY;

            if(limitRange){
                var limitPos = getLimitPos(panel, parent);

                panelX = Math.max( Math.min(panelX, limitPos.right),  limitPos.left);
                panelY = Math.max( Math.min(panelY, limitPos.bottom),  limitPos.top);
            }

            panel.style.userSelect = 'none';
            panel.setAttribute('moving','');

            _this.$emit('input',{
                x:panelX,
                y:panelY
            });
            _this.$emit('drag',e);
        },true);
        function stopDrag(e){
            panel.style.userSelect = '';
            runtime.running = false;
            panel.removeAttribute('moving');
            _this.$emit('drag-end',e);
        }
        runtime.cancelDrag = stopDrag;
        document.body.addEventListener('mouseup',runtime.cancelDrag);

    }
    function getParent(panel) {
        var node = panel.parentNode;
        while(true){
            if(!node || node.tagName.toLowerCase() === 'body'){
                break;
            }
            let style = window.getComputedStyle(node);
            let position = style.position || '';
            if(['fixed','relative','absolute'].indexOf(position) >= 0){
                break;
            }
            node = node.parentNode
        }
        return node;
    }
    function destroyDrag(panel,trigger){
        if(!panel){
            return;
        }
        if(!trigger){
            trigger = panel;
        }
        var parent = this.global ? document.body : panel._parent;
        var runtime = panel._runtime;
        trigger.removeEventListener('mousedown',runtime.mouseDown);
        parent.removeEventListener('mousemove',runtime.mouseMove);
        document.body.removeEventListener('mouseup',runtime.cancelDrag);

    }
    export default {
        name:'mg-draggable',
        props:{
            dragTrigger:{
                type:String
            },
            global:{
                type:Boolean,
                default:false
            },
            limitRange:{
                type:Boolean,
                default:true
            },
            value:{
                type:Object,
                default: function () {
                    return {
                        x:0,
                        y:0
                    };
                }
            }
        },
        data: function () {
            var value = this.value || {};
            return {
                position:{
                    x:parseNumber(value.x) || 0,
                    y:parseNumber(value.y) || 0
                }
            };
        },
        watch:{
            value:function () {
                var value = this.value || {};
                var position = this.position;
                position.x = parseNumber(value.x) || 0;
                position.y = parseNumber(value.y) || 0;
            },
            global:function () {
                this.destroyDraggable();
                this.enableDraggable();
            }
        },
        methods:{
            getDragTrigger:function () {
                var el = this.$refs.el;
                var trigger = this.dragTrigger;
                if(typeof trigger === 'string'){
                    trigger = el.querySelector(trigger);
                }
                return trigger;
            },
            enableDraggable:function () {
                var el = this.$refs.el;
                enableDrag.bind(this)(el,this.getDragTrigger());
            },
            destroyDraggable:function () {
                var el = this.$refs.el;
                destroyDrag.bind(this)(el,this.getDragTrigger());
            }
        },
        mounted: function () {
            this.enableDraggable();
        },
        beforeDestroy: function () {
            this.destroyDraggable();
        }
    }
</script>