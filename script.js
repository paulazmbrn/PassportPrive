<script>
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

    // FAQ Toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function () {
        const faqItem = this.closest('.faq-item');
        faqItem.classList.toggle('active');
      });
    });

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
        document.getElementById('successPopup').classList.add('show');
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

 
