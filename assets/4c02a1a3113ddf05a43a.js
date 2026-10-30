BX.ready(() => {
    const block = document.querySelector('.js-cookieMessage');
    const cookieName = `${BX.message('COOKIE_PREFIX')}_COOKIE_MESSAGE_WAS_SHOWN`;

    if (!block || BX.getCookie(cookieName)) {
        return false;
    }

    block.classList.add('is-active');

    const hideBtn = document.querySelector('.js-cookieMessageHide');

    hideBtn.addEventListener('click', () => {
        BX.setCookie(cookieName, true);
        block.classList.remove('is-active');
        
        if(BX.message('USER_ID') != '')
        {
            BX.ajax.runComponentAction(
                'dssl:user.cookie.policy',
                'agree',
                {
                    mode: 'class',
                    data: {
                        data: {
                            'agree' : 'Y'
                        }
                    }
                }
            ).then(function (response) {});
        }
    });
})