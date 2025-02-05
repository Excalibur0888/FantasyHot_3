// Утилиты для работы с модальными окнами
function showModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function isAgeVerified() {
    return localStorage.getItem('ageVerified') === 'true';
}

function setAgeVerified() {
    localStorage.setItem('ageVerified', 'true');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const ageVerification = document.querySelector('.age-verification');
    const restrictedModal = document.querySelector('.restricted-modal');
    const btnYes = document.querySelector('.btn-yes');
    const btnNo = document.querySelector('.btn-no');

    // Проверяем, верифицирован ли возраст
    if (!isAgeVerified() && ageVerification) {
        showModal(ageVerification);
    }

    // Обработчик для кнопки "Да"
    if (btnYes) {
        btnYes.addEventListener('click', function() {
            setAgeVerified();
            hideModal(ageVerification);
        });
    }

    // Обработчик для кнопки "Нет"
    if (btnNo) {
        btnNo.addEventListener('click', function() {
            hideModal(ageVerification);
            if (restrictedModal) {
                showModal(restrictedModal);
                setTimeout(() => {
                    window.location.href = 'https://www.google.com';
                }, 3000);
            }
        });
    }

    // Закрытие модальных окон по клику вне контента
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('age-verification') || 
            event.target.classList.contains('restricted-modal')) {
            // Не закрываем окно проверки возраста по клику вне
            if (!isAgeVerified() && event.target.classList.contains('age-verification')) {
                return;
            }
            hideModal(event.target);
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                // Не закрываем окно проверки возраста по Escape
                if (!isAgeVerified() && activeModal.classList.contains('age-verification')) {
                    return;
                }
                hideModal(activeModal);
            }
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

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!navWrapper.contains(e.target) && !burgerMenu.contains(e.target) && navWrapper.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navWrapper.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                burgerMenu.classList.remove('active');
                navWrapper.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}); 