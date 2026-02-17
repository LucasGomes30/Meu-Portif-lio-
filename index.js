// --- Lógica do Menu Hamburger ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector('.header__main-ham-menu-close')
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

if (hamMenuBtn) {
  hamMenuBtn.addEventListener('click', () => {
    smallMenu.classList.toggle('header__sm-menu--active')
    headerHamMenuBtn.classList.toggle('d-none')
    headerHamMenuCloseBtn.classList.toggle('d-none')
  })
}

headerSmallMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
})

// --- Lógica do Logo ---
const headerLogoConatiner = document.querySelector('.header__logo-container')
if (headerLogoConatiner) {
  headerLogoConatiner.addEventListener('click', () => {
    location.href = 'index.html'
  })
}

// --- Lógica de Envio de E-mail (EmailJS) ---

// CONFIG — substitua pelos valores do seu painel EmailJS
const EMAILJS_PUBLIC_KEY = 'lucasgomes13118@gmail.com';
const EMAILJS_SERVICE_ID = 'service_lwbae6w';
const EMAILJS_TEMPLATE_ID = 'template_xf57n3i';

// Inicializa o EmailJS se o SDK estiver disponível
if (window.emailjs) {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch (e) {
    console.error('Erro ao inicializar EmailJS. Verifique a Public Key.', e);
  }
} else {
  console.warn('EmailJS SDK não encontrado. Verifique se o script foi adicionado em index.html.');
}

const contactForm = document.querySelector('.contact__form');
const contactBtn = document.querySelector('.contact__btn');

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

if (contactForm && contactBtn) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    // Feedback visual
    const originalText = contactBtn.innerText;
    contactBtn.innerText = 'ENVIANDO...';
    contactBtn.disabled = true;

    if (!window.emailjs) {
      alert('EmailJS não está disponível. Verifique o SDK no HTML.');
      contactBtn.innerText = originalText;
      contactBtn.disabled = false;
      return;
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        alert('Mensagem enviada com sucesso! 🚀');
        form.reset();
      })
      .catch((err) => {
        alert('Erro ao enviar. Abra o Console (F12) para mais detalhes.');
        console.error('EmailJS Error Detalhado:', err);
      })
      .finally(() => {
        contactBtn.innerText = originalText;
        contactBtn.disabled = false;
      });
  });
} else if (!contactForm) {
  console.warn('Formulário de contato não encontrado na página.');
}

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});



