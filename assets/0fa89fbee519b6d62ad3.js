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