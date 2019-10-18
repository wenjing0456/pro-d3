export function ellipsisText(text,limit){
    text = text || '';
    var chars = [],len = 0,ellipsis = false;
    var _char;
    for(var i = 0;i < text.length;i++){
        if(len > limit){
            ellipsis = true;
            break;
        }
        if(text.charCodeAt(i) >= 255){
            len = len + 2;
        }else{
            len++;
        }
        _char = text[i];
        chars.push(text[i]);
    }
    if(ellipsis){
        chars.push('...');
        len += 3;
    }
    return {
        ellipsis:ellipsis,
        length:len,
        text:chars.join('')
    };
}
export function relativeUrl(url){
    var origin = location.origin,
        pathname = location['pathname'] || '';
    return origin + pathname + url;
}
export function circleCenter(r,pointA,pointB){
    var disY = Math.sqrt(Math.pow((pointB.x - pointA.x),2) + Math.pow((pointB.y - pointA.y),2)) / 2;
    var mX = pointB.x - disY,
        mY = pointB.y;

    var centerX = mX;
    var centerY = mY - Math.sqrt(Math.pow(r,2) - Math.pow(disY,2));

    return {
        x:centerX,
        y:centerY
    };
}