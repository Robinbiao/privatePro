$(function(){
    var inWx = false;
    var shareToQQFriends=function(){
        var p = {
            url:location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
            desc:'', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
            title:pageMessage['title'], /*分享标题(可选)*/
            summary:'', /*分享摘要(可选)*/
            pics:pageMessage["pic"], /*分享图片(可选)*/
            flash: '', /*视频地址(可选)*/
            site:'易观智库', /*分享来源(可选) 如：QQ分享*/
            style:'201',
            width:32,
            height:32
        };
        var s = [];
        for(var i in p){
            s.push(i + '=' + encodeURIComponent(p[i]||''));
        }

//      var shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?'+s.join('&');
//      $("[dataType='shareQQFriends']").on("click",function(){
//          window.open(shareUrl);
//      });
    };

    var shareToQQQzone=function(){
        var p = {
            url:location.href,
            showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
            desc:'',/*默认分享理由(可选)*/
            summary:'',/*分享摘要(可选)*/
            title:pageMessage['title'],/*分享标题(可选)*/
            site:'易观智库',/*分享来源 如：腾讯网(可选)*/
            pics:pageMessage["pic"], /*分享图片的路径(可选)*/
            style:'203',
            width:98,
            height:22
        };
        var s = [];
        for(var i in p){
            s.push(i + '=' + encodeURIComponent(p[i]||''));
        }

        var shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&');
        $("[dataType='shareQQQzone']").on("click",function(){
            window.open(shareUrl);
        });
    };

    var shareToSina = function () {
        var p = {
            url: location.href,
            appkey: '867549482', /*ID */
            source: '',
//            sourceUrl:'',
            content: '',
            title: pageMessage['title'],
//            site:'',
            pic: pageMessage["pic"],
            searchPic: true,
            width: 440,
            height: 430
        };
        var s = [];
        for (var i in p) {
            s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var shareUrl = 'http://service.weibo.com/share/share.php?' + s.join('&');
        $("[dataType='shareSina']").on("click", function () {
            window.open(shareUrl);
        });

    };

    $("#fenX").click(function(){
        if(!inWx){
//           隐藏QQ、朋友、朋友圈
            $(".share_where li:eq(0)").hide();
            $(".share_where li:eq(2)").hide();
            $(".share_where li:eq(3)").hide();
        }else{
            $(".share_where li:eq(4)").hide();
        }
    })

    var shareToWx = function () {
        function showWxShare() {
            $("[dataType='shareWXFriends'],[dataType='shareWXQ'],[dataType='shareQQFriends'],[dataType='shareEWM']").on("click", function () {
                if (!inWx) {
                    $(".shareWX").show();
                    $(".shareOut").show();
                } else {
                    $(".shareWX").show();
                    $(".shareIn").show();
                    if ($(this).attr("dataType") == "shareWXQ") {
                        $("[dataType='PY']").show();
                    } else if($(this).attr("dataType") == "shareWXFriends"){
                        $("[dataType='HY']").show();
                    }else
                    {
                        $("[dataType='QQY']").show();
                    }
                }
                $(".shareOut,.shareIn").on("click", function () {
                    $(".maskBackground,.share,.shareWX,.shareIn,.shareOut,[dataType='PY'],[dataType='HY'],[dataType='QQY']").hide();
                });
                $(".share").hide();
            })

        }

        showWxShare();

    };
    var pageInWx = function () {
        inWx = true;
    };

//    if (document.addEventListener) {
//        document.addEventListener('WeixinJSBridgeReady', pageInWx, false);
//    } else if (document.attachEvent) {
//        document.attachEvent('WeixinJSBridgeReady', pageInWx);
//        document.attachEvent('onWeixinJSBridgeReady', pageInWx);
//    }

    var str = location.href;
    $('.QRcode').qrcode(str);

    var init = function(){
//        $(".con_title").ready(function(){//获取页面信息
            getPageMessage();
            shareToQQFriends();//分享到QQ好友
            shareToSina();//分享到新浪微博
            shareToWx();//分享到微信
            setInWxShare();//设置微信内分享
//        });

    };

    var pageMessage={};
    var dataForWeixin ={};
    var getPageMessage = function(){
        var title=$(".con_title").children("p").text();
        if(typeof pdf !='undefined'){
            title =pdf.substring(pdf.lastIndexOf("/"),pdf.lastIndexOf("."));
        }
        if(!title)
            title='';
        pageMessage["id"] = 'wx83594987649165c7';
        pageMessage["title"]=title;
        pageMessage["summary"]="";
        pageMessage["pic"]=GetData.LeadingBrandConfig.server+"/img/shareImg.png"//$(".con_ab img:eq(0)").attr("src");
        dataForWeixin={
            appId:pageMessage["id"],

            MsgImg:pageMessage["pic"],

            TLImg:pageMessage["pic"],

            url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+pageMessage["id"]+'&redirect_uri='+encodeURI(location.href)+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect',

            title:pageMessage["title"],

            desc:pageMessage["summary"],

            fakeid:"",

            callback:function(){}

        };

    }
    init();


    function setInWxShare(){

        var onBridgeReady=function(){
            pageInWx();
            WeixinJSBridge.on('menu:share:appmessage', function(argv){

                WeixinJSBridge.invoke('sendAppMessage',{

                    "appid":dataForWeixin.appId,

                    "img_url":dataForWeixin.MsgImg,

                    "img_width":"120",

                    "img_height":"120",

                    "link":dataForWeixin.url,

                    "desc":dataForWeixin.desc,

                    "title":dataForWeixin.title

                }, function(res){(dataForWeixin.callback)();});

            });

            WeixinJSBridge.on('menu:share:timeline', function(argv){

                (dataForWeixin.callback)();

                WeixinJSBridge.invoke('shareTimeline',{

                    "img_url":dataForWeixin.TLImg,

                    "img_width":"120",

                    "img_height":"120",

                    "link":dataForWeixin.url,

                    "desc":dataForWeixin.desc,

                    "title":dataForWeixin.title

                }, function(res){});
            });

            WeixinJSBridge.on('menu:share:weibo', function(argv){

                WeixinJSBridge.invoke('shareWeibo',{

                    "content":dataForWeixin.title,

                    "url":dataForWeixin.url

                }, function(res){(dataForWeixin.callback)();});

            });

            WeixinJSBridge.on('menu:share:facebook', function(argv){

            (dataForWeixin.callback)();

            WeixinJSBridge.invoke('shareFB',{

                "img_url":dataForWeixin.TLImg,

                "img_width":"120",

                "img_height":"120",

                "link":dataForWeixin.url,

                "desc":dataForWeixin.desc,

                "title":dataForWeixin.title

            }, function(res){});

            });

        };

        if(document.addEventListener){

            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);

        }else if(document.attachEvent){

            document.attachEvent('WeixinJSBridgeReady' , onBridgeReady);

            document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);

        }
    }
});
