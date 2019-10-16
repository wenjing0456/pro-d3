import * as L from 'leaflet'
import * as d3 from 'd3'
const next = typeof 'requestAnimationFrame' === 'function' ? requestAnimationFrame : function(f){
    return setTimeout(f,16);
};
const cancel = typeof 'cancelAnimationFrame' === 'function' ? cancelAnimationFrame : clearTimeout;
export default L.SvgLayer = L.SVG.extend({
    clazz: 'svg-layer',
    _destroyed:false,
    _initContainer(){
        let result = L.SVG.prototype._initContainer.apply(this,arguments);
        d3.select(this._container).classed(this.clazz,true);
        return result;
    },
    destroy(){
        let _destroyContainer = this._destroyContainer;
        if(_destroyContainer){
            _destroyContainer.apply(this,arguments);
        }
        this._destroyed = true;
    },
    nextTick(fn){
        if(this._destroyed){
            return;
        }
        return next(fn);
    },
    cancelNextTick(id){
        return cancel(id);
    },
    getMap: function () {
        return this._map;
    },
    getTargetUtil(current,targetClass,utilClass){
        if(!current){
            return null;
        }
        while(current && current.getAttribute('class') !== utilClass){
            if(current.getAttribute('class') == targetClass){
                break;
            }
            current = current.parentNode;
        }
        return current;
    },
    setDomProps(selection,domProps){
        if(!domProps){
            return;
        }
        Object.keys(domProps).forEach(function (key) {
            let value = domProps[key];
            if(['boolean','string','number'].indexOf(typeof value) === -1){
                return;
            }
            selection.attr(key,value);
        });
    },
    getEvents: function () {
        const events = L.SVG.prototype.getEvents.call(this);
        events.zoom = L.Util.throttle(function () {
            this.update();
        },100,this);
        events.move =  L.Util.throttle(function () {
            this.update();
        },100,this);
        return events;
    },
    transformLatLng(latLng){
        latLng = [].concat(latLng);
        const map = this.getMap();
        let center = map.getCenter();
        let relX = center.lng / 360;
        if(Math.abs(relX) >= 1){
            relX = Math.round(relX);
        }else {
            relX = 0;
        }

        if(relX){
            latLng[1] += 360 * relX;
        }

        let point = map.latLngToLayerPoint(latLng);
        point.x = Math.round(point.x);
        point.y = Math.round(point.y);
        return point;
    },
    update:function () {}
});
L.svgLayer = function () {
    return new L.SvgLayer();
};
