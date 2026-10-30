
; /* Start:"a:4:{s:4:"full";s:91:"/local/templates/trassir.ru/components/bitrix/news.list/main_slider/script.js?1606294319188";s:6:"source";s:77:"/local/templates/trassir.ru/components/bitrix/news.list/main_slider/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* End */
;
; /* Start:"a:4:{s:4:"full";s:96:"/local/templates/trassir.ru/components/bitrix/main.include/main_products/script.js?1607005226629";s:6:"source";s:82:"/local/templates/trassir.ru/components/bitrix/main.include/main_products/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(() => {
    $('.products__header-selector-item').click(function(e) {
        
        $('.products__header-selector-item').removeClass('products__header-selector-item_selected');
        e.target.classList.add('products__header-selector-item_selected');
        $.get('/dev/ajax/main_products.php?ONLY_IMAGE=Y&SECTION_ID=' + e.target.dataset.section_id)
            .success(function(data) {
                $('#main_products').html(data);
            })
            .complete(function() {
                window.products_swiper.destroy()
                pages.mainPage.initProducts()
            });
    });
})
/* End */
;; /* /local/templates/trassir.ru/components/bitrix/news.list/main_slider/script.js?1606294319188*/
; /* /local/templates/trassir.ru/components/bitrix/main.include/main_products/script.js?1607005226629*/
