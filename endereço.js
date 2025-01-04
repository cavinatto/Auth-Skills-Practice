// API para efetuar o cadastro de endereço
const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address";

// Função responsável pelo cadastro de endereço
async function cadastrarEndereco() {
    let titulo = document.getElementById('titulo').value;
    let cep = document.getElementById('cep').value;
    let endereco = document.getElementById('endereco').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!titulo || !cep || !endereco || !numero) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Obtém o token do localStorage
    const token = localStorage.getItem('access_token');
    if (!token) {
        alert('Você precisa estar logado para cadastrar um endereço.');
        return;
    }

    try {
        // Envia a requisição para a API
        let respostaApi = await fetch(urlEndereco, {
            method: "POST",
            body: JSON.stringify({
                "title": titulo,
                "cep": cep,
                "address": endereco,
                "number": numero,
                "complement": complemento
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
            }
        });

        // Verifica se a requisição foi bem-sucedida
        if (respostaApi.ok) {
            let resposta = await respostaApi.json();
            alert('Endereço cadastrado com sucesso!');
            // Você pode redirecionar ou limpar o formulário, se necessário
            window.location.href = 'principal.html'; // Redireciona para a tela Home ou outra página
        } else {
            // Tratamento de erros
            let respostaErro = await respostaApi.json();
            const mensagemErro = respostaErro.data.errors;
            alert(mensagemErro);
        }
    } catch (error) {
        console.error('Erro ao tentar cadastrar o endereço:', error);
        alert('Insira um endereço válido');
    }
}
