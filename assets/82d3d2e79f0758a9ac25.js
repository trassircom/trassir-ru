function Header() {
  let headerBlock = $('.header')

  let menu = new Menu()
  let search = new Search()
  let auth = new Auth()

   this.menu = menu;
    this.auth = auth;
    this.search = search;

  function Auth() {
    let selectedAuthTypeBlock = null
    let authBlock = headerBlock.find('.auth')


    /* defining methods */
    this.show = (type) => {
      if (!type) {
        type = 'login'
      }
      hide()
      let sel = (c) => {
        selectedAuthTypeBlock = type
        authBlock.addClass(c)
      }

      switch (type) {
        case 'recover':
          sel('auth_open-recover')
          break
        case 'registration':
          sel('auth_open-registration')
          break
        case 'login':
          sel('auth_open-login')
          break
        case 'authorised':
          sel('auth_open-authorised')
          break
      }
      
    }
    let hide = () => {

      authBlock.removeClass('auth_open-recover')
      authBlock.removeClass('auth_open-registration')
      authBlock.removeClass('auth_open-login')
    }
    this.selectRecover = () => {
      this.show('recover')
    }
    this.selectRegistration = () => {
      this.show('registration')
    }
    this.selectLogin = () => {
      this.show('login')
    }
    this.selectAuthorised = () => {
      this.show('authorised')
    }


    /* defining block events */
    authBlock.find('.auth__link_registration').on('click', this.selectRegistration)
    authBlock.find('.auth__link_recover').on('click', this.selectRecover)
    authBlock.find('.auth__link_login').on('click', this.selectLogin)
    authBlock.find('.header__login-info').on('click', this.selectAuthorised)
  }

  function Menu() {
    /* menu hidden params */
    let opened = false
    let authOpened = false
    let closing = false


    /* defining jquery blocks */
    let menuButton = headerBlock.find('.header__button-menu')
    let menuButtonMobile = headerBlock.find('.header-mobile__menu')
    let menuCloseButtonMobile = headerBlock.find('.header-mobile__close')
    let menuBlock = headerBlock.find('.menu')
    let authButton = headerBlock.find('.header__login-button')
    let authButtonMobile = headerBlock.find('.header-mobile__login')
    let authAuthorisedButton = headerBlock.find('.header__login-info')
    let authAuthorisedButtonMobile = headerBlock.find('.header-mobile__profile')


    /* defining block events */
    menuButton.on('click', (e) => {
      e.stopPropagation()
      if (!opened) {
        this.openWithAuth()
      } else {
        this.close()
      }
    })
    authButton.on('click', (e) => {
      e.stopPropagation()
      if (!opened || !authOpened) {
        this.openWithAuth()
      } else {
        this.close()
      }
    })
    authButtonMobile.on('click', (e) => {
      e.stopPropagation()
      if (!opened || !authOpened) {
        this.openWithAuth()
      } else {
        this.close()
      }
    })
    authAuthorisedButton.on('click', (e) => {
      e.stopPropagation()
      if (!opened || !authOpened) {
        this.openWithAuth('authorised')
      } else {
        this.close()
      }
    })
    authAuthorisedButtonMobile.on('click', (e) => {
      e.stopPropagation()
      if (!opened || !authOpened) {
        this.openWithAuth('authorised')
      } else {
        this.close()
      }
    })
    menuBlock.on('click', (e) => {
      e.stopPropagation()
    })
    menuButtonMobile.on('click', (e) => {
      e.stopPropagation()
      this.open()
    })
    menuCloseButtonMobile.on('click', (e) => {
      e.stopPropagation()
      this.close()
    })


    /* defining methods */
    this.open = () => {
      if (closing) {
        return
      }
      if (search.isOpened()) {
        search.close()
      }
      headerBlock.find('.search_result__links').hide()
    headerBlock.find('#menu_columns').show()
      headerBlock.addClass('header_menu-opened')
      $(document).on('click', function(e) {
            if(e.target.className !== 'header__search-input')
                ui.header.menu.close();
      })
      opened = true
    }
    this.openWithAuth = (type) => {
      if (closing) {
        return
      }
      this.open()
      auth.show(type)
      headerBlock.addClass('header-auth-opened')
      authOpened = true
    }
    this.close = () => {
      if (authOpened) {
        closing = true
        setTimeout(() => {
          headerBlock.removeClass('header-auth-opened')
          closing = false
        }, 300)
      }
      $(document).off('click', this.close)
      headerBlock.removeClass('header_menu-opened')
      opened = false
    }
    this.isOpened = () => {
      return opened
    }
    
    this.openSearch = () => {
        this.openWithAuth();
        $('#menu_columns').hide()
        headerBlock.find('.search_result__links').show()
    }
  }

  function Search() {
    let searchButtonMobile = headerBlock.find('.header-mobile__search')
    let opened = false
    this.isOpened = () => {
      return opened
    }
    this.open = () => {
      if (menu.isOpened()) {
        menu.close()
      }
      headerBlock.addClass('header_search-opened')
      opened = true
    }
    this.close = () => {
      headerBlock.removeClass('header_search-opened')
      opened = false
    }
    searchButtonMobile.on('click', () => {
      if (!opened) {
        this.open()
      } else {
        this.close()
      }
    })
  }

  let windowObject = $(window)
  windowObject.on('scroll', () => {
    if (windowObject.scrollTop() > 0) {
      headerBlock.addClass('header__scrolled')
    } else {
      headerBlock.removeClass('header__scrolled')
    }
  })
}

