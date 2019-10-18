<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>
<script>

    import { ellipsisText,relativeUrl,circleCenter } from './util'
    import clone from '../../services/clone'
    import stringUtil from '../../services/string-util'
    import ImageLoader from '../../services/image-loader'

    var d3;
    var containerClass = 'graph-canvas';
    var defaultOption = {
        multiSelect:true,
        maxTextLength:12,
        enableAnimation:false,
        defaultSize:40,
        defaultShape:'circle',
        iconKey:'icon',
        key:'id',
        configNode: function (node) {

        },
        configLink: function (link) {

        },
        getIconUrl: function (icon) {
            return icon;
        }
    };
    export default {
        name:'mg-nodes-graph',
        props:{
            graphModel:{
                type:Object,
                required:true
            },
            highlightLinks:{
                type:Array,
                default: function () {
                    return [];
                }
            },
            highlightNodes:{
                type:Array,
                default: function () {
                    return []
                }
            },
            option:{
                type:Object,
                default: function () {
                    return defaultOption;
                }
            }
        },
        data: function () {
            return {
                renderTimeout:null,
                runtime:{
                    currentOption:Object.assign(clone.apply(defaultOption),this.option),
                    nodes:null,
                    links:null,
                    transform:null,
                    shiftKey:false,
                    brushMode:false,
                    brushing:true,
                    selectNodes:[],
                    selectLinks:[]
                },
                ui:{
                    svg:null,
                    brushPanel:null,
                    simulation:null
                }
            };
        },
        watch:{
            graphModel: function () {
                this.render();
            },
            highlightLinks: function () {
                var links = this.highlightLinks;
                if(links){
                    this.applyHighlightLinks();
                }
            },
            highlightNodes: function () {
                var nodes = this.highlightNodes;
                if(nodes){
                    this.applyHighlightNodes();
                }
            },
            option: function () {
                this.runtime.currentOption = Object.assign(clone.apply(defaultOption),this.option)
            },
            'option.enableAnimation': function () {
                var currentOption = this.runtime.currentOption;
                currentOption.enableAnimation = this.option.enableAnimation;

                var simulation = this.ui.simulation;
                if(!simulation){
                    return;
                }
                if(simulation && currentOption.enableAnimation){
                    simulation.on('tick',this.applyLayout.bind(this));
                }else{
                    simulation.on('tick',null);
                }
            }
        },
        mounted: function () {
            this.render();
        },
        methods:{
            applyHighlightLinks: function () {
                var hotLinks = this.highlightLinks;
                var links = this.ui.svg.selectAll('.line');
                var endRelUrl = 'url(' + relativeUrl('#TriangleEnd') + ')';
                var startRelUrl = 'url(' + relativeUrl('#TriangleStart') + ')';
                var endRelUrlActive = 'url(' + relativeUrl('#TriangleEndActive') + ')';
                var startRelUrlActive = 'url(' + relativeUrl('#TriangleStartActive') + ')';
                links.classed('highlight', function (d) {
                    d._highlight = hotLinks.indexOf(d) >= 0;
                    return d._highlight;
                }).selectAll('path').attr('marker-end', function (d) {
                    if(d.source === d.target || d.direction == 0){
                        return;
                    }
                    return d._highlight ? endRelUrlActive : endRelUrl;
                }).attr('marker-start', function (d) {
                    if(d.source === d.target || d.direction == 0){
                        return;
                    }
                    return d._highlight ? startRelUrlActive : startRelUrl;
                });
            },
            applyHighlightNodes: function () {
                var hotNodes = this.highlightNodes;
                var nodes = this.ui.svg.selectAll('.node');
                var nodePanel = this.ui.svg.select('.nodes').node();
                var highlightNodes = [];
                nodes.classed('highlight', function (d) {
                    if(hotNodes.indexOf(d) >= 0){
                        highlightNodes.push(this);
                        return true;
                    }
                });
                highlightNodes.forEach(function (nodeEl) {
                    nodePanel.appendChild(nodeEl);
                });
            },
            initGraphModel: function () {
                var graphModel = this.graphModel,
                    runtime = this.runtime;
                if(!graphModel){
                    return;
                }
                var links = graphModel.links,
                    nodes = graphModel.nodes;

                var nodeIds = {};
                var option = this.runtime.currentOption;
                var configNode = option.configNode,
                    configLink = option.configLink;
                nodes.forEach(function (node) {
                    nodeIds[node.id] = true;
                    if(typeof configNode === 'function'){
                        configNode(node);
                    }
                });

                links = links.filter(function (link) {
                    var sourceExist = false,targetExist = false;
                    if(typeof link.source === 'object'){
                        sourceExist =  nodeIds[link.source.id];
                    }else{
                        sourceExist = nodeIds[link.source];
                    }
                    if(typeof link.target === 'object'){
                        targetExist =  nodeIds[link.target.id];
                    }else{
                        targetExist = nodeIds[link.target];
                    }
                    if(typeof configLink === 'function'){
                        configLink(link);
                    }
                    return sourceExist && targetExist;
                });

                runtime.nodes = nodes;
                runtime.links = links;
            },
            applyLayout: function () {

                var _this = this;
                var angle = Math.PI / 2.5;
                var ui = this.ui;
                var svg = ui.svg;
                var links = svg.selectAll('.line'),
                    nodes = svg.selectAll('.node');
                links.attr('transform', function (d) {
                    var centerX = 0,
                        centerY = 0;
                    if(d.source === d.target){
                        return 'translate(' + centerX + ',' + centerY + ')';
                    }
                    centerX = (d.source.x + d.target.x) / 2;
                    centerY = (d.target.y + d.source.y) / 2;
                    d._centerX = centerX;
                    d._centerY = centerY;
                    return 'translate(' + centerX + ',' + centerY + ')';
                });
                links.selectAll('path').attr('d', function (d) {

                    var direction = d.direction;
                    var x = d.source.x,y = d.source.y;
                    var _x = d.target.x,_y = d.target.y;
                    var radius = _this.getRadius(d.source),
                        _radius = _this.getRadius(d.target);
                    if(d.source === d.target){
                        var arcRadius = radius;
                        var start = [x - radius * Math.sin(angle),y - radius * Math.cos(angle)],
                            end = [x + radius * Math.sin(angle),y - radius * Math.cos(angle)];

                        d._arcStart = start;
                        d._arcEnd = end;
                        var d = ['M',start.join(' '),'A',[arcRadius,arcRadius].join(' '),' 0 1 1 ',end.join(' '),'Z'].join('');
                        return d;
                    }

                    var start,end;
                    if(direction == 0){
                        start = [x - d._centerX,y - d._centerY];
                        end = [_x - d._centerX,_y - d._centerY];
                        return ['M',start.join(' '),'L',end.join(' ')].join('');
                    }

                    var _R = _radius + 10,
                        R = radius + 10;
                    if(y === _y){
                        y += 0.01;
                    }
                    if(x === _x){
                        x += 0.01;
                    }
                    var k = (y - _y) / (x - _x);
                    var _angle = Math.atan(k);
                    var sinAngle = Math.sin(_angle),cosAngle = Math.cos(_angle);


                    if(direction === 1 || direction === 2){
                        if(x > _x){
                            _y += sinAngle * _R;
                            _x += cosAngle * _R;
                        }else{
                            _y -= sinAngle * _R;
                            _x -= cosAngle * _R;
                        }
                    }
                    if(direction === -1 || direction === 2){
                        if(x < _x){
                            y += sinAngle * R;
                            x += cosAngle * R;
                        }else{
                            y -= sinAngle * R;
                            x -= cosAngle * R;
                        }
                    }

                    start = [x - d._centerX,y - d._centerY];
                    end = [_x - d._centerX,_y - d._centerY];
                    return ['M',start.join(' '),'L',end.join(' ')].join('');
                });

                links.selectAll('foreignObject').attr('transform', function (d) {
                    var radius = _this.getRadius(d.source);
                    if(d.source === d.target){
                        var arcRadius = radius;
                        var point = circleCenter(arcRadius,{
                            x:d._arcStart[0],
                            y:d._arcStart[1]
                        },{
                            x:d._arcEnd[0],
                            y:d._arcEnd[1]
                        });
                        var axis = [point.x,point.y - arcRadius];
                        return 'translate(' + axis.join(',') + ')';
                    }
                    var disX = d.target.x - d.source.x,
                        disY = d.target.y - d.source.y;
                    var rotate = disX ? Math.atan(disY / disX) : disY ? (disY / Math.abs(disY)) * Math.PI / 2 : 0;
                    var degree = rotate * 180 / Math.PI;
                    return 'rotate(' + degree + ')';
                });

                nodes.attr('transform', function (d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });

            },
            getClientBound: function () {
                var panel = this.$refs.panel;
                var width = panel.clientWidth,height = panel.clientHeight;
                return {
                    width:width,
                    height:height
                };
            },
            renderContainer: function () {
                var ui = this.ui;
                var panel = d3.select(this.$refs.panel);
                panel.select('.' + containerClass).remove();
                var svg = panel.select('svg');
                svg.append('g').classed(containerClass,true);
                ui.svg = svg;
            },
            bindNodeEvent: function () {
                var _this = this;
                var ui = this.ui;
                var runtime = this.runtime;
                var nodes = ui.svg.selectAll('.node');
                var nodeClick = function (d) {
                    d3.event.stopPropagation();
                    var selected = d.selected;
                    if(!runtime.shiftKey){
                        nodes.classed('selected',false);
                        nodes.each(function (d) {
                            d.selected = false;
                        });
                    }
                    d.selected = !selected;
                    d3.select(this).classed('selected',d.selected);

                    var data = [];
                    nodes.each(function (d) {
                        if(d.selected){
                            data.push(d);
                        }
                    });
                    _this.clearSelectLinks();
                    _this.nodeClick(data);
                };
                nodes.on('click',nodeClick).on('mousedown', function (d) {
                    d.draged = true;
                });
            },
            bindGraphEvent: function () {
                var ui = this.ui;
                var _this = this;
                ui.svg.on('click', function () {
                    _this.clearSelectNodes();
                    _this.clearSelectLinks();
                    _this.graphClick();
                });
            },
            clearSelectNodes: function () {
                var ui = this.ui;
                ui.svg.selectAll('.node').each(function (d) {
                    d.selected = false;
                }).classed('selected',false);
                this.nodeClick([]);
            },
            clearSelectLinks: function () {
                var ui = this.ui;
                ui.svg.selectAll('.line').each(function (d) {
                    d.selected = false;
                }).classed('selected',false);
                this.linkClick([]);
            },
            renderNodes: function () {
                var _this = this;
                var ui = this.ui;
                var runtime = this.runtime;
                var container = ui.svg.select('.' + containerClass);
                var nodeGroup = container.append('g').classed('nodes',true);

                var color = function (i) {
                    return d3.schemeCategory10[i % 20];
                };

                var option = runtime.currentOption;
                var defaultShape = option.defaultShape;
                //添加节点
                var nodes = nodeGroup.selectAll('.node')
                    .data(runtime.nodes)
                    .enter()
                    .append('g')
                    .classed('node',true).attr('node-shape', function (d) {
                        var shape = (d.shape || defaultShape) + '';
                        return shape.toUpperCase();

                    });

                var nodePanels = nodes.append('foreignObject').classed('img-panel',true).attr('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2;
                }).attr('height', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2;
                })
                    .attr('x', function (d) {
                        var radius = _this.getRadius(d);
                        return -radius;
                    }).attr('y', function (d) {
                        var radius = _this.getRadius(d);
                        return -radius;
                    });
                nodePanels.append('xhtml:div').classed('node-content',true).style('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                }).style('height', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                }).style('background-color', function (d,index) {
                    var iconKey = option.iconKey;
                    var icon = d[iconKey];
                    if(icon !== null && icon !== void 0 && icon !== ''){
                        var wrapper = this;
                        ImageLoader.load(option.getIconUrl(icon)).then(function (image) {
                            wrapper.style.backgroundColor = '#fff';
                            wrapper.appendChild(image);
                        });
                    }
                    if(d.bgColor){
                        return d.bgColor;
                    }
                    return color(index);
                });
                var textPanel = nodes.append('foreignObject').classed('text-panel',true).style('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                }).style('height','30px')
                    .attr('x', function (d) {
                        var radius = _this.getRadius(d);
                        return -radius;
                    }).attr('y', function (d) {
                        var radius = _this.getRadius(d);
                        return radius;
                    });
                textPanel.append('xhtml:div').classed('node-text',true)
                    .style('margin-left', function (d) {
                        var radius = _this.getRadius(d);
                        var name = stringUtil.trim(d.name);
                        var textMode = ellipsisText(name,option.maxTextLength);
                        var text = textMode.text;
                        this.innerHTML = '';
                        var textNode = document.createElement('span');
                        textNode.innerText = text;
                        textNode.title = name;
                        this.appendChild(textNode);
                        var width = textNode.offsetWidth;
                        var marginLeft = (radius * 2 - width) / 2 + 'px';
                        return marginLeft;
                    });
            },
            bindLinkEvent: function () {

                var _this = this;
                var ui = this.ui;
                var links = ui.svg.selectAll('.line');
                var linkClick = function (d) {
                    d3.event.stopPropagation();
                    var selected = d.selected;
                    links.classed('selected',false);
                    links.each(function (d) {
                        d.selected = false;
                    });
                    d.selected = !selected;
                    d3.select(this).classed('selected',d.selected);

                    var data = [];
                    links.each(function (d) {
                        if(d.selected){
                            data.push(d);
                        }
                    });
                    _this.clearSelectNodes();
                    _this.linkClick(data);
                };
                links.on('click',linkClick);
            },
            renderLinks: function () {
                var ui = this.ui;
                var runtime = this.runtime;
                var svg = ui.svg.select('.' + containerClass);
                var linkGroup = svg.append('g').classed('links',true);

                var links = linkGroup.selectAll('.line').data(runtime.links).enter()
                    .append('g').classed('line',true).classed('link-set', function (d) {
                        return d['isSet'];
                    });

                var endRelUrl = 'url(' + relativeUrl('#TriangleEnd') + ')';
                var startRelUrl = 'url(' + relativeUrl('#TriangleStart') + ')';
                links.append('path').attr('marker-end', function (d) {
                    if(d.source === d.target || d.direction == 0){
                        return;
                    }
                    return endRelUrl;
                }).attr('marker-start', function (d) {
                    if(d.source === d.target || d.direction == 0){
                        return;
                    }
                    return startRelUrl;
                });

                links.append('foreignObject').attr('y',-24).attr('width',120).attr('height',30).classed('hidden', function (d) {
                    return !d.name;
                }).append('xhtml:div').append('xhtml:span').text(function (d) {
                    return d.name;
                }).attr('title',function(d){
                    return d.name;
                });
            },
            layout: function () {

                var _this = this;
                var ui = this.ui;
                var runtime = this.runtime;
                var option = runtime.currentOption;
                var clientSize = this.getClientBound();
                var width = clientSize.width,height = clientSize.height;
                var strength = Math.max(250,Math.min(width,height) / 3);
                var distance = strength;
                var simulation = d3.forceSimulation()
                    .force('link', d3.forceLink().id(function (d) {
                        return d[option.key];
                    })).force('charge', d3.forceManyBody().strength(-strength))
                    .force('center', d3.forceCenter(width / 2, height / 2));

                ui.simulation = simulation;

                simulation
                    .nodes(runtime.nodes);

                simulation.force('link')
                    .distance(distance)
                    .links(runtime.links);

                this.layoutNodes();

                this.applyLayout();
                requestAnimationFrame(function () {
                    ui.svg.select('.' + containerClass).classed('layout-finish',true);
                });

            },
            layoutNodes:function () {
                var _this = this;
                var simulation = this.ui.simulation;
                simulation.force('collide',d3.forceCollide().radius(function (d) {
                    return _this.getRadius(d) + 20;
                }));
                console.time('graphLayout');
                while(true){
                    if(simulation.alpha() <= simulation.alphaMin()){
                        break;
                    }
                    simulation.tick();
                }
                console.timeEnd('graphLayout');
                simulation.force('collide',null);
            },
            bindZoomEvent: function () {

                var ui = this.ui;
                var runtime = this.runtime;
                var container = ui.svg.select('.' + containerClass);
                var zoom = d3.zoom()
                    .on('zoom', zoomed);
                ui.svg.call(zoom);

                function zoomed() {
                    var transform = d3.event.transform;
                    runtime.transform = transform;
                    container.attr('transform', transform);
                    if(/\bedge\/\d+\.\d+/i.test(navigator.appVersion)){
                        clearTimeout(zoomed.timeout);
                        container.style('visibility','hidden');
                        zoomed.timeout = setTimeout(function () {
                            container.style('visibility','visible');
                        },60);
                    }
                }
            },
            bindBrushEvent: function () {

                var ui = this.ui;
                var runtime = this.runtime;
                var option = runtime.currentOption;
                ui.svg.select('.brush').remove();
                var brushPanel = ui.svg.append('g').classed('brush',true);
                var nodes = ui.svg.selectAll('.node');
                if(option.multiSelect){
                    var gBrush;
                    function isEnableBrush(){
                        var key = d3.event.key || '';
                        if(!key){
                            return false;
                        }
                        return /^[Zz]$/.test(key);
                    }
                    function keyDown() {
                        runtime.shiftKey = d3.event.shiftKey;
                        if (isEnableBrush()) {
                            if (gBrush)
                                return;
                            runtime.brushMode = true;
                            if (!gBrush) {
                                gBrush = brushPanel.append('g');
                                gBrush.call(brush);
                            }
                        }
                    }
                    function keyUp() {
                        runtime.shiftKey = false;
                        runtime.brushMode = false;
                        if (!gBrush)
                            return;
                        gBrush.remove();
                        gBrush = null;
                    }
                    d3.select('body').on('keydown.nodeGraph', keyDown).on('keyup.nodeGraph', keyUp);

                    var brush = d3.brush().on('start', brushStarted).on('brush', brushed).on('end', brushEnded);
                    function brushStarted(){
                        runtime.brushing = true;
                    }
                    function transformNodePos(point){
                        if(!runtime.transform){
                            return point;
                        }
                        var x = runtime.transform.x,
                            y = runtime.transform.y,
                            k = runtime.transform.k;

                        point = {
                            x:x + point.x * k,
                            y:y + point.y * k
                        };
                        return point;
                    }
                    function brushed(){
                        if (!d3.event.sourceEvent) return;
                        if (!d3.event.selection) return;

                        var extent = d3.event.selection;
                        nodes.classed("selected", function(d) {
                            var point = transformNodePos(d);
                            d.selected =
                                (extent[0][0] <= point.x && point.x < extent[1][0]
                                    && extent[0][1] <= point.y && point.y < extent[1][1]);
                            return d.selected;
                        });

                    }
                    function brushEnded(){
                        if (!d3.event.sourceEvent) return;
                        if (!d3.event.selection) return;
                        if (!gBrush) return;
                        gBrush.call(brush.move, null);
                        if (!runtime.brushMode) {
                            gBrush.remove();
                            gBrush = null;
                        }
                        runtime.brushing = false;
                    }
                }
            },
            render:function () {
                var graphModel = this.graphModel;
                if(!graphModel){
                    return;
                }
                this.initGraphModel();

                this.renderContainer();
                this.renderLinks();
                this.renderNodes();

                this.bindZoomEvent();
                this.bindNodeEvent();
                this.bindLinkEvent();
                this.bindBrushEvent();
                this.bindDragEvent();

                this.bindGraphEvent();

                this.layout();

            },
            bindDragEvent: function () {

                var _this = this;
                var ui = this.ui;
                var runtime = this.runtime;
                var nodes = ui.svg.selectAll('.node');
                nodes.call(d3.drag().on('start',dragStart).on('drag',drag).on('end',dragEnd));
                function isDraggingNode(d){
                    return d.draged || (runtime.shiftKey && d.selected);
                }
                var simulated = false;
                function dragStart(d){
                    var option = runtime.currentOption;
                    ui.simulation.force('collide',null);
                    if(option.enableAnimation){
                        ui.simulation.on('tick',_this.applyLayout.bind(_this));
                        if(!runtime.currentOption.multiSelect){
                            d.fx = d.x;
                            d.fy = d.y;
                            return;
                        }
                        nodes.each(function (d) {
                            if(isDraggingNode(d)){
                                d.fx = d.x;
                                d.fy = d.y;
                            }
                        });
                    }else{
                        ui.simulation.on('tick',null);
                    }

                }
                function drag(d){
                    var option = runtime.currentOption;
                    if(option.enableAnimation){
                        if (!simulated && (d3.event.dx || d3.event.dy)){
                            ui.simulation.alphaTarget(0.9).restart();
                            simulated = true;
                        }
                        if(!option.multiSelect){
                            d.fx += d3.event.dx;
                            d.fy += d3.event.dy;
                        }else{
                            nodes.each(function (d) {
                                if(isDraggingNode(d)){
                                    d.fx += d3.event.dx;
                                    d.fy += d3.event.dy;
                                }
                            });
                        }
                    }else{
                        if(!option.multiSelect){
                            d.x += d3.event.dx;
                            d.y += d3.event.dy;
                        }else{
                            nodes.each(function (d) {
                                if(isDraggingNode(d)){
                                    d.x += d3.event.dx;
                                    d.y += d3.event.dy;
                                }
                            });
                        }
                        _this.applyLayout();
                    }
                }
                function dragEnd(){
                    ui.simulation.stop();
                    simulated = false;
                    nodes.each(function (d) {
                        d.draged = false;
                        d.fx = null;
                        d.fy = null;
                    });
                }
            },
            getRadius: function (node) {
                var runtime = this.runtime;
                var option = runtime.currentOption;
                var radius = option.defaultSize;
                if(parseInt(node.radius)){
                    radius = parseInt(node.radius);
                }else if(typeof node.zoom === 'number'){
                    radius *= node.zoom;
                }
                return radius;
            },
            linkClick: function (data) {

                this.$emit('link-click',data);
            },
            nodeClick: function (data) {
                this.$emit('node-click',data);
            },
            graphClick: function () {
                this.$emit('click');
            }
        },
        created: function () {
            d3 = window['d3'];
        },
        beforeDestroy: function () {
            d3.select('body').on('keydown.nodeGraph', null).on('keyup.nodeGraph', null);
        }
    }
</script>