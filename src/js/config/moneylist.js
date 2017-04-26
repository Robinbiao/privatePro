var mapObj = {
    member:'mypartner',
    friend:'myfriends',
    moneyin:'income_expenditure',
    moneyout:'cashlist',
    myqrcode:'myqrcode',
    service:'service'
}
var pMoneylist = avalon.define({
    $id:'pMoneylist',
    mainTitle:'收入明细',
    currentPage:'center',
    hash:'member',
    listData:[],
    newMsg:{},
    lastMsgList:[],
    init:function(){
        var hash = window.location.hash.replace('#','').split('?')[0];
        pMoneylist.hash = hash;
        var mainTitle;
        if(hash === 'member'){
            mainTitle = '人脉圈';
        }else if(hash === 'friend'){
            mainTitle = '我的好友';
        }else if(hash === 'moneyin' || hash === 'moneyout'){
            hash === 'moneyin' ? mainTitle = '收入明细' : mainTitle = '提现记录';
        }else if(hash === 'myqrcode'){
            mainTitle = '乾坤财富互联网金融资源整合平台，教你如何快速实现财富自由！';
        }else if(hash === 'service'){
            mainTitle = '客服中心';
            
        }
        pMoneylist.mainTitle = mainTitle;
        $('title').text(mainTitle);
        var imgurl
        var callback = function (data) {
            if(data.code === 1000){
                if(hash === 'myqrcode'){
                    imgurl ='//www.examples.xin/'+data.data;
                    var imgstr = '<img src="'+imgurl+'" class="qrimg"/>'
                    $('.content').html(imgstr);
                }else if(hash == 'member'){
                        pMoneylist.listData = data.data;
                        pMoneylist.listData.forEach(function(item){
                            if(!item.is_friend){
                                item.friend = '加好友';
                            }else if(item.is_friend == 1){
                                item.friend = '待确认'
                            }else if(item.is_friend == 2){
                                item.friend = '拒绝'
                            }else if(item.is_friend == 3){
                                item.friend = '好友'
                            }
                        })
                }else if(hash == 'friend'){
                        pMoneylist.listData = (data.data.be_added||[]).concat((data.data.friends||[]));
                }else if(hash == 'service'){
                        var imgstr ='';
                        var imgsev = '//www.examples.xin/';
                        for(var i= 0,len=data.data.length;i<len;i++){
                            imgstr +='<img src="'+ imgsev + data.data[i].path +'" class="qrimg"/>';
                        }
                        $('.content').html(imgstr);
                }else{
                        pMoneylist.listData = data.data;
                } 
            };
            
        }
        if(pMoneylist.hash != 'myqrcode'){
            GetData.getAjax('/home/wealth/'+ mapObj[hash],{},callback);
        }else{
            var recommend =  window.location.href.split('recommend=')[1];
            GetData.getAjax('/home/qrcode/myqrcode/recommend/'+ recommend,{},callback);
        }
        
        pMoneylist.getMessage();
        wxshareinit();
    },
    addFriend:function(id){
        var callback1 = function(data){
            if(data.code == 1000){
                Modal.init({
                    domstr:data.msg,
                    chancel:false,
                    callback:function(){
                        $('.modal').on('click','.sure',function(e){
                            $('.modal').fadeOut();
                        });
                    }
                });

            }
        }
        GetData.getAjax('/home/wealth/addfriend',{id:id},callback1);
    },
    agreeFriend:function(id,num){
        var callback1 = function(data){
            if(data.code == 1000){
                Modal.init({
                    domstr:data.msg,
                    chancel:false,
                    callback:function(){
                        window.location.href = './moneylist.html#friend';
                        $('.modal').on('click','.sure',function(e){
                            $('.modal').fadeOut();
                        });
                        
                    }
                });

            }
        }
        GetData.getAjax('/home/wealth/friend_adopt',{friend_id:id,adopt:num},callback1,{type:'POST'});
    },
    getMessage:function(num){
        var newback = function (data) {
            if(data.code === 1000){
                pMoneylist.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pMoneylist.lastMsgList = data.data;
              $('.m-message').css('display','flex');
              $('.m-message .last').css('display','block');
              $('.m-message .new').css('display','none');
          }
        };
        if(num==1){ //右侧小tips进来
          GetData.getAjax('/home/wealth/noticelist',{},lastback);
        }else{
          GetData.getAjax('/home/wealth/getnotice',{},newback);
        };
        $('.m-message').on('click','.ft .sure',function(){
            $('.m-message').fadeOut();
        });
    }
});
pMoneylist.init();
function wxshareinit(){
      wx.onMenuShareTimeline({
        title: '乾坤财富互联网金融平台',
        desc: '乾坤财富互联网金融资源整合平台，教你如何快速实现财富自由！',
        imgUrl: 'http://www.examples.xin/html/images/scalepic.jpg',
      });
      wx.onMenuShareAppMessage({
        title: '乾坤财富互联网金融平台',
        desc: '乾坤财富互联网金融资源整合平台，教你如何快速实现财富自由！',
        imgUrl: 'http://www.examples.xin/html/images/scalepic.jpg',
      });
};
