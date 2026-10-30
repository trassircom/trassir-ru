class YCaptcha {
    constructor(key, error) {
        this.error = error;
        this.key = key;
		this.errorMessage = 'Ошибка безопасности. Нам не удалось загрузить сервис проверки (капчу). Без него мы не можем принять форму. Пожалуйста, перезагрузите страницу. Если ошибка повторится, попробуйте временно отключить блокировщик рекламы (AdBlock) или VPN.';

        this.init();
    }

    init() {
        this.addStyles();
        
        if (this.error) {
            this.cancelSending();

            document.addEventListener('yCaptchaRenderContainer', () => {
                this.cancelSending();
            });

            return false;
        }

        if (!window.smartCaptcha) {
            return false;
        }

        this.add();

        document.addEventListener('yCaptchaRenderContainer', () => {
            this.add();
        });

        document.addEventListener('yCaptchaRenderUpdate', e => {
            this.update(e.detail);
        });
    }

    update(form) {
        if (!form) {
            return false;
        }

        window.smartCaptcha.reset(form.yCaptchaId);

        this.addSumbitEvents(form);
    }

    addStyles() {
        const style = document.createElement('style');
        style.innerHTML = '.y-captcha:not(.smart-captcha) { position: absolute; }';
        document.head.append(style);
    }

    addSumbitEvents(form) {
        if (!form.invisible) {
            return false;
        }

        if (form.dataset.ajax) {
            form.verification = () => {
                window.smartCaptcha.execute(form.yCaptchaId);
            }
        } else {
            form.addEventListener('submit', e => {
                if (!form.captchaInput.value) {
                    e.preventDefault();
                }

                window.smartCaptcha.execute(form.yCaptchaId);
            });
        }
    }

    add() {
        const nodes = this.getNodes();

        nodes.forEach(node => {
            const invisible = true;
            const form = node.closest('form');
            const comp = form.closest('[id^="comp_"]');
            const submitParent = comp || form;
            const sumbit = submitParent.querySelector('[type="submit"]');

            form.invisible = invisible;
            form.comp = comp;

            this.addSumbitEvents(form);

            form.yCaptchaId = window.smartCaptcha.render(node, { 
                hl: 'ru', 
                invisible, 
                hideShield: true,
                sitekey: this.key, 
                callback: () => {
                    if (!invisible) {
                        return false;
                    }

                    form.verification = null;
                    BX.closeWait();

                    sumbit?.click();
                }
            });
            
            const input = form.querySelector('input[name="smart-token"]');
            window.smartCaptcha.reset(form.yCaptchaId);
            
            form.captchaInput = input;
            node.classList.add('is-init');
        });        
    }

    getNodes() {
        return document.querySelectorAll('.js-yCaptchaNode:not(.is-init)');
    }

    cancelSending() {
        const nodes = this.getNodes();

        nodes.forEach(node => {
            const form = node.closest('form');

            form?.addEventListener('submit', e => {
                e.preventDefault();
                alert(this.errorMessage);
            });
        });
    }
}