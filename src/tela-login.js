window.onload = function (e) {
    var btnEntrar = document.getElementById("btnEntrar");
    var txtEmail = document.getElementById("txtEmail");
    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();


    btnEntrar.onclick = function (e) {
        e.preventDefault();
        var Email = txtEmail.value;
        var Senha = txtSenha.value;
        if (Email == "") {
            exibirErro("campo email obrigatorio");
        }
        else if (Senha == "") {
            exibirErro("campo senha obrigatorio");
        }
        else {
            realizarLogin(Email, Senha);
        }
    };
    function exibirErro(mensagem) {
        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";
        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }



    function realizarLogin(Email, Senha) {
        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "Email": Email,
            "Senha": Senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);
                if (result.sucesso) {
                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = 'home.html';
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7077/api/usuario/login");
        xhr.setRequestHeader("content-Type", "application/json");

        xhr.send(data);
    }
}