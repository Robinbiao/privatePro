(function($){
    window.Modal = function () {};
    Modal.extend = jQuery.extend;
    Modal.extend({
        init:function(opts){
            var $parent = $('.modal');
            $parent.fadeIn();
            $parent.css('display','flex');
            var $modalBox = $('.modal .modal-box');
            $parent.on('click','.close,.chancel',function(){
                $parent.fadeOut('slow', function() {    
                });
            });
            $parent.on('click','.sure',function(){
                opts.callback();
                $parent.fadeOut('slow', function() {    
                });
            });
            $modalBox.find('.title').text(opts.title);

        }
    }) 
})(jQuery);
