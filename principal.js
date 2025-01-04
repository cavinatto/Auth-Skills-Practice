// Pegando o id do botao para poder usá-lo
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');

// Adicionamos um "evento" ao botão de registro
registerBtn.addEventListener('click', () => {
    // Redireciona à página de cadastro
    window.location.href = 'cadastro.html';
});

// Adicionamos um "evento" ao botão de login
loginBtn.addEventListener('click', () => {
    // Redireciona à página de login
    window.location.href = 'login.html';
});

// Pegando o id do botão
const mostrarMaisBtn = document.getElementById('mostrar-mais');

// Inicializando um contador de linhas exibidas
let linhasExibidas = 1; // Começa com a primeira linha exibida

// Adicionamos um "evento" ao botão
mostrarMaisBtn.addEventListener('click', () => {
    // Controla a exibição das linhas
    if (linhasExibidas === 1) {
        document.getElementById('carros-2').style.display = 'flex'; // Exibe a segunda linha
    } else if (linhasExibidas === 2) {
        document.getElementById('carros-3').style.display = 'flex'; // Exibe a terceira linha
    } else if (linhasExibidas === 3) {
        document.getElementById('carros-4').style.display = 'flex'; // Exibe a quarta linha
        mostrarMaisBtn.style.display = 'none'; // Esconde o botão após exibir todas as linhas
    }
    linhasExibidas++;
});
