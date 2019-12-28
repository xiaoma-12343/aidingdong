const repeat = function(item){
    var obj = {}
    for(var i = 0; i<item.length; i++){
        var cur = item[i].name
        if(typeof obj[cur] != 'undefined'){
            item[i] = item[item.length-1]
            item.length--
            i--
            continue;
        }
        obj[cur] = cur
    }
    obj = null;
    return item

}

export default repeat