function MainPage() {
  this.init = null
  let mainPage = $('.main-page')
  if (!mainPage.length) {
    this.init = false
    return
  }
  this.init = true
  let initIndustrySolution = () => {
    let industrySolutionBlock = mainPage.find('.industry-solutions')

    var mySwiper = new Swiper('.industry-solutions__slider', {
      slidesOffsetBefore: 15,
      slidesOffsetAfter: 15,
      spaceBetween: 10,
      slidesPerView: 'auto',
      breakpoints: {
        1200: {
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          spaceBetween: 30,

        }
      }
    })
    industrySolutionBlock.find('.industry-solutions__button-next').on('click', () => {
      mySwiper.slideNext()
    })
    industrySolutionBlock.find('.industry-solutions__button-prev').on('click', () => {
      mySwiper.slidePrev()
    })
  }
  let initHero = () => {
    let sliderBlock = mainPage.find('.js-heroSliderWrapper')
    let sliderContent = sliderBlock.html()
    let recountSlider = () => {
      if ($(document).width() <= 1260) {
        sliderBlock.html('<div class="swiper-wrapper">' + sliderContent + '</div>')
        sliderBlock.addClass('swiper-container')
        let slides = sliderBlock.find('.js-heroSlide')
        slides.each(function () {
          $(this).addClass('swiper-slide')
        })
        let swiper = new Swiper('.js-heroSliderWrapper', {
          // Optional parameters
          // If we need pagination
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
          },

          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        })
        $('.js-heroSliderNav.left').on('click', () => {
          swiper.slidePrev()
        })
        $('.js-heroSliderNav.right').on('click', () => {
          swiper.slideNext()
        })
        
      } else {
        sliderBlock.removeClass('swiper-container')
        sliderBlock.addClass('js-heroSliderWrapper')
        sliderBlock.html(sliderContent)
      }
    }
    recountSlider()
    $(window).on('resize', () => {
      recountSlider()
    })
  }
  this.initProducts = () => {
    let productsBlock = mainPage.find('.products')
    let productsListBlock = productsBlock.find('.products__list')
    let recountSlider = () => {
      if (window['products_swiper'] && window['products_swiper'].navigation) {
        window['products_swiper'].destroy(true, true)
      }

      window['products_swiper'] = new Swiper('.products__list', {
        // Optional parameters
        // If we need pagination
        slidesPerView: 'auto',
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
        spaceBetween: 0,
        breakpoints: {
          1200: {
            slidesPerView: 3,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            spaceBetween: 32   
          }
        }
      })
      if (!productsBlock.find('.products__navigation_next').hasClass('init')) {
        productsBlock.find('.products__navigation_next').on('click', () => {

          window['products_swiper'].slideNext()

          productsBlock.find('.products__navigation_next').addClass('init');
        })
      }
      if (!productsBlock.find('.products__navigation_prev').hasClass('init')) {
        productsBlock.find('.products__navigation_prev').on('click', () => {
          window['products_swiper'].slidePrev()

          productsBlock.find('.products__navigation_prev').addClass('init');
        })
      }
    }
    recountSlider()
  }
  
  let initSlider = () => {
    let sliderBlock = mainPage.find('.main-slider')
    let slidesBlocksArray = sliderBlock.find('.main-slider__slide')

    let pagerElements = mainPage.find('.main-slider__controls-pager')
    let pagers = []

    let currentSlide = null
    let slides = []
    slidesBlocksArray.each(function (num) {
      let slide = $(this)

      if (slide.hasClass('main-slider__slide_active')) {
        currentSlide = slide
        pagerElements.append('<div class="main-slider__controls-pager-cont main-slider__controls-pager-cont--active"></div>')
      } else {
        pagerElements.append('<div class="main-slider__controls-pager-cont"></div>')
      }
      slides.push(slide)
    })

    let animationWorks = false

    let changeSlide = (slide) => {
      if (animationWorks) {
        return
      }
      let oldSlide = currentSlide
      animationWorks = true
      oldSlide.addClass('main-slider__slide_hiding-from')
      oldSlide.addClass('main-slider__slide_hiding-active')
      setTimeout(() => {
        oldSlide.addClass('main-slider__slide_hiding-to')
        oldSlide.removeClass('main-slider__slide_hiding-from')
        setTimeout(() => {
          oldSlide.removeClass('main-slider__slide_hiding-active')
          oldSlide.removeClass('main-slider__slide_hiding-to')
          oldSlide.removeClass('main-slider__slide_active')
        }, 310)
      },10)
      currentSlide = slides[slide]
      pagerElements.find('.main-slider__controls-pager-cont.main-slider__controls-pager-cont--active').removeClass('main-slider__controls-pager-cont--active')
      pagerElements.children().eq(slide).addClass('main-slider__controls-pager-cont--active')
      currentSlide.addClass('main-slider__slide_showing-from')
      setTimeout(() => {
        currentSlide.addClass('main-slider__slide_showing-active')
        setTimeout(() => {
          currentSlide.addClass('main-slider__slide_showing-to')
          currentSlide.removeClass('main-slider__slide_showing-from')
          setTimeout(() => {
            animationWorks = false
            currentSlide.removeClass('main-slider__slide_showing-active')
            currentSlide.removeClass('main-slider__slide_showing-to')
            currentSlide.addClass('main-slider__slide_active')
          }, 310)
        },10)
      },10)
    }

    if (slides.length === 1) {
      sliderBlock.find('.main-slider__controls').addClass('main-slider__controls_hidden')
    }

    let nextSlide = () => {
      let slideIndex = slides.indexOf(currentSlide)
      if (slideIndex + 1 === slides.length) {
        changeSlide(0)
      } else {
        changeSlide(slideIndex + 1)
      }
    }
    let prevSlide = () => {
      let slideIndex = slides.indexOf(currentSlide)
      if (slideIndex === 0) {
        changeSlide(slides.length - 1)
      } else {
        changeSlide(slideIndex - 1)
      }
    }

    mainPage.find('.main-slider__controls-actions-prev').on('click', () => {
      prevSlide()
    })
    mainPage.find('.main-slider__controls-actions-next').on('click', () => {
      nextSlide()
    })
  }
  initIndustrySolution()
  initHero()
  this.initProducts()
  initSlider()
}

