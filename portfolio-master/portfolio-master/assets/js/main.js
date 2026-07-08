/* ============================================================
   DHARUN Portfolio — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav: scroll shadow ───────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Nav: mobile burger toggle ────────────────────────── */
  const burger  = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('nav-mobile');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close drawer on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Cursor glow ──────────────────────────────────────── */
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left    = e.clientX + 'px';
      glow.style.top     = e.clientY + 'px';
      glow.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }

  /* ── Scroll fade-in (Intersection Observer) ───────────── */
  const fadeTargets = document.querySelectorAll('.fade-up');
  if (fadeTargets.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeTargets.forEach(el => observer.observe(el));
  }

  /* ── Skill progress bars (animate on scroll) ──────────── */
  const bars = document.querySelectorAll('.progress-bar__fill');
  if (bars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.width = target.dataset.width || '0%';
          barObserver.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => barObserver.observe(bar));
  }

  /* ── Form: subtle input shift on focus ───────────────── */
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
    el.addEventListener('focus', () => {
      el.closest('.form-group').style.transition = 'transform 0.2s ease';
      el.closest('.form-group').style.transform  = 'translateX(3px)';
    });
    el.addEventListener('blur', () => {
      el.closest('.form-group').style.transform = 'translateX(0)';
    });
  });

  /* ── Contact form: basic submit handler ──────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Sent!';
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── Card hover: image zoom ───────────────────────────── */
  document.querySelectorAll('.card--lift').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    card.addEventListener('mouseenter', () => {
      img.style.transform  = 'scale(1.05)';
      img.style.transition = 'transform 0.6s ease';
    });
    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });

});
