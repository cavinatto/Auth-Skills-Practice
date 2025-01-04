// API utilizada para efetuar a verificação do email
const url = "https://go-wash-api.onrender.com/api/user"; 

// Criação da função responsavel pelo cadastro e variaveis que armazenam os valores de login
async function usuario(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let terms = document.getElementById('terms').checked;

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password || !cpf_cnpj || !birthday) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verifica se a senha tem entre 6 a 8 caracteres
    if (password.length < 6 || password.length > 8) {
        alert('A senha deve ter entre 6 e 8 caracteres!');
        return;
    }

    // Verifica se o usuário aceitou os termos
    if (!terms) {
        alert('Por favor, aceite os termos!');
        return;
    }
    
    // Se todos os campos estão preenchidos e o usuário aceitou os termos, envia a requisição para a API
    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "name":name,
                "email":email,
                "user_type_id":1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
                "birthday":birthday    
            }
        ),
        headers:{
            'Content-Type':'application/json'
        }
    });

    // Caso tudo tenha ocorrido como esperado ira aparecer uma mensagem de envio de verificação no email inserido
    if(api.ok){
        let resposta = await api.json();
        console.log(resposta)
        alert(resposta.data)
        window.location.href = 'login.html'; // Redireciona para a pagina inicial 
        return
    }
    
    // Se o email/cpf ja estiver sido cadastrado irá aparecer uma mensagem de erro
    let respostaErro = await api.json();
    if (respostaErro.data.errors.cpf_cnpj) {
        console.log(respostaErro.data.errors.cpf_cnpj[0]);
        alert('O CPF/CNPJ especificado já está em uso!');
    } else {
        console.log(respostaErro.data.errors.email);
        alert('O email especificado já está em uso!');
    }
}