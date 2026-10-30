$(function() {
    let places = BX.loggingLists.places,
        events = BX.loggingLists.events;

    // Логирование кнопки активировать сертификат в блоке подарок от DSSL
    $(document).on('click', '.log-activeGift', function(e) {
        clickstream(events[17], places[7], 'нажал Активировать', 'виджет "Подарок от DSSL"');
    });

    // Логирование виджета мероприятий
    $(document).on('mousedown', '.log-eventsDatepicer', function(e) {
        clickstream(events[21], places[10]);
    });

    $(document).on('click', '.log-eventsCalendarScrollPrev', function(e) {
        clickstream(events[22], places[10], 'назад');
    });

    $(document).on('click', '.log-eventsCalendarScrollNext', function(e) {
        clickstream(events[22], places[10], 'вперед');
    });

    $(document).on('eventsCalendarChooseDate', function(e) {
        clickstream(events[23], places[10], event.detail.date);
    });

    $(document).on('eventsCalendarChooseRange', function(e) {
        clickstream(events[24], places[10], event.detail.date);
    });

    $(document).on('eventsCalendarRangeClear', function(e) {
        clickstream(events[25], places[10]);
    });

    $(document).on('click', '.log-eventsGoToEvent', function(e) {
        let block = e.target.closest('.calendar-event'),
            nameElement = block ? block.querySelector('.calendar-event__name') : false,
            name = nameElement ? nameElement.textContent : '';

        clickstream(events[26], places[10], name);
    });
});