import MarkerLayer from './plugins/marker'
export const Mode = 'Marker';
export default {
    props: {
        markers: {
            type: Array,
            default () {
                return []
            }
        },
        renderMarkerHtml:{
            type:Function
        },
        updateShape:{
            type:Function
        }
    },
    data(){
        return {
            pendingMarkers:[],
            pendingTask:null
        };
    },
    computed:{
        markerEnabled(){
            return this.modeOf(Mode);
        }
    },
    watch:{
        markers(){
            this.initMarkers();
        }
    },
    methods: {
        initMarkerLayer () {
            const el = this.getEl()
            if (el.markerLayer) {
                return
            }
            let renderHtml = this.renderMarkerHtml || function (container,marker) {
                let span = document.createElement('span');
                span.className = 'loc-marker icon iconfont iconqiepian';
                span.style.color = marker.color;
                span.style.cursor = 'pointer';
                container.innerHTML = '';
                container.appendChild(span);
            };
            el.markerLayer = new MarkerLayer({
                width:30,
                height:40,
                renderHtml:renderHtml,
                update:this.updateShape,
                onMarkerClick:(target,marker) => {
                    this.$emit('marker-click',{
                        target:target,
                        data:marker
                    });
                }
            });
            el.markerLayer.addTo(this.map);
        },
        renderMarkers(){
            const el = this.getEl()
            const markerLayer = el.markerLayer
            markerLayer.renderMarkers(this.markers);
        },
        initMarkers () {
            const el = this.getEl()
            let markerLayer = el.markerLayer;
            if(!el.markerLayer){
                this.initMarkerLayer();
                markerLayer = el.markerLayer
            }
            this.renderMarkers();
        }
    },
    destroyed(){
        const el = this.getEl();
        if(el && el.markerLayer){
            el.markerLayer.destroy();
        }
    },
    mounted(){
        if(this.markerEnabled){
            this.initMarkers();
        }
    }
}
