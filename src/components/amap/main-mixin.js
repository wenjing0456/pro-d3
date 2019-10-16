import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'

const defaultCenter = [34.8, 105];
const defaultOption = {
    zoom: 4,
    center: defaultCenter
};
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        options: {
            type: Object,
            default: function () {
                return defaultOption
            }
        },
        modes:{
            type:[Array,String],
            default(){
                return [];
            }
        }
    },
    computed:{
        enabledModes(){
            return [].concat(this.modes);
        }
    },
    data: function () {
        return {
            map: {}
        }
    },
    methods: {
        modeOf(mode){
            return this.enabledModes.indexOf(mode) >= 0;
        },
        getEl(){
            return this.$refs['el'];
        },
        initMapLayer: function () {
            const el = this.getEl();
            let options = Object.assign(defaultOption,this.options)
            const map = this.map = L.map(el, {
                attributionControl: false,
                zoomControl: false
            });
            map.setView(options.center, options.zoom);
            L.tileLayer(this.src, {
                minZoom: 2,
                maxZoom: 14
            }).addTo(map)
        },
        emitClick(){
            this.$emit('click');
        }
    },
    mounted: function () {
        this.initMapLayer()
    }
}
