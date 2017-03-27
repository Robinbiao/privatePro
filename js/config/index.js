
$.ajax({
  url:'http://www.examples.xin/home/wealth/member',
  type:'POST',
  //contentType:'application/json',
  data:{},
  dataType:'json',
  success:function (data) {
    console.log(data);
  },
  error:function(data) {
    console.log(data);
  }
})