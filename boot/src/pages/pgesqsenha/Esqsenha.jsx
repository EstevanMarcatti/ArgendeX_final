import './esqsenha.css'

export default function Esqsenha() {
    return (

        <div id='back-esqsenha'>
            <div id="container-Esqsenha">
                <div className="inicio-esqsenha">
                    <a id="inicial-esqsenha" href="">ArgendeX</a>
                </div>
                <h2 id="text-esqsenha">
                    Redefinição de senha.
                </h2>
                <form id="register-form-esqsenha" action="">

                    <div className="email-form-esqsenha">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email-esqsenha" placeholder="Digite seu e-mail" data-min-length="8"
                            data-email-validate />
                    </div>

                    <div className="button-form" id="box-button-esqsenha">
                        <input id="btn-submit-esqsenha" type="submit" value="Redefinir" />
                    </div>
                    <div className="volta-esqsenha">
                        <br />
                        <p id="volta1-esqsenha">Já tem conta no ArgendeX?<a id="text1-esqsenha" href="Login"> Vá para a página de login</a></p>
                        <p id="volta2-esqsenha">Precisa de ajuda?<a id="text1-esqsenha" href="Suporte"> Acesse nossa central de ajuda.</a></p>
                    </div>
                </form>
            </div>
            <p className="error-validation template"></p>
            <script src="../../js/jscadastro.js"></script>
        </div>

    );
}