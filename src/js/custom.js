

(function(){
    
    /*
        iframe trigger
    */    

    var el = document.querySelectorAll('.btn-iframe-trigger');
    if (el.length > 0)
        utils.forEach(el, function (index, item) {
            item.onclick = function () {
                var prts = utils.getParents(this, 'li'),
                    iframe = prts.querySelectorAll('iframe[data-src]');
                
                if( iframe.length > 0 ){
                    prts.classList.add('iframe-active')
                    iframe[ 0 ].setAttribute('src', iframe[ 0 ].getAttribute('data-src') || '');
                }    
                    
            };
        });
    

    
    
}());