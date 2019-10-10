import * as d3 from 'd3';
// import data from '../../data/relation.json'
export default {
    name: 'nodes-graph',
    methods: {
        init() {
            // d3.selectAll("p").style("color", "blue");
            // d3.select("body").style("background-color", "black");

            // d3.selectAll("p").style("color", function (d, i) {
            //     return i % 2 ? "#333" : "red";
            // });

            // d3.selectAll("p")
            //     .data([4, 8, 15, 16, 23, 42])
            //     .style("font-size", function (d) {
            //         return d + "px";
            //     });

            // d3.select("body")
            //     .selectAll("p")
            //     .data([4, 8, 15, 16, 23, 42])
            //     .append("p")
            //     .text(function (d) {
            //         return "I’m number " + d + "!";
            //     });

            // var p = d3.select("body")
            //     .selectAll("p")
            //     .data([4, 8, 15, 16, 12,22,42,111])
            //     .text(function (d) {
            //         return d + '-';
            //     });
            // p.exit().append("p")
            //     .text(function (d) {
            //         return d;
            //     });

            // d3.select("body").transition()
            //     .duration(2000)
            //     .style("background-color", "black");

            // d3.selectAll("p").style("color", function() {
            //     return "hsl(" + Math.random() * 360 + ",100%,50%)";
            //   });

            // d3.selectAll("p").style("color", function(d, i) {
            //     return i % 2 ? "pink" : "#eee";
            //   });

            // var body = d3.select("body");
            // var div = body.append("div");
            // div.html("Hello, world!");

            let data = [30, 20, 39, 20, 39, 20]
            // d3.select(".chart")
            //     .selectAll("div")
            //     .data(data)
            //     .enter().append("div")
            //     .style("width", function (d) {
            //         return d * 10 + "px";
            //     })
            //     .text(function (d) {
            //         return d;
            //     });

            // var x = d3.scaleLinear()
            //     .domain([0, d3.max(data)])
            //     .range([0, 420]);
            // d3.select(".chart")
            //     .selectAll("div")
            //     .data(data)
            //     .enter().append("div")
            //     .style("width", function (d) {
            //         return x(d) + "px";
            //     })
            //     .text(function (d) {
            //         return d + '%';
            //     });
            var width = 420,
                barHeight = 20;
            var x = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([0, width])
            var chart = d3.select('.chartSvg')
                .attr('width', width)
                .attr('height', barHeight * data.length)
            var bar = chart.selectAll('g')
                .data(data)
                .enter().append('g')
                .attr('transform', function (d, i) {
                    return 'translate(0,' + i * barHeight + ')';
                })
            bar.append('rect')
                .attr('width', x)
                .attr('height', barHeight - 1)
            bar.append('text')
                .attr('x', function (d) {
                    return x(d) - 3;
                })
                .attr('y', barHeight / 2)
                .attr('dy', '0.35em')
                .text(function (d) {
                    return d;
                })
        }
    },
    mounted() {
        this.init()
    }
}