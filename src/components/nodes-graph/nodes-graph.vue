<template>
    <div class="hello">
        <!-- nodes-graph -->
        <p>1234</p>
        <p>234</p>
        <p>1234</p>
        <p>234</p>
        <p>1234</p>
        <p>234</p>
        <div ref="panel" class="nodes-graph-panel">
            <svg xmlns="http://www.w3.org/2000/svg" tagIndex="1" width="100%" height="100%" v-if="graphModel">
                <!-- <defs>
                    <marker id="TriangleEnd" viewBox="0 0 16 16" refX="1" refY="8"
                            markerWidth="16" markerHeight="8" orient="auto">
                        <path class="line-arrow" d="M 0 0 L 16 8 L 0 16 z" />
                    </marker>
                    <marker id="TriangleStart" viewBox="0 0 16 16" refX="16" refY="8"
                            markerWidth="16" markerHeight="8" orient="auto">
                        <path class="line-arrow" d="M 16 0 L 0 8 L 16 16 z" />
                    </marker>
                    <marker id="TriangleEndActive" viewBox="0 0 16 16" refX="1" refY="8"
                            markerWidth="16" markerHeight="8" orient="auto">
                        <path class="line-arrow-active" d="M 0 0 L 16 8 L 0 16 z" />
                    </marker>
                    <marker id="TriangleStartActive" viewBox="0 0 16 16" refX="16" refY="8"
                            markerWidth="16" markerHeight="8" orient="auto">
                        <path class="line-arrow-active" d="M 16 0 L 0 8 L 16 16 z" />
                    </marker>
                </defs> -->
            </svg>
            <div class="empty-analysis" v-else>
    
            </div>
        </div>
    </div>
</template>

<script src="./nodes-graph.js"></script>
<style>
    .hello p {
        color: red;
    }

    .chartSvg rect {
        fill: steelblue;
    }

    .chartSvg text {
        fill: white;
        font: 10px sans-serif;
        text-anchor: end;
    }
    .test{
        width: 100px;
        height: 20px;
        background: pink;
        transform: translate(10px,100px)
    }

    /* .chart div {
        margin-top: 10px;
        background: bisque;
        text-align: right;
    }

    .chart rect {
        fill: steelblue;
    }

    .chart text {
        fill: white;
        font: 10px sans-serif;
        text-anchor: end;
    } */
    .nodes-graph-panel{
        border: 1px solid #ccc;
        
    }
    .nodes-graph-panel svg .node{
        width: 40px;
        height: 70px;
    }
</style>