import * as L from 'leaflet'
import './plugins/track'
export const Mode = 'Track';
export default {
    props:{
        paths:{
            type:Array,
            default: function () {
                return [];
            }
        }
    },
    computed:{
        trackEnabled(){
            return this.modeOf(Mode);
        }
    },
    watch:{
        paths: function () {
            this.renderPaths();
        }
    },
    methods:{
        renderPaths(){
            const el = this.getEl()
            let pathLayer = el.pathLayer;
            if(!pathLayer){
                this.initPathLayer();
                pathLayer = el.pathLayer;
            }
            pathLayer.renderPaths(this.paths);
        },
        initPathLayer:function () {

            const el = this.getEl();
            if(el.pathLayer){
                return;
            }
            const map = this.map
            const pathLayer = L.trackLayer({
                arrow:false,
                onTrackClick:(target,path) => {
                    this.$emit('track-click',{
                        target:target,
                        data:path
                    });
                }
            }).addTo(map)
            el.pathLayer = pathLayer;

            if(this.paths && this.paths.length > 0){
                this.renderPaths();
            }
        }
    },
    destroyed(){
        const el = this.getEl();
        if(el && el.pathLayer){
            el.pathLayer.destroy();
        }
    },
    mounted(){
        if(this.trackEnabled){
            this.renderPaths();
        }

    }
}
