let Utils = {
    // 格式化 Upload/image/2019-04-10/5cadb55766440.mp4，补足域名
    "filterUrl": function (oldUrl) {
        var RootUrl = "http://aidingdong_admin.taijichn.com";
        return oldUrl.indexOf("/") === 0 ? RootUrl + oldUrl : oldUrl;
    }
};

export default Utils;