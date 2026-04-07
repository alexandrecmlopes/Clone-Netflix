import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    // Voltar para a tela inicial ao clicar na logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            // Limpa perfil ativo se desejar:
            // localStorage.removeItem('perfilAtivoNome');
            // localStorage.removeItem('perfilAtivoImagem');
            window.location.href = '../index.html';
        });
    }
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    let imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    // Corrige caminho relativo se necessário
    if (imagemPerfil && !imagemPerfil.startsWith('http')) {
        imagemPerfil = '../' + imagemPerfil.replace(/^\.\/?/, '');
    }

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    // Dropdown de troca de usuário
    const profileMenu = document.querySelector('.profile-menu');
    const dropdown = document.querySelector('.profile-dropdown');
    if (profileMenu && dropdown) {
        profileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
        });
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        dropdown.querySelectorAll('.profile-option').forEach(option => {
            option.addEventListener('click', function () {
                const nome = this.getAttribute('data-nome');
                const img = this.getAttribute('data-img');
                localStorage.setItem('perfilAtivoNome', nome);
                localStorage.setItem('perfilAtivoImagem', img.replace('../', 'assets/'));
                // Atualiza UI
                const kidsLink = document.querySelector('.kids-link');
                const profileIcon = document.querySelector('.profile-icon');
                if (kidsLink) kidsLink.textContent = nome;
                if (profileIcon) profileIcon.src = img;
                dropdown.style.display = 'none';
            });
        });
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
