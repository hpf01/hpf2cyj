 function ajax(method, url, callback, data, flag) {
    var xhr = null;
    if(window.XMLHttpRequest) {
        xhr =  new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                callback(xhr.responseText);
            }else {
                console.log('error');
            }
        }
    }
    method = method.toUpperCase();
    if(method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method, url + '?' + data + '&timer=' + timer, flag);
        xhr.send();
    }else if(method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
}

  
  
function init () {
    bindEvent();
}
function bindEvent() {
    $('#inp').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#submit').trigger('click');
        }
    });
    $('#submit').click(function (e) {
        var val = $('#inp').val();
        if (val) {
            addDom('mine', val);
            getData(val);
            $('#inp').val('');
        }
    })
}

// 文字添加到页面中去
function addDom(who, val) {
    $(' <div class="' + who + '">\
    <div class="avitor"></div>\
    <div class="text">' + val + '</div>\
</div>').appendTo($('.content-box'));
    var scrollHeight = $('.content-box')[0].scrollHeight ;
    var innerHeight = $('.content-box').innerHeight();
    $('.content-box').scrollTop(scrollHeight - innerHeight);
}

 // var paras = "key= 72a5507158ff4ca5aa05043d4c24ce55&info="+sayContent;

function getData(val) {
        var paras = "key=你的key&info="+val;
         ajax('POST',"http://www.tuling123.com/openapi/api",success, paras, true)
          function success(data){
            // console.log(data)
          da=eval("("+data+")")
          addDom('robot', da.text);
          }
    
}
init()

