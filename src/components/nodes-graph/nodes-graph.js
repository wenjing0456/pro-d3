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

            var p = d3.select("body")
                .selectAll("p")
                .data([4, 8, 15, 16, 12,22,42,111])
                .text(function (d) {
                    return d + '-';
                });
            p.exit().append("p")
                .text(function (d) {
                    return d;
                });
        }
    },
    mounted() {
        this.init()
    }
}