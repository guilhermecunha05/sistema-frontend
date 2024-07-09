// JavaScript source code
window.onload = function (e) {
    var btnRecuperarSenha = document.getElementById("btnRecuperarSenha");
    var txtEmail = document.getElementById("txtEmail");
    txtEmail.focus();

    btnRecuperarSenha.onclick = function (e) {
        e.preventDefault();
        var Email = txtEmail.value;
        
        if (Email == "") {
            
            exibirErro("campo senha obrigatorio");
        }
        
        else {
            RecuperarSenha(Email);
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

    function RecuperarSenha(Email) {
        // WARNING: For POST requests, body is set to null by browsers.
        var data = JSON.stringify({
            "Email": Email
           
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);
                if (result.sucesso) {
                    alert("E-mail eviado com sucesso!");
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:7077/api/usuario/esqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

}