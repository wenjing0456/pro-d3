import * as L from 'leaflet'
import * as d3 from 'd3'
import SvgLayer from './svg-layer'
function relativeUrl(url){
    const origin = location.origin,
        pathname = location['pathname'] || '';
    return origin + pathname + url;
}
function key(start,end){
    let latLngs = [start, end];
    latLngs.sort(function (v1,v2) {
        const result = v1[0] - v2[0];
        if(result > 0){
            return 1;
        }else if(result < 0){
            return -1;t
        }
        return 0;
    });
    latLngs = latLngs.map(function (latLng) {
        return latLng.join(',');
    });
    return latLngs.join('-');
}
export default L.TrackLayer = SvgLayer.extend({
    options: {
        arrow:false,
        onTrackClick:null,
        propagation:false
    },
    clazz: 'track-layer',
    _disMap:{},
    _pendingTask:null,
    _pendingPaths:[],
    _lineContainer:null,
    initialize: function (option) {
        if(!option){
            return;
        }
        this.options.arrow = option.arrow;
        this.options.propagation = option.propagation;
        this.options.onTrackClick = option.onTrackClick;
    },
    computeCtrlDis: function (_key,initVal,direction) {
        if(direction !== false){
            direction = true;
        }
        let disArray = this._disMap[_key];
        if(!disArray){
            disArray = this._disMap[_key] = [];
        }
        let dis = initVal;
        while(disArray.indexOf(dis) >= 0){
            if(!direction){
                dis += 20;
                continue;
            }
            dis = -dis;
            if(disArray.indexOf(dis) >= 0){
                dis = -dis;
                dis += 20;
            }
        }
        disArray.push(dis);
        return dis;
    },
    transformPathLatLng(d){
        return {
            start:this.transformLatLng(d.start),
            end:this.transformLatLng(d.end)
        };
    },
    transformPath:function (d) {
        const position = this.transformPathLatLng(d);
        const startLatLng = position.start,
            endLatLng = position.end;


        const r = Math.sqrt(Math.pow((startLatLng.y - endLatLng.y), 2) + Math.pow((startLatLng.x - endLatLng.x), 2));
        let center = {
            x:Math.round((startLatLng.x + endLatLng.x) / 2),
            y:Math.round((startLatLng.y + endLatLng.y) / 2)
        };

        let relX = Math.abs(endLatLng.x - startLatLng.x) === 0,
            relY = Math.abs(endLatLng.y - startLatLng.y) === 0;

        let x = 0, y = 0, k;
        const _key = key(d.start, d.end);
        let initDis = Math.min(100, r / 2);
        let p = (startLatLng.x - endLatLng.x) / ((startLatLng.y - endLatLng.y) || 1);
        p = -p / (Math.abs(p) || 1);

        initDis = this.computeCtrlDis(_key,initDis,false);
        if(relX && relY){
            x = center.x;
            y = center.y;
        }
        else if(relX){
            y = center.y + initDis;
            x = center.x
        }else if(relY){
            x = center.x + initDis;
            y = center.y;
        }else{
            k = (endLatLng.y - startLatLng.y) / (endLatLng.x - startLatLng.x);
            k = -1 / k;
            const b = center.y - center.x * k;
            if(Math.abs(k) > 1){
                y = center.y + initDis;
                x = (y - b) / k;
                x = Math.round(x);
            }else{
                x = center.x + initDis * p;
                y = x * k + b;
                y = Math.round(y);
            }

        }

        const paths = ['M'];
        paths.push(startLatLng.x);
        paths.push(startLatLng.y);
        paths.push('Q');
        paths.push(x);
        paths.push(y);
        paths.push(endLatLng.x);
        paths.push(endLatLng.y);
        return paths.join(' ');
    },
    bindTrackEvents(){

        this._lineContainer.on('click.marker',() => {
            let onTrackClick = this.options.onTrackClick;
            if(typeof onTrackClick !== 'function'){
                return;
            }
            let event = d3.event;
            let target = event.target;
            target = this.getTargetUtil(target,'track-line','track-lines');
            if(target){
                onTrackClick.call(event.target,target,target._path);
            }
            if(!this.options.propagation){
                event.stopPropagation();
            }
        });
    },
    renderPaths:function (paths) {
        paths = paths || [];

        this._pendingPaths = [].concat(paths);
        const container = d3.select(this._container);
        container.selectAll('.track-lines').remove();
        this._disMap = {};
        this._lineContainer = container.append('g').classed('track-lines',true).attr('pointer-events','all');

        this.bindTrackEvents();
        this._renderPaths();
    },
    _renderPaths(){
        this.cancelNextTick(this._pendingTask);
        let count = 0;
        const paths = this._pendingPaths;
        while(count < 50 && paths.length){
            count++;
            this.renderPath(paths.shift());
        }
        if(paths.length){
            this._pendingTask = this.nextTick(this._renderPaths.bind(this));
        }

    },
    renderPath(path){
        let lineContainer = this._lineContainer;
        let lineEl = lineContainer.append('path').classed('track-line',true).style('pointer-events','all').style('stroke',path.strokeColor || '');
        this.setDomProps(lineEl,path.domProps);
        const node = lineEl.node();
        node._path = path;
        this.updatePosition(node);
        if(this.options.arrow){
            const markerEndUrl = 'url(' + relativeUrl('#map-path-TriangleEnd') + ')';
            lineEl.attr('marker-end',markerEndUrl);
        }
    },
    updatePosition(pathEl){
        d3.select(pathEl).attr('d',this.transformPath(pathEl._path))
    },
    update:function () {
        const self = this;
        const container = d3.select(this._container);
        this._disMap = {};
        container.selectAll('.track-line').each(function () {
            return self.updatePosition(this);
        });
    }
});
L.trackLayer = function (option) {
    return new L.TrackLayer(option);
};
