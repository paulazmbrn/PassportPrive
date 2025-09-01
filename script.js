// Wait for the whole DOM to load
document.addEventListener('DOMContentLoaded', function () {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Toggle functionality (one open at a time + animation)
    const faqQuestions = document.querySelectorAll('.faq-question');
    const collapseAll = () => {
        document.querySelectorAll('.faq-item').forEach(item => {
            const ans = item.querySelector('.faq-answer');
            if (ans) ans.style.maxHeight = '0px';
            item.classList.remove('active');
        });
    };

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const wasActive = faqItem.classList.contains('active');

            // Close all first
            collapseAll();

            // Open clicked if it wasn't already active
            if (!wasActive) {
                faqItem.classList.add('active');
                if (answer) {
                    // small buffer avoids off-by-one clipping in some browsers
                    const target = answer.scrollHeight + 2;
                    answer.style.maxHeight = target + 'px';
                }
            }
        });
    });

    // Recalculate height on resize so open items stay accurate
    window.addEventListener('resize', () => {
        const open = document.querySelector('.faq-item.active .faq-answer');
        if (open) {
            open.style.maxHeight = (open.scrollHeight + 2) + 'px';
        }
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(245, 240, 236, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(44, 44, 44, 0.1)';
        } else {
            header.style.background = 'rgba(245, 240, 236, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Handle form submission with popup
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            setTimeout(function () {
                const popup = document.getElementById('successPopup');
                if (popup) {
                    popup.classList.add('show');
                }
            }, 500);
        });
    }

    // Close popup when clicking outside
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === this) {
                popup.classList.remove('show');
            }
        });
    }
});

function closeSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}
