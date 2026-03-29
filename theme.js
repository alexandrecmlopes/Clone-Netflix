// Função para alternar entre dark e light mode
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');
    body.classList.toggle('light-mode');
    // Salva preferência no localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        btn.innerHTML = '🌙'; // Lua para modo claro
    } else {
        localStorage.setItem('theme', 'dark');
        btn.innerHTML = '☀️'; // Sol para modo escuro
    }
}

// Aplica o tema salvo ao carregar a página
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.getElementById('theme-toggle');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        btn.innerHTML = '🌙';
    } else {
        btn.innerHTML = '☀️';
    }
};