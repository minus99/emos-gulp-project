var giftFinder = {
    selector: {
        wrapper: '.gift-finder-wrapper',
        wizart: '.gift-finder-form',
        step: '.form-step',
        activeStep: '.form-step.active-step',
        options: '.step-card a',
        progress: '.progress-steps',
        btnNext: '.btn-wizart-next',
        btnPrev: '.btn-wizart-prev',
        btnMore: '.btn-wizart-more',
    },
    cls: {
        active_step: 'active-step',
        hide: 'invisible',
        active: 'active',
        selected: 'selected',
        disabled: 'disabled',
        show_results: 'show-results',
        show: 'show',
        lastStep: 'last-step'
    },
    el: {},
    results: {},
    settings: {
        maxPer: 3
    },
    set: function () {
        var _t = this;
        _t.el = {
            wrapper: document.querySelector(_t.selector.wrapper),
            wizart: document.querySelector(_t.selector.wizart),
            steps: document.querySelectorAll(_t.selector.step),
            nextBtn: document.querySelector(_t.selector.btnNext),
            prevBtn: document.querySelector(_t.selector.btnPrev),
            moreBtn: document.querySelector(_t.selector.btnMore),
            progress: document.querySelector(_t.selector.progress),
            options: document.querySelectorAll(_t.selector.options)
        };
    },
    handleResults: function () {
        var _t = this;
        var resultUri = _t.el.wrapper.dataset.uri,
            queryString = [];

        for (var [key, value] of Object.entries(_t.results)) {
            queryString.push(`${key}=${value.join('-')}`);
        }

        var redirectUri = `${resultUri}?${queryString.join('&')}`;

        console.log('redirectUri', redirectUri);

        /** Redirect to results page */
        location.href = redirectUri;
    },
    handleProgress: function () {
        var _t = this;
        var activeStep = _t.el.wizart.getElementsByClassName(_t.cls.active_step)[0],
            progressElements = _t.el.progress.querySelectorAll('li'),
            activeProgress;

        /** Add active class only current element */
        utils.forEach(progressElements, function (i, el) {
            if (el.dataset.step == activeStep.dataset.step) {
                activeProgress = el;
                el.classList.add(_t.cls.active);
            }
            else
                el.classList.remove(_t.cls.active);
        });

        /** Hide after element */
        utils.setClass({ target: progressElements, cls: _t.cls.lastStep, type: 'remove' });
        progressElements[Number(_t.settings.maxPer) - 1].classList.add(_t.cls.lastStep);

        if (utils.responsiveControl()) {
            /** Scroll to active step | MOBILE */
            if (_t.el.progress.scrollLeft != activeProgress.offsetLeft)
                _t.el.progress.scrollLeft = activeProgress.offsetLeft;
        }
        else {
            /** Scroll to active step | DESKTOP */
            if (activeProgress.dataset.step)
                _t.el.progress.scrollTop = (activeProgress.dataset.step - 1) * activeProgress.offsetHeight;
        }
    },
    handleQuery: function (e) {
        var _t = giftFinder,
            parent = utils.getParents(e.target, _t.selector.step),
            isSelected = utils.hasClass({ element: e.target, value: _t.cls.selected }),
            queries = [];

        if (parent.dataset.input == 'radio') {
            /** Radio */
            if (!isSelected) {
                e.target.classList.add(_t.cls.selected);
                utils.forEach(parent.querySelectorAll(_t.selector.options), function (i, el) {
                    el != e.target && el.classList.remove(_t.cls.selected);
                });
            }
        } else {
            /** Checkbox */
            isSelected ? e.target.classList.remove(_t.cls.selected) : e.target.classList.add(_t.cls.selected);
        }

        /** handle query */
        utils.forEach(parent.querySelectorAll(_t.selector.options), function (i, el) {
            if (utils.hasClass({ element: el, value: _t.cls.selected })) {
                var opt = utils.getParents(el, '[data-query]');
                queries.push(opt.dataset.query)
            }
        });

        /** Add to results list for query string */
        _t.results = {
            ..._t.results,
            [parent.dataset.key]: queries
        };

        /** Validate */
        _t.validate(parent)
    },
    handleMoreQuestions: function () {
        var _t = this;
        var activeStep = _t.el.wizart.querySelector(_t.selector.activeStep),
            allSteps = _t.el.wizart.querySelectorAll(_t.selector.step);

        if (allSteps.length != _t.settings.maxPer && activeStep.dataset.step == _t.settings.maxPer) {
            _t.el.moreBtn.classList.remove(_t.cls.hide);

            _t.el.nextBtn.text = 'Önerileri gör';
            _t.el.nextBtn.classList.add(_t.cls.show_results);

            _t.el.moreBtn.addEventListener('click', function () {
                _t.el.moreBtn.classList.add(_t.cls.hide);
                _t.settings.maxPer = allSteps.length;

                utils.setClass({ target: _t.el.progress.querySelectorAll('li'), cls: _t.cls.show, type: 'add' });

                _t.check();
            });

        } else {
            if (!activeStep.nextElementSibling || activeStep.dataset.step == _t.settings.maxPer) {
                _t.el.nextBtn.text = 'Önerileri gör';
                _t.el.nextBtn.classList.add(_t.cls.show_results)
            } else {
                _t.el.nextBtn.text = 'Sonraki';
                _t.el.nextBtn.classList.remove(_t.cls.show_results)
            }

            /**  */
            if (!utils.hasClass({ element: _t.el.moreBtn, value: _t.cls.hide }))
                _t.el.moreBtn.classList.add(_t.cls.hide);
        }

    },
    focusOn: function () {
        var _t = this;
        setTimeout(function () {
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': _t.el.wrapper.offsetTop - 100
            });
        }, 50);
    },
    check: function () {
        var _t = this;
        /** Check and handle button visibility */
        utils.forEach(_t.el.steps, function (i, el) {
            if (utils.hasClass({ element: el, value: _t.cls.active_step })) {

                el.previousElementSibling ? _t.el.prevBtn.classList.remove(_t.cls.hide) : _t.el.prevBtn.classList.add(_t.cls.hide);

                _t.handleMoreQuestions();

                /** Validate */
                _t.validate(el)
            }
        });
        /** handle progress activity */
        _t.handleProgress();
    },
    validate: function (o) {
        var _t = this;
        var activeStep = o || _t.el.wizart.querySelector(_t.selector.activeStep);

        /** Add or remove disabled */
        if (activeStep.querySelectorAll(_t.selector.options + '.' + _t.cls.selected).length > 0)
            _t.el.nextBtn.classList.remove(_t.cls.disabled);
        else
            _t.el.nextBtn.classList.add(_t.cls.disabled);
    },
    nextPrev: function (val, o) {
        var _t = this;

        /** Just show query results! */
        if (utils.hasClass({ element: o.target, value: _t.cls.show_results })) {
            _t.handleResults();
            return;
        }

        var activeStep = _t.el.wizart.getElementsByClassName(_t.cls.active_step)[0];

        /** Hide All Steps */
        utils.forEach(_t.el.steps, function (i, el) {
            el.classList.remove(_t.cls.active_step);
        });

        /** Show Active Step Next or Previous */
        val > 0 ? activeStep.nextElementSibling.classList.add(_t.cls.active_step) : activeStep.previousElementSibling.classList.add(_t.cls.active_step);

        _t.check();
        _t.focusOn();
    },
    addEvent: function () {
        var _t = this;
        /** Next and Previous button listeners */
        _t.el.nextBtn.addEventListener('click', function (o) { _t.nextPrev(1, o) });
        _t.el.prevBtn.addEventListener('click', function (o) { _t.nextPrev(-1, o) });

        /** Wizart option listeners */
        utils.forEach(_t.el.options, function (i, el) {
            el.addEventListener('click', _t.handleQuery)
        });
    },
    init: function () {
        var _t = this;
        _t.set();
        _t.addEvent();
        _t.check();
    }
}

giftFinder.init();