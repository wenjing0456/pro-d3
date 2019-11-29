import * as d3 from 'd3';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        init() {
            var p = d3.select('body')
                    .selectAll('p')
                    .text('Hello world')

                    p.style('color','red')
                    p.style('font-size','14px')
                    p.append().text('-131')
                    p.data([3,10,70])

            let filterP = p.filter(function(d,v) {
                if(d>5){
                    return true
                }else{
                    return false
                }
            })
            //console.log(filterP);
            //filter 返回过滤后的selection对象
            var _w = 400, _h = 400;
            var svg = d3.select('body')
                        .append('svg')
                        .attr('width',_w)
                        .attr('height',_h)
                        
                    svg.append('circle')
                        .attr('cx','100px')
                        .attr('cy','50px')
                        .attr('r','50px')
                        .attr('fill','red')
        },
        testFn() {
            // console.log('000');
            // 
        }
    },
    mounted() {
        this.init();
        this.testFn();
    }
}