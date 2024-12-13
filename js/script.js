document.addEventListener('DOMContentLoaded', function () {
        listen_event_click(); //listen for cliking on the home page navigations
});

function listen_event_click() {
    var event_scheduler = document.querySelector('.event-scheduler');
    var meal_planner = document.querySelector('.meal-planner');
    var gift_tracker = document.querySelector('.gift-tracker');
    var checklist = document.querySelector('.checklist');

    event_scheduler.addEventListener('click', function () {
        window.location.href = 'event-planner.html';
    });

    meal_planner.addEventListener('click', function () {
        window.location.href = 'https:www.google.com';
    });

    gift_tracker.addEventListener('click', function () {
        window.location.href = 'https:www.google.com';
    });

    checklist.addEventListener('click', function () {
        window.location.href = 'https:www.google.com';
    });
}