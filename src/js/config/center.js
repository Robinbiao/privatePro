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
    },
    take:function(){
        var domstr = '<div class="form-group clearfix">'
                     +'<p class="tips">可用余额：'+pCenter.money+'</p>'
                     +'<label for="takemoney" class="pholder">请输入提款金额:</label>'
                     +'<div class="colsm"><input  class="form-control" id="takemoney">'
                     +'</div></div><p class="warning"></p>'
        Modal.init({
            title:'提取现金',
            callback:function(){
                var takemoney = $('#takemoney').val() - 0;
                $warning = $('.modal-box .bd .warning')
                if(takemoney>pCenter.money){
                    $warning.text('您输入的金额大于提额金额,请重新输入');
                    return;
                }
                var cashback = function(data){
                    $warning.text(data.msg);
                    //if(data.code==1000){
                      $('.modal').on('click','.sure',function(e){
                        $('.modal').fadeOut();
                      })
                    //}
                }
                GetData.getAjax('/home/wealth/drawcash',{'money':takemoney},cashback);
            },
            domstr:domstr
        });
    }
});
pCenter.init();
