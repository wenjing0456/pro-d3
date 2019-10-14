<template>
    <div class="hello">
        <!-- <button @click="startRender">switch {{ option.enableAnimation }}</button> -->
        <div ref="panel" class="nodes-graph-panel">
            <button class="buttonIcon" @click="toClick">click</button>
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
        width: 80vw;
        height: 70vh;

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