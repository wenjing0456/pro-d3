<template>
    <div class="hello">
        <!-- nodes-graph -->
        <p>1234</p>
        <p>234</p>
        <p>1234</p>
        <p>234</p>
        <p>1234</p>
        <p>234</p>
        <div class="chart">

        </div>
        <svg class="chartSvg"></svg>
        <div class="test">
            test
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
</style>