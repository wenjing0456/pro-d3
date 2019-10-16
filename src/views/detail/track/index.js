// import * as d3 from 'd3';
import MapComp from '@/components/amap/index'
var data = require("@/data/tracks.json");
let _startQueryId = 1;
function nextQueryType () {
    return 'track_query_' + _startQueryId++;
}
function renderHtml (container,marker) {
    let span = document.createElement('span');
    let className = 'loc-marker icon iconfont iconicon-test2';
    span.className = className;
    span.style.color = marker.color;

    let text = document.createElement('span');
    text.className = 'track-text-marker';
    text.innerText = marker.type === 1 ? '起' : '终';

    container.innerHTML = '';
    container.appendChild(span);
    container.appendChild(text);
}
export default {
    data() {
        return {
            sourceData: [],
            targetList: '',
            markers:[],
            paths:[],
            mapUrl:'null',
            renderHtml:renderHtml,
        }
    },
    components: {
        MapComp
    },
    methods: {
        initData() {
            let results = data.data;
            let targetList = results.map(function (result) {
                let tracks = result.result || [];
                return {
                    id: result.personId,
                    name: '王五',
                    tracks: Object.freeze(tracks),
                    _target: Object.freeze(result),
                    avatar: "http://192.168.3.104:8000/api/oss/030000110000111111201902181916353976250673544320631992330/attach_file/wechat/thi.jpg",
                    color: "#35ca42",
                    expand: false
                };
            });
            this.initPaths(targetList);
            this.targetList = targetList;
        },
        initPaths(targetList){
            let markers = [],paths = [];
            targetList.forEach(function (target) {
                let tracks = target.tracks || [];
                tracks.forEach((track) => {
                    let queryType = track.queryType = nextQueryType();
                    let start = track.start.coordinate,end = track.end.coordinate;
                    let domProps = {
                        'query-type':queryType
                    };
                    let startMarker = {
                        name:track.start.address,
                        latLng:[start.latitude,start.longitude],
                        color:target.color,
                        _target:target && target._target,
                        _data:track,
                        domProps:domProps,
                        type:1 //1 start 2 end
                    };
                    let endMarker = {
                        name:track.end.address,
                        latLng:[end.latitude,end.longitude],
                        color:target.color,
                        _target:target && target._target,
                        _data:track,
                        domProps:domProps,
                        type:2
                    };
                    let path = {
                        start:[start.latitude,start.longitude],
                        end:[end.latitude,end.longitude],
                        startMarker:startMarker,
                        endMarker:endMarker,
                        strokeColor:target.color,
                        _target:target && target._target,
                        domProps:domProps,
                        _data:track
                    };
                    startMarker._path = path;
                    endMarker._path = path;
                    paths.push(path);
                    markers.push(startMarker);
                    markers.push(endMarker);
                });
            });

            this.markers = Object.freeze(markers);
            this.paths = Object.freeze(paths);
        },
        onTrackDetailItemClicked(track){
            let el = this.$refs['mapEl'];
            let path = el.querySelector('path[query-type="' + track.queryType + '"]');
            let event = new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
                view: window
            });
            path.dispatchEvent(event);
        },
        onTrackClick(){
            console.log('onTrackClick')
        },
        onMarkerClick(){
            console.log('onMarkerClick')
        },
        onLayerClick(){
            console.log('onLayerClick')
        }
    },
    mounted() {
        this.initData();
    }
}