// Adicionando um efeito de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação para os cards de features
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Adiciona um pequeno delay para cada card
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const charCounter = document.querySelector('.char-counter');
    
    if (contactForm) {
        // Contador de caracteres para a mensagem
        if (messageTextarea && charCount && charCounter) {
            messageTextarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                const maxLength = 255;
                const remainingChars = maxLength - currentLength;
                
                charCount.textContent = currentLength;
                
                // Remove classes anteriores
                charCounter.classList.remove('warning', 'danger');
                
                // Adiciona classes baseadas no número de caracteres restantes
                if (remainingChars <= 10) {
                    charCounter.classList.add('danger');
                } else if (remainingChars <= 50) {
                    charCounter.classList.add('warning');
                }
            });
        }
        
        // Validação do formulário
        contactForm.addEventListener('submit', function(e) {
            // Captura os dados do formulário
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            // Validação dos campos obrigatórios
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Desabilita o botão e mostra loading
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').style.display = 'none';
            submitBtn.querySelector('.btn-loading').style.display = 'inline';
            
            // Configura o iframe para receber a resposta
            const hiddenIframe = document.getElementById('hidden-iframe');
            
            // Função para lidar com o sucesso do envio
            function handleSuccess() {
                alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
                contactForm.reset();
                resetButton();
                if (charCount) {
                    charCount.textContent = '0';
                    charCounter.classList.remove('warning', 'danger');
                }
            }
            
            // Configura o evento onload do iframe
            hiddenIframe.onload = function() {
                setTimeout(handleSuccess, 1000);
            };
            
            // Fallback: se o iframe não carregar em 5 segundos, assume sucesso
            setTimeout(() => {
                if (!hiddenIframe.contentDocument || hiddenIframe.contentDocument.readyState === 'complete') {
                    handleSuccess();
                }
            }, 5000);
        });
        
        // Função para resetar o botão
        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';
        }
    }
});