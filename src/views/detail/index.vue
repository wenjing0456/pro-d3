<template>
    <div class="container">
        <div class="header-bar">
            <ul class="tabList">
                <li class="active">条型图<span>|</span></li>
                <li>tracks 轨迹</li>
            </ul>
        </div>
        <div>
            <div class="barChart">
                <Colors/>
            </div>
            <div class="tracks">
                <Tracks/>
            </div>
            <div class="svgTest">
                <svg width="500" height="300">
                    <rect x="20" y="20" rx="20" ry="20" width="200" height="100" style="fill: aqua; stroke: azure;"></rect>
                    <circle cx="80" cy="60" r="10" style="fill: black;"></circle>
                    <circle cx="160" cy="60" r="10" style="fill: black;"></circle>
                    <ellipse cx="120" cy="80" rx="6" ry="20" style="fill: #F6CB90;"></ellipse>
                    <line x1="120" y1="120" x2="120" y2="180" style="fill: black; stroke:black; stroke-width:4;"></line>
                    <!-- <path d="M30,100 C100,20 190,20 270,100 S400,180 450,100" style="fill: white; stroke:black; stroke-width:3"></path> -->
                    <text x="200" y="150" dx="-5" dy="5" rotate="180" textLength="90">
                        I <tspan fill="red">love</tspan> D3
                    </text>
                    <!-- 定义滤镜 -->
                    <defs>
                        <filter id="GaussianBlur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur>
                        </filter>
                    </defs>
                    <!-- 定义渐变 -->
                    <defs>
                        <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#F00"/>
                            <stop offset="100%" stop-color="#0FF"/>
                        </linearGradient>
                    </defs>
                    <rect x="300" y="100" width="150" height="50" fill="red" filter="url(#GaussianBlur)"></rect>
                    <rect x="300" y="180" width="300" height="50" fill="url(#myGradient)"></rect>

                </svg>
            </div>
            <div class="textD3">
                <Testd3/>
            </div>
        </div>
    </div>
</template>

<script>
    import Colors from '@/components/colors/index.vue'
    import Testd3 from '@/components/testd3/index.vue'
    import Tracks from './track/index.vue'
    export default {
        name: 'app',
        components: {
            Colors,
            Testd3,
            Tracks
        }
    }
</script>

<style scoped lang="less">
    .container{
        p{
            font-size: 14px;
        }
    }
    .header-bar{
        text-align: center;
    }
    .tabList{
        width: auto;
        margin: 10px auto;
        padding-bottom: 10px;
        display: inline-block;
        overflow: hidden;
        li{
            float: left;
            line-height:30px;
            color: chocolate;
            span{
                padding: 0 10px;
                color: #ccc;
            }
        }
        li.active{
            color: chocolate;
        }
    }
</style>