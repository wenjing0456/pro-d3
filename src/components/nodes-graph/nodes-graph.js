import * as d3 from 'd3';
// import data from '../../data/relation.json'
import cloneDeep from 'clone-deep';
var containerClass = 'graph-canvas';
var nodesData = [{
        "id": 294,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/3dc5cb2395dc14254635bbfbea04ac8b/avatar",
        "type": "ACCOUNT",
        "accountType": "WECHAT_ACCOUNT",
        "name": "kiki",
        "app": "微信",
        "appCode": "1030036",
        "accountKey": ":wxid_b83c0k1mlpne13",
        "zoom": 0.5
    },
    {
        "id": 253,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/cdfa92b5bae0c3967518d0f6f15f69e4/avatar",
        "type": "ACCOUNT",
        "accountType": "WECHAT_ACCOUNT",
        "name": "dd2,手心的蔷薇92,最好的遇见最美的期待",
        "app": "微信",
        "appCode": "1030036",
        "accountKey": ":wxid_19ldlme2qgb922",
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
        "id": 210,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "MAIL",
        "name": "1120610518@qq.com",
        "app": "邮件",
        "appCode": "MAIL",
        "accountKey": "1120610518@qq.com",
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
        "id": 238,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "MAIL",
        "name": "848565664@qq.com",
        "app": "邮件",
        "appCode": "MAIL",
        "accountKey": "848565664@qq.com",
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
        "id": 92,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/d5ac4eb5d537226e163baf478f4b392e/avatar",
        "type": "ACCOUNT",
        "accountType": "QQ_ACCOUNT",
        "name": "cic1,pangux01",
        "app": "QQ",
        "appCode": "1030001",
        "accountKey": ":848565664",
        "zoom": 0.5
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
        "id": 54,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "MAIL",
        "name": "pod1@gmail.com",
        "app": "邮件",
        "appCode": "MAIL",
        "accountKey": "pod1@gmail.com",
        "zoom": 0.5
    },
    {
        "id": 15131,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/ddc383c10d1ee08ad6c8ff872ffdc2e0/avatar",
        "type": "ACCOUNT",
        "accountType": "QQ_ACCOUNT",
        "name": "p3",
        "app": "QQ",
        "appCode": "1030001",
        "accountKey": ":1994822250",
        "zoom": 0.5
    },
    {
        "id": 19,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "MAIL",
        "name": "pangu_x02@163.com",
        "app": "邮件",
        "appCode": "MAIL",
        "accountKey": "pangu_x02@163.com",
        "zoom": 0.5
    },
    {
        "id": 283,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "MAIL",
        "name": "x123456789@163.com",
        "app": "邮件",
        "appCode": "MAIL",
        "accountKey": "x123456789@163.com",
        "zoom": 0.5
    },
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
        "id": 103,
        "avatarUrl": "http://192.168.3.104:8000/api/oss/20190925181813-217007/attach_file/wechat/76ebdc1001224e6b867625520d3fb7ff",
        "type": "ACCOUNT",
        "accountType": "WECHAT_ACCOUNT",
        "name": "cici\uD83D\uDC95",
        "app": "微信",
        "appCode": "1030036",
        "accountKey": ":wxid_p72c0k1mlpne12",
        "zoom": 0.5
    },
    {
        "id": 4,
        "avatarUrl": "http://192.168.3.104:8000/api/oss/20190925181813-217007/attach_file/wechat/85bc3611c010492b872fb2f07d53b2ba",
        "type": "ACCOUNT",
        "accountType": "WECHAT_ACCOUNT",
        "name": "ee3,鱼干,A、",
        "app": "微信",
        "appCode": "1030036",
        "accountKey": ":wxid_irc1nlq3efju22",
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
        "id": 302,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/null/avatar",
        "type": "ACCOUNT",
        "accountType": "MAIL",
        "name": "pooog2@gmail.com",
        "app": "邮件",
        "appCode": "MAIL",
        "accountKey": "pooog2@gmail.com",
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
        "id": 327,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/800e60986477a4e2201dda22c87cac6a/avatar",
        "type": "ACCOUNT",
        "accountType": "QQ_ACCOUNT",
        "name": "p2",
        "app": "QQ",
        "appCode": "1030001",
        "accountKey": ":666621548",
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
        "id": 87,
        "avatarUrl": "http://192.168.3.104:8000/api/jaqen/accounts/2cf211f28a669f8d0483eb00ebdad655/avatar",
        "type": "ACCOUNT",
        "accountType": "QQ_ACCOUNT",
        "name": "p1",
        "app": "QQ",
        "appCode": "1030001",
        "accountKey": ":985422541",
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
var linksData = [{
        "source": 294,
        "target": 15127,
        "count": 20,
        "direction": 0,
        "relationId": "0044ca8963a041e3ba85f549b6735243",
        "name": "聊天"
    },
    {
        "source": 15127,
        "target": 87,
        "count": 10,
        "direction": 0,
        "relationId": "aae1908ebc0a48f5af168f9898b0dd73",
        "name": "聊天"
    },
    {
        "source": 15127,
        "target": 156,
        "count": 2,
        "direction": 0,
        "relationId": "412c67e2a18f4f6f87868aad95917647",
        "name": "打电话"
    },
    {
        "source": 54,
        "target": 15127,
        "count": 5,
        "direction": 0,
        "relationId": "abbd44b022b74cbaae253d207434c622",
        "name": "发邮件"
    },
    {
        "source": 15127,
        "target": 327,
        "count": 3,
        "direction": 0,
        "relationId": "ad341547c4124bacaef534689a53b4a5",
        "name": "聊天"
    },
    {
        "source": 15127,
        "target": 119,
        "count": 2,
        "direction": 0,
        "relationId": "813fbbc33011416c996d42b64194125d",
        "name": "发短信"
    },
    {
        "source": 337,
        "target": 15127,
        "count": 2,
        "direction": 0,
        "relationId": "fbbc4bc6d5a1485bae12904832aaa519",
        "name": "打电话"
    },
    {
        "source": 20645,
        "target": 15127,
        "count": 9,
        "direction": 0,
        "relationId": "cf3b2e3c270f4a9da52f401dda60cb16",
        "name": "发短信"
    },
    {
        "source": 144,
        "target": 15127,
        "count": 6,
        "direction": 0,
        "relationId": "ce18fc4346534513b00074cfef51d8da",
        "name": "打电话"
    },
    {
        "source": 212,
        "target": 15127,
        "count": 2,
        "direction": 0,
        "relationId": "c5b4ba3b08374826a5d3ecebd4704aee",
        "name": "发短信"
    },
    {
        "source": 302,
        "target": 15127,
        "count": 2,
        "direction": 0,
        "relationId": "75c41fb1f5834eef90130beb434f8bb0",
        "name": "发邮件"
    },
    {
        "source": 15127,
        "target": 19,
        "count": 2,
        "direction": 0,
        "relationId": "9f66b527cbe54e9496add5029efd6b1a",
        "name": "发邮件"
    },
    {
        "source": 4,
        "target": 15127,
        "count": 14,
        "direction": 0,
        "relationId": "ad13549e8de649d8b2ab2ef5f495232d",
        "name": "聊天"
    },
    {
        "source": 15127,
        "target": 283,
        "count": 7,
        "direction": 0,
        "relationId": "b28762a740df424fa950aeea47963ea9",
        "name": "发邮件"
    },
    {
        "source": 15127,
        "target": 210,
        "count": 1,
        "direction": 0,
        "relationId": "4503c93d484045f4a0becfd1def4ad24",
        "name": "发邮件"
    },
    {
        "source": 21,
        "target": 15127,
        "count": 6,
        "direction": 0,
        "relationId": "fdd61d05837d465cad8715db0b50a092",
        "name": "打电话"
    },
    {
        "source": 323,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "0f88646cd74d4de4869746967be34c1c",
        "name": "打电话"
    },
    {
        "source": 15127,
        "target": 15131,
        "count": 6,
        "direction": 0,
        "relationId": "b7ccb7d8b1e746d7ac4c8235635dc312",
        "name": "聊天"
    },
    {
        "source": 285,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "627250f1b9af40ac8aad1cd210922723",
        "name": "发短信"
    },
    {
        "source": 330,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "41ac73f23c024b4697d2ecebe66de43f",
        "name": "发短信"
    },
    {
        "source": 15127,
        "target": 15137,
        "count": 1,
        "direction": 0,
        "relationId": "d28af417070b476ea78737fcbc3b2002",
        "name": "打电话"
    },
    {
        "source": 338,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "0b9a0c0cedc34f8f8f080c20342368b6",
        "name": "发短信"
    },
    {
        "source": 92,
        "target": 15127,
        "count": 41,
        "direction": 0,
        "relationId": "130d0082225c45d59bd508657c6364fc",
        "name": "聊天"
    },
    {
        "source": 328,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "4938d18d4c2149caa5bed37d9fa13936",
        "name": "发短信"
    },
    {
        "source": 15127,
        "target": 261,
        "count": 2,
        "direction": 0,
        "relationId": "be7dc3fd8ab840d2a8a082db51d02792",
        "name": "打电话"
    },
    {
        "source": 331,
        "target": 15127,
        "count": 3,
        "direction": 0,
        "relationId": "e397e06909e54e489e84ca749f3c3e89",
        "name": "打电话"
    },
    {
        "source": 238,
        "target": 15127,
        "count": 5,
        "direction": 0,
        "relationId": "6e0ab30c486f41ed80a49d4db90bf525",
        "name": "发邮件"
    },
    {
        "source": 336,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "cbe20ff881444ebd83519b40fd1531e3",
        "name": "发短信"
    },
    {
        "source": 15127,
        "target": 253,
        "count": 1,
        "direction": 0,
        "relationId": "38a68fc7416b4837a0731ccb9d1f5e8d",
        "name": "聊天"
    },
    {
        "source": 15127,
        "target": 103,
        "count": 19,
        "direction": 0,
        "relationId": "acd625b5d37845a699306b56fe32751d",
        "name": "聊天"
    },
    {
        "source": 326,
        "target": 15127,
        "count": 1,
        "direction": 0,
        "relationId": "8565ce9c02f6486a81f8d0d455d71f70",
        "name": "打电话"
    }
];
var defaultOption = {
    multiSelect: true,
    maxTextLength: 12,
    enableAnimation: true,
    defaultSize: 40,
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

function circleCenter(r, pointA, pointB) {

    var disY = Math.sqrt(Math.pow((pointB.x - pointA.x), 2) + Math.pow((pointB.y - pointA.y), 2)) / 2;
    var mX = pointB.x - disY,
        mY = pointB.y;

    var centerX = mX;
    var centerY = mY - Math.sqrt(Math.pow(r, 2) - Math.pow(disY, 2));
    return {
        x: centerX,
        y: centerY
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
            option: {
                enableAnimation: false
            }
        }
    },
    methods: {
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
        getClientBound: function () {
            var panel = this.$refs['panel'];
            var width = panel.clientWidth,
                height = panel.clientHeight;
            return {
                width: width,
                height: height
            };
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

            var nodePanels = nodes.append('foreignObject').classed('img-panel', true)
                .attr('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                })
                .attr('height', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2;
                })
                .attr('x', function (d) {
                    var radius = _this.getRadius(d);
                    return -radius;
                }).attr('y', function (d) {
                    var radius = _this.getRadius(d);
                    return radius;
                });
            nodePanels.append('xhtml:div').classed('node-content', true)
                .style('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                }).style('height', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                })
                .style('line-height', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                })
                .style('background-color', function (d) {
                    if (!d.avatarUrl) return;
                    let img = new Image();
                    img.src = d.avatarUrl;
                    this.style.backgroundColor = '#fff';
                    this.appendChild(img);
                    return '#fff';
                });

            var textPanel = nodes.append('foreignObject').classed('text-panel', true).style('width', function (d) {
                    var radius = _this.getRadius(d);
                    return radius * 2 + 'px';
                }).style('height', '30px')
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
                    // var name = 'Name';
                    var text = 'nan';
                    this.innerHTML = '';
                    var textNode = document.createElement('span');
                    textNode.innerText = text;
                    // textNode.title = name;
                    this.appendChild(textNode);
                    var width = textNode.offsetWidth;
                    var marginLeft = (radius * 2 - width) / 2 + 'px';
                    return marginLeft;
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
        initData() {
            this.renderLinks()
            this.renderNodes()
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
            var simulation = this.ui.simulation;
            // simulation.force('collide',d3.forceCollide().radius(function (d) {
            //     return _this.getRadius(d) + 50;
            // }));
            while (true) {
                if (simulation.alpha() <= simulation.alphaMin()) {
                    break;
                }
                simulation.tick();
            }
            simulation.force('collide', null);
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
            this.layoutNodes()
            this.layoutLinks()
        },
    },
    watch: {

    },
    mounted() {
        let _this = this;
        this.renderContainer()
        this.initData()
        this.layout();
        setTimeout(function () {
            _this.option.enableAnimation = true
        }, 1000)
    }
}