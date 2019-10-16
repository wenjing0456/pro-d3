<template>
    <div class="container">
        <span class="w-subTitle">Tracks</span>
        <div id="tracksId" class="tracksWrap">
            <div class="analysis-location-tracks">
                <div class="map-wrapper" ref="mapEl">
                    <MapComp :src="mapUrl" :paths="paths" :markers="markers" :renderMarkerHtml="renderHtml"
                        :modes="['Track','Marker']" @track-click="onTrackClick" @marker-click="onMarkerClick"
                        @click="onLayerClick"></MapComp>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
    .container {}

    .tracksWrap {
        border: 1px solid #ccc;
    }
</style>