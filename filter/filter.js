/**
 * 价格过滤格式
 * @param {*}  = [str]  字符格式价格 	【价格由分转换成元，保留两位小数】
 */
let priceFloat = (str) => {
    var str1 = str / 100;
    var value = Math.round(parseFloat(str1)*100)/100;
    var s = value.toString().split(".");
    if(s.length == 1){
      value = value.toString()+".00";
      return value;
    }
    if(s.length > 1){
      if(s[1].length < 2){
        value = value.toString()+"0";
      }
      return value;
    }
}

/**
 * 时间戳转换成时间格式
 * @param {*} value		传入需要格式化的时间戳 【年-月-日 时:分】 
 */
let timeFilter = (value) => {
		// console.log('进入过滤器');
	    if (!value) return '';
			
	    value = value * 1000;
	    var date = new Date(value);
	    var M = date.getMonth() + 1;
	    var y = date.getFullYear();
	    var d = date.getDate();
	    var h = date.getHours();
	    var F = date.getMinutes();
	    var s = date.getSeconds();
	    
	    if (M < 10) M = "0" + M;
	    if (d < 10) d = "0" + d;
	    if (h < 10) h = "0" + h;
	    if (F < 10) F = "0" + F;
	    if (s < 10) s = "0" + s;
	
		return y + '-' + M + '-' + d + ' ' + h + ':' + F ;
}


/**
 * 时间戳转换成时间格式
 * @param {*} value		传入需要格式化的时间戳 【年-月-日】 
 */
let dateFilter = (value) => {
	    if (!value) return '';
			
	    value = value * 1000;
	    var date = new Date(value);
	    var M = date.getMonth() + 1;
	    var y = date.getFullYear();
	    var d = date.getDate();
	    var h = date.getHours();
	    var F = date.getMinutes();
	    var s = date.getSeconds();
	    
	    if (M < 10) M = "0" + M;
	    if (d < 10) d = "0" + d;
	    if (h < 10) h = "0" + h;
	    if (F < 10) F = "0" + F;
	    if (s < 10) s = "0" + s;
	
		return y + '-' + M + '-' + d;
}

/**
 * 字符串转换成数组
 */
let transformArr = (str) => {
	let arr = str.split('.');
	
	return arr;
}



export {
	priceFloat,
	timeFilter,
	transformArr,
	dateFilter
};
