export function indexOf(items,item,key) {
    var index = -1;
    items.some(function (sel,_index) {
        if(sel === item || (sel[key] && sel[key] === item[key])){
            index = _index;
            return true;
        }
    });
    return index;
}
export function matchTree(items,keyword) {
    if(!items || !items.length){
        return false;
    }
    if(!keyword){
        keyword = '';
    }
    var _matched = false;
    items.forEach(function (item,index) {
        var value = item.name || '';
        var regexp = new RegExp(keyword,'i');
        var matched = regexp.test(value);
        if(matchTree(item.children,keyword)){
            matched = true;
        }
        if(matched){
            _matched = true;
        }
        item.matched = matched;
        if(!keyword){
            item.expand = item._expand;
        }else{
            item.expand = item.matched;
        }

        Vue.set(items,index,item);
    });

    return _matched;
}