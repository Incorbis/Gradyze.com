// Toggle filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            document.querySelector('.filter-btn.active').classList.remove('active');
            this.classList.add('active');
        }
    });
});

// Handle notification actions
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const notificationItem = this.closest('.notification-item');
        
        if (this.textContent === '🗑️') {
            notificationItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                notificationItem.remove();
            }, 300);
        } else if (this.textContent === '✓') {
            notificationItem.classList.remove('unread');
            this.remove();
        }
    });
});

// Handle notification click
document.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.remove('unread');
        const checkButton = this.querySelector('.action-btn[text-content="✓"]');
        if (checkButton) {
            checkButton.remove();
        }
    });
});