//Thanks Ian Arawjo!!! https://github.com/ianarawjo/lcalcgame

function pointInRect(p, rect) {
    return p.x >= rect.x && p.x < rect.x + rect.w && p.y >= rect.y && p.y < rect.y + rect.h;
}

function intersects(r1, r2) {
    //console.log(r1.position.x + " and " + r1.position.y);
    //return !(r2.x > r1.x + r1.w || r2.x + r2.w < r1.x || r2.y > r1.y + r1.h || r2.y + r2.h < r1.y);
    return !(r2.position.x > r1.position.x + r1.w || r2.position.x + r2.w < r1.position.x || r2.position.y > r1.position.y + r1.h || r2.position.y + r2.h < r1.position.y);
}

function clipToRect(upperLeftPos, itemSize, clipOrigin, clipSize) {
    var q = clonePos(upperLeftPos);
    var right_boundary = clipOrigin.x + clipSize.w - itemSize.w;
    var left_boundary = clipOrigin.x;
    var top_boundary = clipOrigin.y;
    var bot_boundary = clipOrigin.y + clipSize.h - itemSize.h;
    if (q.x > right_boundary) q.x = right_boundary;else if (q.x < left_boundary) q.x = left_boundary;
    if (q.y > bot_boundary) q.y = bot_boundary;else if (q.y < top_boundary) q.y = top_boundary;
    return q;
}
//End thanks

function containsObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == obj) return true;
    }
    return false;
}