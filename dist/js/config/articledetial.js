var pArticledetial=avalon.define({$id:"pArticledetial",currentPage:"news",pageId:"",newsData:"",init:function(){var t=window.location.search.toString().split("=")[1],e=function(t){1e3===t.code&&(pArticledetial.newsData=t.data)};GetData.getAjax("/home/wealth/articleinfo",{id:t},e)}});pArticledetial.init();