class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.events = JSON.parse(localStorage.getItem('calendarEvents')) || {};
        this.initializeEventListeners();
        this.renderCalendar();
    }

    initializeEventListeners() {
        document.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));
        document.getElementById('save-event').addEventListener('click', () => this.saveEvent());
        document.getElementById('close-modal').addEventListener('click', this.closeModal);
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthYear = document.getElementById('current-month-year');
        calendar.innerHTML = '';
        monthYear.textContent = this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

        // Create day names
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            dayEl.style.fontWeight = 'bold';
            calendar.appendChild(dayEl);
        });

        // Fill in previous month's days
        for (let i = 0; i < firstDay.getDay(); i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day', 'other-month');
            calendar.appendChild(dayEl);
        }

        // Create days of current month
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day', 'current-month');
            dayEl.textContent = date;
            dayEl.dataset.date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${date}`;

            // Add events for this day
            const dateKey = dayEl.dataset.date;
            if (this.events[dateKey]) {
                this.events[dateKey].forEach(event => {
                    const eventEl = document.createElement('div');
                    eventEl.classList.add('event');
                    eventEl.textContent = `${event.time} - ${event.title}`;
                    dayEl.appendChild(eventEl);
                });
            }

            dayEl.addEventListener('click', () => this.openEventModal(dateKey));
            calendar.appendChild(dayEl);
        }
    }

    openEventModal(date) {
        const modal = document.getElementById('event-modal');
        modal.style.display = 'block';
        modal.dataset.date = date;
        document.getElementById('event-title').value = '';
        document.getElementById('event-time').value = '';
    }

    closeModal = () => {
        const modal = document.getElementById('event-modal');
        modal.style.display = 'none';
    }

    saveEvent() {
        const modal = document.getElementById('event-modal');
        const date = modal.dataset.date;
        const title = document.getElementById('event-title').value;
        const time = document.getElementById('event-time').value;

        if (title && time) {
            if (!this.events[date]) {
                this.events[date] = [];
            }
            this.events[date].push({ title, time });
            localStorage.setItem('calendarEvents', JSON.stringify(this.events));
            this.renderCalendar();
            this.closeModal();
        }
    }
}

// Initialize calendar when page loads
new Calendar();