import * as d3 from 'd3';
// import data from '../../data/relation.json'
import cloneDeep from 'clone-deep';
var containerClass = 'graph-canvas';
var nodesData = [
    {
        "id": 261,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/d5b41ebeb77ccf05665116e80386ef40/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "19112345678",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "19112345678",
        "zoom": 0.5
    },
    {
        "id": 20645,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/af78d7776fb79638a30555c0740a4e4d/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "17788762348",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "17788762348",
        "zoom": 0.5
    },
    {
        "id": 285,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "95559",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "95559",
        "zoom": 0.5
    },
    {
        "id": 330,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "95568",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "95568",
        "zoom": 0.5
    },
    {
        "id": 331,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "17255557736",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "17255557736",
        "zoom": 0.5
    },
    {
        "id": 144,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/1c52019c678078692afea21c85c9964f/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "17022458362",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "17022458362",
        "zoom": 0.5
    },
    {
        "id": 156,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "95555",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "95555",
        "zoom": 0.5
    },
    {
        "id": 212,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "95526",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "95526",
        "zoom": 0.5
    },
    {
        "id": 323,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "17132587779",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "17132587779",
        "zoom": 0.5
    },
    {
        "id": 336,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/a65e7184bc98681d61219d7b1d3e52c5/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "13255482024",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "13255482024",
        "zoom": 0.5
    },
    {
        "id": 337,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "17259852331",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "17259852331",
        "zoom": 0.5
    },
    {
        "id": 326,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "15999662275",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "15999662275",
        "zoom": 0.5
    },
    {
        "id": 338,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/5a6762ec82f4a64d9c3f659f60e95ead/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "15200000025",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "15200000025",
        "zoom": 0.5
    },
    {
        "id": 15127,
        "avatarUrl": "http://192.168.3.104:8000/api/oss/030000110000111111201902181916353976250673544320631992330/attach_file/wechat/thi.jpg",
        "type": "PERSON",
        "name": "王五",
        "personId": 3,
        "zoom": 1.0
    },
    {
        "id": 119,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/323f3092a5f95683599ff379805e721d/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "17111295488",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "17111295488",
        "zoom": 0.5
    },
    {
        "id": 328,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "1065502523008982797",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "1065502523008982797",
        "zoom": 0.5
    },
    {
        "id": 15137,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "10010",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "10010",
        "zoom": 0.5
    },
    {
        "id": 21,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/088b58ea26f8eb7d7ee53f0922c5612a/avatar",
        "type": "ACCOUNT",
        "accountType": "PHONE",
        "name": "13162584469",
        "app": "电话",
        "appCode": "PHONE",
        "accountKey": "13162584469",
        "zoom": 0.5
    }
];
var linksData = [
    {
        "source": 21,
        "target": 15127,
        "count": 6,
        "direction": 0,
        "relationId": "473cdcacac704f81bb95919955e82c03",
        "name": "打电话"
    },
    {
        "source": 323,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "125e590e3a4e4eec8e0a7088beea9fe7",
        "name": "打电话"
    },
    {
        "source": 15127,
        "target": 156,
        "count": 2,
        "direction": 0,
        "relationId": "4fb531bc90994c5e86955488a56a7f68",
        "name": "打电话"
    },
    {
        "source": 285,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "f62055e8a351470aa9f4f53d99d4fc33",
        "name": "发短信"
    },
    {
        "source": 330,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "f9d8ba86d34b4171aef5e91aa1bb0dcd",
        "name": "发短信"
    },
    {
        "source": 15127,
        "target": 15137,
        "count": 1,
        "direction": 0,
        "relationId": "3edc12c44d0a48b29a543643fd35e67a",
        "name": "打电话"
    },
    {
        "source": 338,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "dd18f816a2894e2fa81398c164b0c115",
        "name": "发短信"
    },
    {
        "source": 328,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "ac85705c3fff40d7a001aeac60d43538",
        "name": "发短信"
    },
    {
        "source": 15127,
        "target": 261,
        "count": 2,
        "direction": 0,
        "relationId": "28985c3b9782475987b8d995a524a879",
        "name": "打电话"
    },
    {
        "source": 331,
        "target": 15127,
        "count": 3,
        "direction": 0,
        "relationId": "d7a4487bc3074f65b2184755ad2838a8",
        "name": "打电话"
    },
    {
        "source": 15127,
        "target": 119,
        "count": 2,
        "direction": 0,
        "relationId": "1a99ee5552bb447499c184f346787e5e",
        "name": "发短信"
    },
    {
        "source": 337,
        "target": 15127,
        "count": 2,
        "direction": 0,
        "relationId": "3eee3448f5a245ad8f24f55944f8ac78",
        "name": "打电话"
    },
    {
        "source": 336,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "a423386767ef4c88b4cfad35ac27dcfd",
        "name": "发短信"
    },
    {
        "source": 20645,
        "target": 15127,
        "count": 9,
        "direction": 0,
        "relationId": "f9c4124b711e4d428f2e9ce310009592",
        "name": "发短信"
    },
    {
        "source": 144,
        "target": 15127,
        "count": 6,
        "direction": 0,
        "relationId": "2723ce237fed48b5b3e253ba769ec5ef",
        "name": "打电话"
    },
    {
        "source": 212,
        "target": 15127,
        "count": 2,
        "direction": 0,
        "relationId": "538a0a5d9a7c4d73913824ea8e076535",
        "name": "发短信"
    },
    {
        "source": 326,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "c6aa9ade78bc4a5d9458f0f05d3db3e8",
        "name": "打电话"
    }
];
var defaultOption = {
    multiSelect: true,
    maxTextLength: 12,
    enableAnimation: true,
    defaultSize: 20,
    defaultShape: 'circle',
    iconKey: 'icon',
    key: 'id',
    // configNode: function (node) {

    // },
    // configLink: function (link) {

    // },
    // getIconUrl: function (icon) {
    //     return icon;
    // }
};

