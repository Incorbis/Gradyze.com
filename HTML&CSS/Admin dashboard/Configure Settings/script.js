// Handle profile picture preview
document.getElementById('profile-picture').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Handle form submission
document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate passwords
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword && newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    // Show notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
});

// Basic phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = '+1 (' + value;
        } else if (value.length <= 6) {
            value = '+1 (' + value.slice(0, 3) + ') ' + value.slice(3);
        } else if (value.length <= 10) {
            value = '+1 (' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6);
        }
    }
    e.target.value = value;
});