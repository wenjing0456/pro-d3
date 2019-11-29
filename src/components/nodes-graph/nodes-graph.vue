<template>
    <div class="hello">
        <div ref="panel" class="nodes-graph-panel">
            <svg xmlns="http://www.w3.org/2000/svg" tagIndex="1" width="100%" height="100%" v-if="graphModel">
            </svg>
            <div class="empty-analysis" v-else>

            </div>
        </div>
    </div>
</template>

<script src="./nodes-graph.js"></script>
<style lang="less">
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
    * {
        margin: 0;
        padding: 0;
    }

    .nodes-graph-panel {
        width: 100vw;
        height: 100vh;

        .buttonIcon {
            width: 80px;
            height: 30px;
        }
    }

    .nodes-graph-panel svg .node {
        /* width: 40px;
        height: 70px; */
        border-radius: 50%;

        .img-panel {
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }

    .nodes-graph-panel svg .node span {
        width: 100%;
        height: 100%;
        background: pink;
        border: 1px solid #4b637f;
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
    }


    .nodes-graph-panel svg .line path {
        stroke: #4b637f;
        stroke-width: 1px;
        fill: none;
        cursor: pointer;
    }
</style>