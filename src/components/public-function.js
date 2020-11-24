export default{
     ellipsAddress:function(address,retainNum){
        return address.substring(0,retainNum||12)+'...'+address.substring(address.length-(retainNum||12))
    },
    transformationTime:function(time){
        let now = new Date(time);
        var year=now.getFullYear(); 
        var month=(now.getMonth()+1).toString().padStart(2,'0');; 
        var date=now.getDate().toString().padStart(2,'0');
        var hour=now.getHours().toString().padStart(2,'0');
        var minute=now.getMinutes().toString().padStart(2,'0');
        var second=now.getSeconds().toString().padStart(2,'0');
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    },
    getSketch:function(funcCode){
        if(window.plus){
            var funcList = JSON.parse(plus.storage.getItem('funcList'))
        }else{
            var funcList = JSON.parse(localStorage.getItem('funcList'))
        }
        return funcList.filter(n => n.funcCode === funcCode)[0].funcCaption
    },
    totalPrice:function(price){
        return price.toFixed(2)
    },
    GetStorage:function(name){
        if(window.plus){
            return JSON.parse(plus.storage.getItem(name));
          }else{
            return JSON.parse(localStorage.getItem(name));
          }
    },
    SetStorage:function(name,data){
        if(window.plus){
            plus.storage.setItem(name,JSON.stringify(data));
          }else{
            localStorage.setItem(name,JSON.stringify(data));
          }
    },
}