function ProductPage () {
  this.init = null
  let contactsPage = $('.product-page')
  if (!contactsPage.length) {
    this.init = false
    return
  }
  this.init = true
  function Characteristics() {
    let opened = true
    let additionalTable = contactsPage.find('.product__additional-characteristics')
    let openInAdditionalButton = contactsPage.find('.product__characteristics-more_open')
    let closeInAdditionalButton = contactsPage.find('.product__characteristics-more_close')
    let openInBasicButton = contactsPage.find('.product__basic-characteristics-more_open')
    this.open = () => {
      additionalTable.addClass('product__additional-characteristics_show-all')
    }
    this.close = () => {
      additionalTable.removeClass('product__additional-characteristics_show-all')
    }
    openInAdditionalButton.on('click', () => {
      this.open()
    })
    openInBasicButton.on('click', () => {
      $("html, body").animate({scrollTop: $('.product__additional-characteristics').offset().top}, 1000);
      this.open()
    })
    closeInAdditionalButton.on('click', () => {
      this.close()
    })
  }
  function Documents() {
    let opened = true
    let productDocuments = contactsPage.find('.product__documents')
    let openButton = productDocuments.find('.product-documents__all_open')
    let closeButton = productDocuments.find('.product-documents__all_close')
    this.open = () => {
      productDocuments.addClass('product-documents_show-all')
    }
    this.close = () => {
      productDocuments.removeClass('product-documents_show-all')
    }
    openButton.on('click', () => {
      this.open()
    })
    closeButton.on('click', () => {
      this.close()
    })
  }
  this.characteristics = new Characteristics()
  this.documents = new Documents()
}

