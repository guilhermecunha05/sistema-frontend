window.onload = function (e) {
    var txtNome = document.getElementById("txtNome");
    var btnCadastrar = document.getElementById("btnCadastrar");
    var txtNome = document.getElementById("txtNome");
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("txtEmail");
    var txtTelefone = document.getElementById("txtTelefone");
    var txtCPF = document.getElementById("txtCPF");
    var slcGenero = document.getElementById("slcGenero");
    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var Nome = txtNome.value;
        var Sobrenome = txtSobrenome.value;
        var Email = txtEmail.value;
        var Telefone = txtTelefone.value;
        var CPF = txtCPF.value;
        var Genero = slcGenero.value;
        var Senha = txtSenha.value;

        if (Nome == "") {
            exibirMensagemErro("informe o nome");
        }
        else if (Sobrenome == "") {
            exibirMensagemErro("informe o sobrenome");
        }
        else if (Email == "") {
            exibirMensagemErro("informe o email");
        }
        else if (Telefone == "") {
            exibirMensagemErro("informe o telefone");
        }
        else if (CPF == "") {
            exibirMensagemErro("informe o CPF");
        }
        else if (Senha == "") {
            exibirMensagemErro("informe a senha");
        }
        else {
            cadastrar(Nome, Sobrenome, Email, CPF, Telefone, Genero, Senha);
        }
    };
    function exibirMensagemErro(mensagem) {
        spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";
        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }

    function cadastrar(Nome, Sobrenome, email, CPF, telefone, genero, senha) {
        var data = JSON.stringify({
            "Nome": Nome,
            "Sobrenome": Sobrenome,
            "email": email,
            "CPF": CPF,
            "telefone": telefone,
            "genero": genero,
            "senha": senha
        });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);
                if (result.sucesso) 
                {  localStorage.setItem("UsuarioGuid", result.UsuarioGuid);

                    window.location.href = 'home.html';
                                        }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });
        xhr.open("POST", "https://localhost:7077/api/usuario/cadastro");
        xhr.setRequestHeader("content-Type", "application/json");
        xhr.send(data);

    }
}