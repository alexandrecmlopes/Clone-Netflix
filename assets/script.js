const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light');
        body.classList.remove('dark');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.add('dark');
        body.classList.remove('light');
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
}

// Inicializa tema salvo
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Salva nome e imagem do perfil escolhido ao clicar
document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('click', function (e) {
        e.preventDefault();
        const nome = this.querySelector('span').textContent;
        const imagem = this.querySelector('img').getAttribute('src');
        localStorage.setItem('perfilAtivoNome', nome);
        localStorage.setItem('perfilAtivoImagem', imagem);

        // Mostra o vídeo de transição
        const videoContainer = document.getElementById('transition-video-container');
        const video = document.getElementById('transition-video');
        const skipBtn = document.getElementById('skip-intro-btn');
        if (videoContainer && video && skipBtn) {
            videoContainer.style.display = 'flex';
            video.currentTime = 0;
            video.play();

            let redirectTimeout;
            const goToCatalog = () => {
                video.pause();
                videoContainer.classList.add('hide');
                window.location.href = `catalogo/catalogo.html?user=${encodeURIComponent(nome)}`;
            };

            // Redireciona ao terminar ou após 7s
            video.onended = goToCatalog;
            redirectTimeout = setTimeout(goToCatalog, 7000);

            // Pular introdução
            skipBtn.onclick = () => {
                clearTimeout(redirectTimeout);
                goToCatalog();
            };
        } else {
            // fallback
            window.location.href = `catalogo/catalogo.html?user=${encodeURIComponent(nome)}`;
        }
    });
});

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('light') ? 'dark' : 'light';
    setTheme(newTheme);
});
