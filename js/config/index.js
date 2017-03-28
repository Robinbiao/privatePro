
var vueMember = new Vue({
  el:'#memberGrade',
  data:{
    gradeList:[]
  }
})
console.log(vueMember);

$.ajax({
  url:'http://www.examples.xin/home/wealth/member',
  type:'POST',
  //contentType:'application/json',
  data:{},
  dataType:'json',
  success:function (data) {
    console.log(data);
    vueMember.gradeList=data.data;
  },
  error:function(data) {
    console.log(data);
  }
})