function CatalogPage() {
  this.init = null
  let catalogPage = $('.catalog-page')
  if (!catalogPage.length) {
    this.init = false
    return
  }
  this.init = true
  catalogPage.find('.content-params__sorting-select').select2({
    minimumResultsForSearch: Infinity
  });
  
    catalogPage.find('.content-params__sorting-select').on("select2:select", function (e) {
        if(BX.getCookie(BX.message('COOKIE_PREFIX') + '_catalog_sort') !== e.target.value)
        {
            BX.setCookie(BX.message('COOKIE_PREFIX') + '_catalog_sort', e.target.value, {path : '/products'});
            window.location.reload();
        }
    })
  let productsBlock = catalogPage.find('.catalog-page__products-wrapper')
  let viewTypeButtons = {
    vert: catalogPage.find('.content-params__view-type_vertical'),
    horSmall: catalogPage.find('.content-params__view-type_horizontal-small'),
    horBig: catalogPage.find('.content-params__view-type_horizontal-big'),
  }
  let unselectAllTypes = () => {
    viewTypeButtons.vert.removeClass('content-params__view-type_selected')
    viewTypeButtons.horSmall.removeClass('content-params__view-type_selected')
    viewTypeButtons.horBig.removeClass('content-params__view-type_selected')
    productsBlock.removeClass('products-list_horizontal-small')
    productsBlock.removeClass('products-list_horizontal-big')
    productsBlock.removeClass('products-list_vertical')
  }
  viewTypeButtons.vert.on('click', () => {
    unselectAllTypes()
    viewTypeButtons.vert.addClass('content-params__view-type_selected')
    productsBlock.addClass('products-list_vertical')
    
    BX.setCookie(BX.message('COOKIE_PREFIX') + '_catalog_view_type', 'vertical', {path : '/products'});
  })
  viewTypeButtons.horSmall.on('click', () => {
    unselectAllTypes()
    viewTypeButtons.horSmall.addClass('content-params__view-type_selected')
    productsBlock.addClass('products-list_horizontal-small')
    
    BX.setCookie(BX.message('COOKIE_PREFIX') + '_catalog_view_type', 'horizontal-small', {path : '/products'});
  })
  viewTypeButtons.horBig.on('click', () => {
    unselectAllTypes()
    viewTypeButtons.horBig.addClass('content-params__view-type_selected')
    productsBlock.addClass('products-list_horizontal-big')
    
    BX.setCookie(BX.message('COOKIE_PREFIX') + '_catalog_view_type', 'horizontal-big', {path : '/products'});
  })
  let openFiltersButton = catalogPage.find('.content-params__mobile-filter-inner')
  let closeFiltersButton = catalogPage.find('.filters-mobile__header-close')
  let mobilesFilterBlock = catalogPage.find('.filters-mobile')
  this.openMobileFilters = () => {
    mobilesFilterBlock.addClass('filters-mobile_opened')
  }
  this.closeMobileFilters = () => {
    mobilesFilterBlock.removeClass('filters-mobile_opened')
  }
  openFiltersButton.on('click', () => {
    this.openMobileFilters()
  })
  closeFiltersButton.on('click', () => {
    this.closeMobileFilters()
  })

  let openCategoriesButton = catalogPage.find('.catalog-page__mobile-categories-button')
  let closeCategoriesButton = catalogPage.find('.categories-mobile__close')
  let mobilesCategoriesBlock = catalogPage.find('.tools__categories')
  this.openCategoriesFilters = () => {
    mobilesCategoriesBlock.addClass('tools__categories_opened')
  }
  this.closeCategoriesFilters = () => {
    mobilesCategoriesBlock.removeClass('tools__categories_opened')
  }
  openCategoriesButton.on('click', () => {
    this.openCategoriesFilters()
  })
  closeCategoriesButton.on('click', () => {
    this.closeCategoriesFilters()
  })
  let prepareCategories = () => {
    let selectedCategory = catalogPage.find('.categories__category_selected')
    let rootCategoriesBlock = catalogPage.find('.catalog-page__categories')
    let categories = []
    if (selectedCategory.length) {
      let tempBlock = selectedCategory.parent()
      while (tempBlock[0] !== rootCategoriesBlock[0]) {
        tempBlock = tempBlock.parent()
        tempBlock.addClass('categories__category_selected-parent')
      }
    }
  }
  prepareCategories()
}

