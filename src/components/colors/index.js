import * as d3 from 'd3';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        renderRect() {
            var svg = d3.select("#barChart").append("svg")
                .attr("width", 200)
                .attr("height", 210)
            svg = d3.select('svg');
            var data = [100, 250, 175, 200, 20];
            var rectWidth = 20,
                height = 200;
            svg.selectAll('rect')
                .data(data).enter().append('rect')
                .attr('x', (d, i) => i * rectWidth)
                .attr('y', d => height - d)
                .attr('width', rectWidth)
                .attr('height', d => d)
                .attr('fill', 'pink')
                .attr('stroke', '#fff')
        },
        renderLine() {
            
        }
    },
    mounted() {
        this.renderRect();
        this.renderLine();
    }
}