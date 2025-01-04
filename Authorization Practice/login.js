// API utilizada para efetuar o login
const loginUrl = "https://go-wash-api.onrender.com/api/login";

// Função responsável pelo login do usuário
async function loginUsuario() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verifica se a senha tem entre 6 a 8 caracteres
    if (password.length < 6 || password.length > 8) {
        alert('A senha deve ter entre 6 a 8 caracteres!');
        return;
    }

    try {
        // Envia a requisição para a API
        let api = await fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a requisição foi bem-sucedida
        if (api.ok) {
            let resposta = await api.json();
            
            // Armazena a resposta no localStorage
            localStorage.setItem('access_token', resposta.access_token);
            localStorage.setItem('user', JSON.stringify(resposta.user));

            // Exibe uma mensagem de sucesso e redireciona o usuário para a tela Home
            alert('Login realizado com sucesso!');
            window.location.href = 'endereço.html'; // Redireciona para a tela Home
        } else {
            // Tratamento de erros
            let respostaErro = await api.json();

            if (respostaErro.data.errors){
                alert(respostaErro.data.errors)
            }
        }
    } catch (error) {
        console.error('Erro ao tentar efetuar o login:', error);
        alert('Erro na conexão com o servidor. Tente novamente mais tarde.');
    }
}
