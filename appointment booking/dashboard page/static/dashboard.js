// Default Section - Show Home on Load
document.addEventListener('DOMContentLoaded', () => {
    showSection('home-section');
});

// Navigation Logic
document.getElementById('nav-home').addEventListener('click', () => {
    showSection('home-section');
});

document.getElementById('nav-appointments').addEventListener('click', () => {
    showSection('appointments-section');
});

document.getElementById('nav-users').addEventListener('click', () => {
    showSection('users-section');
});

document.getElementById('nav-settings').addEventListener('click', () => {
    showSection('settings-section');
});

// Function to Show Sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Approve/Reject Logic
document.querySelectorAll('.approve').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        updateStatus(id, '✔️ Approved', 'approved');
    });
});

document.querySelectorAll('.reject').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        updateStatus(id, '❌ Rejected', 'rejected');
    });
});

function updateStatus(id, statusText, statusClass) {
    const row = document.querySelector(`td.status[data-id="${id}"]`);
    if (row) {
        row.textContent = statusText;
        row.className = `status ${statusClass}`;
    }
}
