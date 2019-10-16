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
        </div>
    </div>
</template>

<script>
    import Colors from '@/components/colors/index.vue'
    import Tracks from './track/index.vue'
    export default {
        name: 'app',
        components: {
            Colors,
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