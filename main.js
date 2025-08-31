<script>
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
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current item if it wasn't active
      if (!isActive) {
        faqItem.classList.add('active');
      }
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
</script>
