import * as d3 from 'd3';
import data from '../../data/relation.json'
export default {
    name: 'nodes-graph',
    methods:{
        init(){
            var width = 300,
            height = 300;
            var dataset= [30,20,45,12,21,28,46,64,73,78,54];
            var svg = d3.select("body").append("svg")
                    .attr("width", width)
                    .attr("height", height);
            
        }
    },
    mounted(){
        this.init()
    }
}