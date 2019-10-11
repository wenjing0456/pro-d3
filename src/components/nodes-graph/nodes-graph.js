import * as d3 from 'd3';
// import data from '../../data/relation.json'
import cloneDeep from 'clone-deep';
var containerClass = 'graph-canvas';
var linksData = [{
        "source": 20638,
        "target": 254,
        "count": 1,
        "direction": 0,
        "relationId": "0c078fa006954c02a8406645edb96c09",
        "name": "聊天"
    },
    {
        "source": 244,
        "target": 20638,
        "count": 4,
        "direction": 0,
        "relationId": "150dc7ad569c4a968558c1fe7e6d9a74",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 75,
        "count": 5,
        "direction": 0,
        "relationId": "34d4d95088a444689222e48652bc20b8",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 111,
        "count": 1,
        "direction": 0,
        "relationId": "90496c8478d04a20b68e005a250f0a7c",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 29,
        "count": 6,
        "direction": 0,
        "relationId": "95678daae0a74df49211915b7ab5679a",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 172,
        "count": 4,
        "direction": 0,
        "relationId": "30036eb97de84e71b7189878c8b37843",
        "name": "聊天"
    },
    {
        "source": 152,
        "target": 20638,
        "count": 10,
        "direction": 0,
        "relationId": "626e0853e0b046539533eae455d091c0",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 250,
        "count": 4,
        "direction": 0,
        "relationId": "86298a47802a4fdea113c96c5024a4d4",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 87,
        "count": 5,
        "direction": 0,
        "relationId": "ae5a5557cd1646019bbb8b479a071b92",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 20639,
        "count": 15,
        "direction": 0,
        "relationId": "f0495db35de2449f853caa94e2a7c2c5",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 118,
        "count": 20,
        "direction": 0,
        "relationId": "eac564f85b31411fbd81d8c30dc78b87",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 230,
        "count": 4,
        "direction": 0,
        "relationId": "c5a67b9cb75348ad85ebbe71bf063f4d",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 253,
        "count": 7,
        "direction": 0,
        "relationId": "31a9b1e838c44d628ca1414df196eee7",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 42,
        "count": 2,
        "direction": 0,
        "relationId": "429cfbaae9b14fa18ad9781e97e2a6e2",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 100,
        "count": 21,
        "direction": 0,
        "relationId": "ff0d17c7854d45a98ec30044163235a2",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 245,
        "count": 2,
        "direction": 0,
        "relationId": "de66ca9d0b124e18b0d06614cbefd17f",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 207,
        "count": 1,
        "direction": 0,
        "relationId": "0ccd5ec91f8244b4aa289dbbe42f9f72",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 13,
        "count": 3,
        "direction": 0,
        "relationId": "c6eead4aba3d44b08429b8cb30e2b021",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 33,
        "count": 6,
        "direction": 0,
        "relationId": "941fe15eff6f4a028c5b21a7315e5490",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 28,
        "count": 2,
        "direction": 0,
        "relationId": "ea5d75f9498549489401dca268af4af7",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 251,
        "count": 5,
        "direction": 0,
        "relationId": "9fb9f0d1248b4944ae68844a3e1d6aeb",
        "name": "聊天"
    },
    {
        "source": 44,
        "target": 20638,
        "count": 1,
        "direction": 0,
        "relationId": "9659ec808a7143889265064f45c1d09f",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 8,
        "count": 2,
        "direction": 0,
        "relationId": "e036dd7701024c9fa88756b9a9e84982",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 141,
        "count": 1,
        "direction": 0,
        "relationId": "2c142c4bba9948d19fe89d6d51db33d2",
        "name": "聊天"
    },
    {
        "source": 20638,
        "target": 249,
        "count": 3,
        "direction": 0,
        "relationId": "f9c9749ea23a49de8891afcae2291363",
        "name": "聊天"
    },
    {
        "source": 71,
        "target": 20638,
        "count": 2,
        "direction": 0,
        "relationId": "4b0975b30d024c0e9be8a25b550fbeaa",
        "name": "聊天"
    },
    {
        "source": 3,
        "target": 20638,
        "count": 2,
        "direction": 0,
        "relationId": "2b9a3a0e0e5e47859da5bdaa25a4a4fe",
        "name": "聊天"
    },
    {
        "source": 20640,
        "target": 20638,
        "count": 5,
        "direction": 0,
        "relationId": "86388f9cd7644724b6c2f597c04f7aa0",
        "name": "聊天"
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
export default {
    name: 'nodes-graph',
    data() {
        return {
            ui: {
                svg: null,
                brushPanel: null
            },
            graphModel: linksData,
            runtime: {
                currentOption: Object.assign(cloneDeep(defaultOption), this.option),
                nodes: null,
                links: null,
                transform: null,
                shiftKey: false,
                brushMode: false,
                brushing: true,
                selectNodes: [],
                selectLinks: []
            },
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
        init() {
            var _this = this;
            var ui = this.ui;
            var runtime = this.runtime;
            var option = runtime.currentOption;
            var defaultShape = option.defaultShape;
            var container = ui.svg.select('.' + containerClass);
            var nodeGroup = container.append('g').classed('nodes', true);
            console.log(linksData)
            var nodes = nodeGroup.selectAll('.node')
                .data(linksData)
                .enter()
                .append('g')
                .classed('node', true).attr('node-shape', function (d) {
                    var shape = (d.shape || defaultShape) + '';
                    return shape.toUpperCase();
                });
            // nodes.attr('transform', function (d) {
            //     return 'translate(' + d.x + ',' + d.y + ')';
            // });
            var nodePanels = nodes.append('div').classed('img-panel', true)
                .style('width', '40px')
                .style('height', '70px')
                .style('background-color', function () {
                    return 'red'
                }).style('color', 'black').text(123);

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
                    var text = d.name;
                    this.innerHTML = '';
                    var textNode = document.createElement('span');
                    textNode.innerText = text;
                    this.appendChild(textNode);
                    var width = textNode.offsetWidth;
                    var marginLeft = (radius * 2 - width) / 2 + 'px';
                    return marginLeft;
                });


        }
    },
    mounted() {
        this.renderContainer()
        this.init()
    }
}