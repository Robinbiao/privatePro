var pBuydetail = avalon.define({
    $id:'pBuydetail',
    gradeTo:3,
    name:'VIP会员',
    spec:'',
    price:98,
    newMsg:{},
    lastMsgList:[],
    recommend:'',
    init:function(){
        var gradeTo = getUrlParam('grade');
        pBuydetail.gradeTo = gradeTo;
        var callback = function (data) {
            if(data.code === 1000){
                var currentGrade = data.data.grade;
                var gradelist = data.data.member;
                pBuydetail.recommend = data.data.recommend;
                pBuydetail.spec = gradelist[pBuydetail.gradeTo-1].spec;
                pBuydetail.name = gradelist[pBuydetail.gradeTo-1].name;
                pBuydetail.price = gradelist[pBuydetail.gradeTo-1].price-gradelist[currentGrade-1].price; 
            }
        }
        GetData.getAjax('/home/wealth/member',{},callback);
        $("#city").citySelect({
            prov:'湖南',
            nodata:"none"
        });
        $("#jobclass").citySelect({
            prov:'IT',
            nodata:"none",
            url:{"citylist":[
                    {p:'IT'},{p:'公务员'}
                ]}
        });
        $("#source").citySelect({
            prov:'微信',
            nodata:"none",
            url:{"citylist":[
                    {p:'微信'},{p:'QQ'},{p:'微博'},{p:'线下推广'},{p:'朋友介绍'},{p:'今日头条'}
                ]}
        });
        pBuydetail.getMessage();
    },
    readProtocol:function(){
        //console.log(111);
        Modal.init({
            title:'用户使用服务协议',
            domstr:'这是我司相关用户使用协议这是我司相关用户使用协议这是我司相关用户使协'
        })
    },
    buy:function(){
        //$('.userinfo').css('display','flex');
        if(!$("[name='agree']").is(':checked')){
            Modal.init({
                domstr:'用户使用服务协议未勾选',
                callback:function(){
                    $('.modal').fadeOut();
                }
            });
            return;
        }
        var params ={
            grade:pBuydetail.gradeTo,
            money:pBuydetail.price,
            recommend:pBuydetail.recommend
        };

        var payback = function(data){
            // var modalParams ={
            //     domstr:data.msg
            // }
            // if(data.code===1000){
            //     modalParams.callback=function(){
            //         window.location.href = './center.html';
            //     }  
            // };
            // Modal.init(modalParams);
            if(data.code==1000){
                var prepay_id = data.data;
                MUSTPAY .init ({ 
                     'apps_id': 'd349daadc9b14f44aab22eb4fa486f7f', //MustPay系统分配的应用ID号 2
                     'prepay_id': prepay_id, //商户通过统一下单接口获取的预支付ID 3
                     'pay_type': 'union_pay_pub' //支付通道简称 4
                });
            }
        }
        GetData.getAjax('/home/mustpay/grade_up',params,payback,{type:'POST'});
    },
    getUserInfo:function(){
        $('.sure .tips').css('display','block');
        if(!$('[name = "name"]').val()){
            $('.sure .tips span').text('请输入您的姓名');
            return
        }else if(!$('[name = "tel"]').val()){
            $('.sure .tips span').text('请输入您的手机号码');
            return
        }
        if(!(/^1[34578]\d{9}$/.test($('[name = "tel"]').val()))){
            $('.sure .tips span').text('请输入正确的手机号码');
            return
        }
        $('.sure .tips').css('display','none');
        var inform = $('#infoform').serializeArray();
        var params = {};
        $.each(inform,function(){
            params[this.name] = this.value;
        });
        var setback = function(data){
            $('.userinfo').css('display','none');
            var modalParams ={
                domstr:data.msg,
                chancel:false
            }
            if(data.code===1000){
                modalParams.callback=function(){
                    window.location.href = './center.html';
                }  
            };
            Modal.init(modalParams);
        }
        GetData.getAjax('/home/wealth/changeinfo',params,setback,{type:'POST'});
    },
    getMessage:function(num){
    
        var newback = function (data) {
            if(data.code === 1000){
                pBuydetail.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pBuydetail.lastMsgList = data.data;
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
