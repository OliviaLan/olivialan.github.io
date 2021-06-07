export const file_exist = function (file_address = "./", file_name = []) {
    
    let xmlhttp;    
    let yourFileURL;
    let result;
    
    if(window.XMLHttpRequest) {    
        xmlhttp = new XMLHttpRequest();//其他浏览器    
    } else if (window.ActiveXObject) {    
        try {    
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");//旧版IE    
        } catch (e) { }  
    
        try {    
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//新版IE    
        } catch (e) { } 
    
        if (!xmlhttp) {    
            window.alert("不能创建XMLHttpRequest对象");    
        }    
    }    

    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = yourFileURL;
            console.log("hello");
        } else if (xmlhttp.status == 404) {
            result = "";
            console.log("bitch");
        }
    }

    // xmlhttp.onerror = function () {
    //     result = "";
    //     console.log("bitch");
    // }
    
    for (let i = 0; i < file_name.length; i++) {
        yourFileURL = file_address.concat(file_name[i]);
        xmlhttp.open("GET", yourFileURL, true);
        xmlhttp.send(null);

        if(result && result.length > 0) {
            return result;
        }
    }

    return "";
}
