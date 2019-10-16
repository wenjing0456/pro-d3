import * as L from 'leaflet'
import * as d3 from 'd3'
import SvgLayer from './svg-layer'
export default L.MarkerLayer = SvgLayer.extend({
    clazz: 'marker-layer',
    _pendingTask:null,
    _pendingMarkers:[],
    _markerContainer:null,
    options: {
        width:20,
        height:20,
        renderShape:null,
        renderHtml:null,
        propagation:false,
        onMarkerClick:null,
        update:null
    },
    initialize: function (option) {
        if(!option){
            return;
        }
        Object.assign(this.options,option);
    },
    renderMarkers(markers){
        markers = markers || [];
        this._pendingMarkers = [].concat(markers);
        const container = d3.select(this._container);
        container.selectAll('.markers-g').remove();
        this._markerContainer = container.append('g').classed('markers-g',true).attr('pointer-events','all');

        this.bindMarkerEvents();
        this._renderMarkers();
    },
    bindMarkerEvents(){

        this._markerContainer.on('click.marker',() => {
            let onMarkerClick = this.options.onMarkerClick;
            if(typeof onMarkerClick !== 'function'){
                return;
            }
            let event = d3.event;
            let target = event.target;
            target = this.getTargetUtil(target,'marker-el','markers-g');
            if(target){
                if(!this.options.propagation){
                    event.stopPropagation();
                }
                onMarkerClick.call(event.target,target,target._marker);
            }
        });
    },
    _renderMarkers(){
        this.cancelNextTick(this._pendingTask);
        let count = 0;
        const markers = this._pendingMarkers;
        while(count < 50 && markers.length){
            count++;
            this.renderMarker(markers.shift());
        }
        if(markers.length){
            this._pendingTask = this.nextTick(this._renderMarkers.bind(this));
        }
    },
    transformMarker(marker){
        let zoom = this.getMap().getZoom();
        const pos = this.transformLatLng(marker.latLng);
        return 'translate(' + pos.x + ',' + pos.y + ') scale(' + zoom / 5 + ')';
    },
    renderMarker(marker){
        const panel = this._markerContainer;
        const wrapper = panel.append('g').classed('marker-el',true);
        let node = wrapper.node();
        node._marker = marker;
        this.setDomProps(wrapper,marker.domProps);
        this.updateMarker(node);
        this.renderShape(marker,wrapper);
    },
    renderShape(marker,parent){
        const renderShape = this.options.renderShape;
        if(typeof renderShape === 'function'){
            renderShape.call(this,marker,parent);
            return;
        }
        const width = marker.width ? marker.width : this.options.width,
            height = marker.height ? marker.height : this.options.height;
        const htmlWrapper = parent.append('foreignObject').attr('width',width).attr('height',height)
            .attr('x',-width / 2).attr('y',-height / 2);

        this.renderHtml(marker,htmlWrapper);
    },
    renderHtml(marker,container){
        let renderContent = this.options.renderHtml;
        let div = container.append('xhtml:div').classed('marker-html-content',true);
        if(typeof renderContent === 'function'){
            renderContent.call(this,div.node(),marker);
        }else if(marker.innerHTML){
            div.html(marker.innerHTML);
        }
    },
    updateMarker(markerWrapper){
        let marker = markerWrapper._marker;
        d3.select(markerWrapper).attr('transform', this.transformMarker(marker));
    },
    updateShape(wrapper){
        let marker = wrapper._marker;
        let updateShape = this.options.update;
        if(typeof updateShape === 'function'){
            updateShape.call(this,wrapper,marker);
        }
    },
    update:function () {
        const container = d3.select(this._container);
        const self = this;
        container.selectAll('.marker-el').each(function () {
            self.updateMarker(this);
            self.updateShape(this);
        });
    }
});
L.markerLayer = function (option) {
    return new L.MarkerLayer(option);
};
