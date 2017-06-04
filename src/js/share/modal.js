(function($){
    window.Modal = function () {};
    Modal.extend = jQuery.extend;
    Modal.extend({
        init:function(opts){
            var df = {
                callback:function(){

                }
            }
            var options = $.extend({},df,opts); 
            var $parent = $('.modal');
            $parent.fadeIn();
            $parent.css('display','flex');
            var $modalBox = $('.modal .modal-box');
            // $parent.click(function(e){
            //     e.preventDefault;
            //     $(this).fadeOut();
            // })
            $parent.on('click','.close,.chancel',function(e){
                e.preventDefault;
                $parent.fadeOut('slow', function() {    
                });
            });
            $parent.on('click','.sure',function(e){
                e.preventDefault;
                options.callback();
                $parent.fadeOut('slow', function() {    
                });
            });
            $modalBox.find('.title').text(options.title);
            $modalBox.find('.bd').html(options.domstr);
        }
    }) 
})(jQuery);