function relativeUrl(url) {
    var origin = location.origin,
        pathname = location['pathname'] || '';
    return origin + pathname + url;
}
function circleCenter(r,pointA,pointB){

    var disY = Math.sqrt(Math.pow((pointB.x - pointA.x),2) + Math.pow((pointB.y - pointA.y),2)) / 2;
    var mX = pointB.x - disY,
        mY = pointB.y;

    var centerX = mX;
    var centerY = mY - Math.sqrt(Math.pow(r,2) - Math.pow(disY,2));
    return {
        x:centerX,
        y:centerY
    };
}
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (executor) {
    return setTimeout(executor, 1000 / 60);
};
export default {
    name: 'nodes-graph',
    data() {
        return {
            ui: {
                svg: null,
                brushPanel: null
            },
            graphModel: nodesData,
            runtime: {
                currentOption: Object.assign(cloneDeep(defaultOption), this.option),
                nodes: null,
                links: null,
                transform: null,
                shiftKey: false,
                brushMode: false,
                brushing: true,
                selectNodes: [],
                selectLinks: [],
            },
            option:{
                enableAnimation:false
            }
        }
    },
    methods: {
        startRender(){
            this.option.enableAnimation = true
        },
        renderContainer: function () {
            var ui = this.ui;
            var panel = d3.select(this.$refs.panel);
            panel.select('.' + containerClass).remove();
            var svg = panel.select('svg');
            svg.append('g').classed(containerClass, true);
            ui.svg = svg;
        },
        getRadius: function (node) {
            var runtime = this.runtime;
            var option = runtime.currentOption;
            var radius = option.defaultSize;
            if (parseInt(node.radius)) {
                radius = parseInt(node.radius);
            } else if (typeof node.zoom === 'number') {
                radius *= node.zoom;
            }
            return radius;
        },
        renderNodes() {
            var _this = this;
            var ui = this.ui;
            var runtime = this.runtime;
            var option = runtime.currentOption;
            var defaultShape = option.defaultShape;
            var container = ui.svg.select('.' + containerClass);
            var nodeGroup = container.append('g').classed('nodes', true);
            var nodes = nodeGroup.selectAll('.node')
                .data(nodesData)
                .enter()
                .append('g')
                .classed('node', true).attr('node-shape', function (d) {
                    var shape = (d.shape || defaultShape) + '';
                    return shape.toUpperCase();
                });

            var textPanel = nodes.append('foreignObject').classed('img-panel', true)
                .style('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                })
                .style('height', '30px')
                .attr('x', function (d) {
                    var radius = _this.getRadius(d);
                    return -radius;
                }).attr('y', function (d) {
                    var radius = _this.getRadius(d);
                    return radius;
                });
            textPanel.append('xhtml:div').classed('node-text', true)
                .style('margin-left', function (d) {
                    var radius = _this.getRadius(d);
                    // var text = d.name;
                    var text = 'O';
                    this.innerHTML = '';
                    var textNode = document.createElement('span');
                    textNode.innerText = text;
                    this.appendChild(textNode);
                    var width = textNode.offsetWidth;
                    var marginLeft = (radius * 2 - width) / 2 + 'px';
                    return 'marginLeft';
                });
        },
        renderLinks() {
            var ui = this.ui;
            var svg = ui.svg.select('.' + containerClass);
            var linkGroup = svg.append('g').classed('links', true);
            var links = linkGroup.selectAll('.line').data(linksData).enter()
                .append('g').classed('line', true).classed('link-set', function (d) {
                    return d['isSet'];
                });

            var endRelUrl = 'url(' + relativeUrl('#TriangleEnd') + ')';
            var startRelUrl = 'url(' + relativeUrl('#TriangleStart') + ')';
            links.append('path').attr('marker-end', function (d) {
                if (d.source === d.target || d.direction == 0) {
                    return;
                }
                return endRelUrl;
            }).attr('marker-start', function (d) {
                if (d.source === d.target || d.direction == 0) {
                    return;
                }
                return startRelUrl;
            });

            links.append('foreignObject').attr('y', -24).attr('width', 120).attr('height', 30).classed('hidden', function (d) {
                return d.count === 0;
            }).append('xhtml:div').append('xhtml:span').text(function (d) {
                return d.count;
            }).attr('title', function (d) {
                return d.count;
            });
        },
        init() {
            this.renderNodes()
            this.renderLinks()
        },
        getClientBound: function () {
            var panel = this.$refs['panel'];
            var width = panel.clientWidth,
                height = panel.clientHeight;
            return {
                width: width,
                height: height
            };
        },
        layoutLinks() {
            var _this = this;
            var angle = Math.PI / 2.5;
            var ui = this.ui;
            var svg = ui.svg;
            var links = svg.selectAll('.line'),
                nodes = svg.selectAll('.node');
            links.attr('transform', function (d) {
                var centerX = 0,
                    centerY = 0;
                if (d.source === d.target) {
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
                var x = d.source.x,
                    y = d.source.y;
                var _x = d.target.x,
                    _y = d.target.y;
                var radius = _this.getRadius(d.source),
                    _radius = _this.getRadius(d.target);
                if (d.source === d.target) {
                    var arcRadius = radius;
                    var start = [x - radius * Math.sin(angle), y - radius * Math.cos(angle)],
                        end = [x + radius * Math.sin(angle), y - radius * Math.cos(angle)];

                    d._arcStart = start;
                    d._arcEnd = end;
                    var d = ['M', start.join(' '), 'A', [arcRadius, arcRadius].join(' '), ' 0 1 1 ', end.join(' '), 'Z'].join('');
                    return d;
                }

                var start, end;
                if (direction == 0) {
                    start = [x - d._centerX, y - d._centerY];
                    end = [_x - d._centerX, _y - d._centerY];
                    return ['M', start.join(' '), 'L', end.join(' ')].join('');
                }

                var _R = _radius + 10,
                    R = radius + 10;
                if (y === _y) {
                    y += 0.01;
                }
                if (x === _x) {
                    x += 0.01;
                }
                var k = (y - _y) / (x - _x);
                var _angle = Math.atan(k);
                var sinAngle = Math.sin(_angle),
                    cosAngle = Math.cos(_angle);


                if (direction === 1 || direction === 2) {
                    if (x > _x) {
                        _y += sinAngle * _R;
                        _x += cosAngle * _R;
                    } else {
                        _y -= sinAngle * _R;
                        _x -= cosAngle * _R;
                    }
                }
                if (direction === -1 || direction === 2) {
                    if (x < _x) {
                        y += sinAngle * R;
                        x += cosAngle * R;
                    } else {
                        y -= sinAngle * R;
                        x -= cosAngle * R;
                    }
                }

                start = [x - d._centerX, y - d._centerY];
                end = [_x - d._centerX, _y - d._centerY];
                return ['M', start.join(' '), 'L', end.join(' ')].join('');
            });

            links.selectAll('foreignObject').attr('transform', function (d) {
                var radius = _this.getRadius(d.source);
                if (d.source === d.target) {
                    var arcRadius = radius;
                    var point = circleCenter(arcRadius, {
                        x: d._arcStart[0],
                        y: d._arcStart[1]
                    }, {
                        x: d._arcEnd[0],
                        y: d._arcEnd[1]
                    });
                    var axis = [point.x, point.y - arcRadius];
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
            requestAnimationFrame(function () {
                svg.select('.' + containerClass).classed('layout-finish', true);
            });
        },
        layoutNodes() {
            var ui = this.ui;
            var svg = ui.svg;
            var simulation = this.ui.simulation;
            var nodes = svg.selectAll('.node');
            nodes.attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
            while(true){
                if(simulation.alpha() <= simulation.alphaMin()){
                    break;
                }
                simulation.tick();
            }
            simulation.force('collide',null);
        },
        layout() {
            
            var ui = this.ui;
            var runtime = this.runtime;
            var option = runtime.currentOption;
            var clientSize = this.getClientBound();
            var width = clientSize.width,
                height = clientSize.height;
            var strength = Math.min(width, height) / nodesData.length;
            var distance = Math.max(width, height) / 3;
            var simulation = d3.forceSimulation()
                .force('link', d3.forceLink().id(function (d) {
                    return d[option.key];
                })).force('charge', d3.forceManyBody().strength(-strength))
                .force('center', d3.forceCenter(width / 2, height / 2));

            ui.simulation = simulation;

            simulation
                .nodes(nodesData);
            simulation.force('link')
                .distance(distance)
                .links(linksData);
            // simulation.on('tick',this.layout.bind(this));
            this.layoutNodes()
            this.layoutLinks()
        },
    },
    watch:{

    },
    mounted() {
        let _this = this;
        this.renderContainer()
        this.init()
        this.layout();
        setTimeout(function(){
            _this.option.enableAnimation = true
        },1000)
    }
}