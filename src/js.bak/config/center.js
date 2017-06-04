var pCenter = avalon.define({
    $id:'pCenter',
    imgurl:'',
    name:'暂无',
    money:'100.00',
    recommend:'0001',
    regtime:'2017-01-01',
    myleader:'乾坤财富',
    gradename:'VIP会员',
    currentPage:'center',
    newMsg:{},
    modalB:false,
    lastMsgList:[],
    init:function(){
        var callback = function (data) {
            if(data.code === 1000){
                console.log(data);
                pCenter.imgurl = data.data.img_url;
                pCenter.name = data.data.name;
                pCenter.money = data.data.money;
                pCenter.imgurl = data.data.img_url;
                pCenter.recommend = data.data.recommend;
                pCenter.regtime = data.data.register_time;
                pCenter.myleader = data.data.p_name;
                pCenter.gradename = data.data.grade_name;
            }
        }
        GetData.getAjax('/home/wealth/personalinfo',{},callback);
        $("#city").citySelect({
            prov:'湖南',
            nodata:"none"
        });
        $("#jobclass").citySelect({
            prov:'生活 | 服务业',
            nodata:"none",
            url:{"citylist":[
                    {p:'生活 | 服务业'},{p:'人力 | 行政 | 管理'},{p:'销售 | 客服 | 采购 | 淘宝'},{p:'酒店 | 餐饮'},{p:'市场 | 媒介 | 广告 | 设计'},{p:'生产 | 物流 | 质控 | 汽车'},{p:'网络 | 通信 | 电子'},{p:'法律 | 教育 | 翻译 | 出版'},{p:'财会 | 金融 | 保险'},{p:'医疗 | 制药 | 环保'},{p:'建筑 | 物业'},{p:'其他'}
                ]}
        });
        $("#source").citySelect({
            prov:'微信',
            nodata:"none",
            url:{"citylist":[
                    {p:'微信'},{p:'QQ'},{p:'微博'},{p:'线下推广'},{p:'朋友介绍'},{p:'今日头条'}
                ]}
        });
        pCenter.getMessage();
    },
    take:function(){
        pCenter.modalB = !pCenter.modalB;
        var domstr = '<div class="form-group clearfix">'
                     +'<p class="tips">可用余额：'+pCenter.money+'</p>'
                     +'<label for="takemoney" class="pholder">请输入提款金额:</label>'
                     +'<div class="colsm"><input  class="form-control" id="takemoney">'
                     +'</div></div><p class="warning">提示：最小提额至少100元整</p>';
        if(pCenter.modalB){
            Modal.init({
                title:'提取现金',
                boxClass:'monqrcode',
                callback:function(){
                    var takemoney = $('#takemoney').val() - 0;
                    $warning = $('.modal-box .bd .warning')
                    if(takemoney>pCenter.money){
                        $warning.text('提示：您输入的金额大于可提金额,请重新输入');
                        return;
                    }
                    if(takemoney<100){
                        $warning.text('提示：最小提额至少100元整');
                        return;
                    }
                    var cashback = function(data){
                        $warning.text(data.msg);
                        $('.modal').on('click','.sure',function(e){
                            $('.modal').fadeOut();
                        })
                        if(data.code == 1000){
                            $('.monqrcode .bd').html("<img src ='www.examples.xin/"+data.data[0].path+"/>");
                        }
                    }
                    GetData.getAjax('/home/wealth/drawcash',{'money':takemoney},cashback);
                },
                domstr:domstr
            });
        }else{
            $('.modal').css('display','flex');
        }
        
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
                pCenter.newMsg = data.data; 
                $('.m-message').css('display','flex');  
                $('.m-message .new').css('display','block');
                $('.m-message .last').css('display','none');
            }else if(data.code ==1111){
                if(!data.info){
                    $('.userinfo').css('display','flex');
                }
            }
        };
        
        var lastback = function (data) {
          if(data.code === 1000){
              pCenter.lastMsgList = data.data;
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
pCenter.init();
