document.addEventListener('DOMContentLoaded', function() {
    const ageVerification = document.querySelector('.age-verification');
    const restrictedModal = document.getElementById('restrictedModal');
    const btnYes = document.querySelector('.btn-yes');
    const btnNo = document.querySelector('.btn-no');

    // Show age verification modal on page load
    function showAgeVerification() {
        // Always show the modal when visiting the site
        ageVerification.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Handle "Yes" button click
    btnYes.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageVerification.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Handle "No" button click
    btnNo.addEventListener('click', function() {
        ageVerification.style.display = 'none';
        restrictedModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Show age verification immediately
    showAgeVerification();
}); 