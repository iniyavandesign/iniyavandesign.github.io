document.addEventListener('DOMContentLoaded', () => {
    // Modal Logic
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.querySelector('.close-modal');
    const tabs = document.querySelectorAll('.tab');

    window.openModal = (type) => {
        modal.classList.add('active');
        // Activate correct tab
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.tab[data-tab="${type}"]`).classList.add('active');

        // Show correct form
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.querySelector(`#${type}-form`).classList.add('active');
    };

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Tab Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            document.querySelector(`#${type}-form`).classList.add('active');
        });
    });

    // Simple Form Submission (Placeholder)
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    });
});

// Download Design Feature
window.downloadDesign = function () {
    const btn = document.querySelector('.btn-outline[onclick="downloadDesign()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

    html2canvas(document.body).then(canvas => {
        const link = document.createElement('a');
        link.download = 'bidchit-design.png';
        link.href = canvas.toDataURL();
        link.click();

        btn.innerHTML = originalText;
    });
}