function CompatibleSoftware () {
  this.init = null
  let compatibleSoftware = $('.compatible-software')
  let swiperContainer = compatibleSoftware.find('.swiper-container')
  if (!compatibleSoftware.length) {
    this.init = false
    return
  }
  this.init = true
  let swiper = new Swiper(swiperContainer[0], {
    // Optional parameters
    // If we need pagination
    slidesPerView: ($(document).width() < 1280) ? 'auto' : 4,
    slidesOffsetBefore: ($(document).width() < 1280) ? 15 : 0,
    slidesOffsetAfter: ($(document).width() < 1280) ? 50 : 15,
    spaceBetween: ($(document).width() < 1280) ? 15 : 32,
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
  compatibleSoftware.find('.light-arrow.right').on('click', () => {
    swiper.slideNext()
  })
  compatibleSoftware.find('.light-arrow.left').on('click', () => {
    swiper.slidePrev()
  })
}

function ForBusinessPage () {
  this.init = null
  let catalogPage = $('.for-business-page')
  if (!catalogPage.length) {
    this.init = false
    return
  }
  let initProblems = () => {
    let sliderBlock = catalogPage.find('.typical-problems__problems')
    let sliderContent = sliderBlock.html()
    let recountSlider = () => {
      if ($(document).width() < 1260) {
        sliderBlock.html('<div class="swiper-wrapper">' + sliderContent + '</div>')
        sliderBlock.addClass('swiper-container')
        let slides = sliderBlock.find('.typical-problems__problem')
        slides.each(function () {
          $(this).addClass('swiper-slide')
        })
        let swiper = new Swiper('.typical-problems__problems', {
          // Optional parameters
          // If we need pagination
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
          },
          slidesOffsetBefore: 15,
          slidesOffsetAfter: 15,
          spaceBetween: 10,

          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        })
      } else {
        sliderBlock.removeClass()
        sliderBlock.addClass('typical-problems__problems')
        sliderBlock.html(sliderContent)
      }
    }
    recountSlider()
    $(window).on('resize', () => {
      recountSlider()
    })
  }
  initProblems()
}

let ui;

$(document).ready(() => {
    ui = {
        header: new Header()
    }
    pages = {
        productPage: new ProductPage(),
        catalogPage: new CatalogPage(),
        forBusinessPage: new ForBusinessPage()
    }
    elements = {
        compatibleSoftware: new CompatibleSoftware()
    }
    if(window.location.pathname === '/')
        pages['mainPage'] = new MainPage();
})