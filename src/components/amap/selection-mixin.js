import * as L from 'leaflet'
// import './plugins/shape'
// import './plugins/selection'
// import './plugins/circle'
// import './plugins/rect'
// import './plugins/polygon'
export const Mode = 'Selection';
export default {
    props:{
        selectionToolbar:{
            type:Boolean,
            default:false
        },
        selection: {
            type: Object
        }
    },
    data(){
        return {
            currentToolbar:'circle'
        };
    },
    computed:{
        selectionEnabled(){
            return this.modeOf(Mode);
        }
    },
    watch:{
        selectionEnabled(){
            this.initMapSelectionLayer();
        },
        selection(){
            if(this._selection === this.selection){
                return;
            }
            if (this.selection) {
                this.enableShapeSelection(this.selection.shape);
            }else{
                const el = this.getEl();
                if(el.selectionLayer){
                    el.selectionLayer.enabled = true;
                    el.selectionLayer.clear();
                }
            }
        }
    },
    methods:{
        enableShapeSelection: function (current, domTrigger,force) {
            if(!current){
                this.currentToolbar = null;
                return;
            }
            const selectionLayer = this.getSelectionLayer()
            if(!force && this.currentToolbar === current) {
                this.currentToolbar = null
                selectionLayer.disableSelection()
                return
            }
            this.currentToolbar = current
            selectionLayer.enableSelection(current, domTrigger ? null : this.selection)
        },
        getSelectionLayer: function () {
            const el = this.getEl();
            return el.selectionLayer
        },
        initMapSelectionLayer: function () {
            const el = this.getEl();
            if(el.selectionLayer){
                return;
            }
            const map = this.map
            const selectionLayer = L.selection().addTo(map)
            selectionLayer.onFinish((selection) => {
                this._selection = selection;
                el.selectionLayer.enabled = false;
                this.$emit('selection-change', selection);
            });
            el.selectionLayer = selectionLayer

            if (this.selection) {
                this.enableShapeSelection(this.selection.shape);
            }else{
                this.enableShapeSelection(this.currentToolbar,true,true);
            }
        }
    },
    mounted(){
        if(this.selectionEnabled){
            this.initMapSelectionLayer();
        }

    }
}
