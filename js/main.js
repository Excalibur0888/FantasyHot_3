// Утилиты для работы с модальными окнами
function showModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Utility functions for age verification
function isAgeVerified() {
    const verified = localStorage.getItem('ageVerified');
    console.log('Checking age verification:', verified);
    return verified === 'true';
}

function setAgeVerified(value) {
    console.log('Setting age verification to:', value);
    localStorage.setItem('ageVerified', value.toString());
}

function showAgeVerification() {
    const ageVerification = document.querySelector('.age-verification');
    if (ageVerification) {
        ageVerification.style.display = 'flex';
        ageVerification.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideAgeVerification() {
    const ageVerification = document.querySelector('.age-verification');
    if (ageVerification) {
        ageVerification.style.display = 'none';
        ageVerification.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    const ageVerification = document.querySelector('.age-verification');
    const restrictedModal = document.getElementById('restrictedModal');
    const btnYes = document.querySelector('.btn-yes');
    const btnNo = document.querySelector('.btn-no');

    // Check if this is a new session
    const sessionVerified = sessionStorage.getItem('sessionVerified');
    
    // Only show verification if not verified in localStorage AND not verified in current session
    if (!isAgeVerified() && !sessionVerified) {
        console.log('New session, showing age verification');
        showAgeVerification();
        // Mark this session as verified to prevent showing modal on page navigation
        sessionStorage.setItem('sessionVerified', 'true');
    }

    // Handle "Yes" button click
    if (btnYes) {
        btnYes.addEventListener('click', function() {
            console.log('Yes clicked');
            setAgeVerified(true);
            hideAgeVerification();
        });
    }

    // Handle "No" button click
    if (btnNo) {
        btnNo.addEventListener('click', function() {
            console.log('No clicked');
            setAgeVerified(false);
            hideAgeVerification();
            if (restrictedModal) {
                restrictedModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    window.location.href = 'https://www.google.com';
                }, 3000);
            }
        });
    }

    // Prevent closing age verification by clicking outside
    document.addEventListener('click', function(event) {
        if (event.target === ageVerification && !isAgeVerified()) {
            console.log('Prevented closing by outside click');
            event.preventDefault();
            return false;
        }
    });

    // Prevent closing by Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !isAgeVerified()) {
            console.log('Prevented closing by Escape key');
            event.preventDefault();
            return false;
        }
    });

    // Бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    if (burgerMenu && navWrapper) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navWrapper.classList.toggle('active');
            document.body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', function(e) {
            if (!navWrapper.contains(e.target) && !burgerMenu.contains(e.target) && navWrapper.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navWrapper.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                burgerMenu.classList.remove('active');
                navWrapper.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}); 