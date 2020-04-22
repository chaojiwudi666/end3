import CryptoJS from 'crypto-js';
const DES = (string) => {
    let key = "apipartyxinhuaapp1234567";
    let base64 = CryptoJS.enc.Utf8.parse(key);
    let encrypt = CryptoJS.TripleDES.encrypt(string, base64, {
        iv: CryptoJS.enc.Utf8.parse(''), //iv偏移量
        //mode: CryptoJS.mode.CBC, //CBC模式
        mode: CryptoJS.mode.ECB, //ECB模式
        padding: CryptoJS.pad.Pkcs7 //padding处理
    });
    let encryptData = encrypt.toString(); //加密完成后，转换成字符串
    //console.log("DES", encryptData);
    return encryptData;
};
const decrypt = (string) => {
    let key = "apipartyxinhuaapp1234567";
    let base64 = CryptoJS.enc.Utf8.parse(key);
    let decrypt = CryptoJS.TripleDES.decrypt(string, base64, {
        iv: CryptoJS.enc.Utf8.parse(''),
        //mode: CryptoJS.mode.CBC,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    //解析数据后转为UTF-8
   
    let decryptData = decrypt.toString(CryptoJS.enc.Utf8); //加密完成后，转换成字符串
    //console.log("decrypt", decryptData);
    return decryptData;
};
const MD5 = (string) => {
    let md5 = CryptoJS.MD5(string);
    let encryptData  = md5.toString();
    //console.log("MD5", encryptData);
    return encryptData;
};
const isEmptyObject = (obj) => {
    for (var n in obj) { return false }
    return true;
}
var setCookie = (key, value, exdays = 1) => { //默认cookie缓存一天

    document.cookie = key + "=" + value + ";path=/";
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    console.log("setcookie:" + d + " | " + d.getTime() + " | " + expires);
    document.cookie = key + "=" + value + "; " + expires;
}
var getCookie = (key) => {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(key + "=");
        let c_end = 0;
        if (c_start !== -1) {
            c_start = c_start + key.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}
var deleteCookie = (key) => {
    
    setCookie(key, '', -5);
}
var clearAllCookie = () => {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + "=" + ";path=/";
    }
}

var getAppId = () => {
    if (window.location.search.indexOf("appId") > 0) {
        const appId = window.location.search.split("?")[1].split("=")[1];
        console.log(appId);
        return appId;
    } else {
        return '';
    }
}
const checkLogin = (props,callback) =>{
    if(sessionStorage.getItem('isLogin')){
        callback&&callback();
    }else{
        props.history.push("/login");
    }
}
const saveLogin = () =>{
    sessionStorage.setItem('isLogin',true);
}
var Actions = {
    isEmptyObject:isEmptyObject,
    setCookie: setCookie,
    getCookie: getCookie,
    deleteCookie: deleteCookie,
    clearAllCookie: clearAllCookie,
    getAppId: getAppId,
    DES:DES,
    decrypt:decrypt,
    MD5:MD5,
    checkLogin:checkLogin,
    saveLogin:saveLogin,
};
export default Actions;