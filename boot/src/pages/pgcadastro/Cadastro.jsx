import './cadastro.css'

export default function Cadastro() {
    return (
        <div id='back-cadastro'>
            <div id="container-Cadastro">
                <div className="inicio-cadastro">
                    <a id="inicial-cadastro" href="">ArgendeX</a >
                </div>
                <h2 id="text">
                    Crie sua conta no <b id="text1-cadastro">ArgendeX</b>
                </h2>
                <form id="register-form-cadastro" action="">
                    <div className="form-box spacing-cadastro">
                        <label for="name">Nome</label>
                        <input type="text" name="name" id="name-cadastro" placeholder="Digite seu nome" data-required data-min-length="3"
                            data-max-length="40" />
                    </div>
                    <div className="email-form">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email-cadastro" placeholder="Digite seu e-mail" data-min-length="8"
                            data-email-validate />
                    </div>
                    <div className="form-box spacing">
                        <label for="lastname">Senha</label>
                        <input type="password" name="password" id="password-cadastro" placeholder="Digite sua senha"
                            data-password-validate data-required />
                    </div>
                    <div className="form-box-cadastro">
                        <label for="passconfirmation">Confirmação de senha</label>
                        <input type="password" name="passconfirmation" id="passwordconfirmation-cadastro"
                            placeholder="Digite novamente sua senha" data-equal="password" />
                    </div>
                    <div>
                        <input type="checkbox" name="agreement" id="agreement-cadastro" required />
                        <label for="agreement" id="agreement-label-cadastro">Eu li e aceito os <a href="#" id='termos-cadastro'>termos de uso</a></label>
                    </div>

                    <div className="button-form" id="box-button-cadastro">
                        <input id="btn-submit-cadastro" type="submit" value="Registrar" />
                        <input id="button-cadastro" type="button" value="Cancelar" onclick="limpaForm()" />
                    </div>
                    <div className="volta-cadastro">
                        <br />
                        <p id="volta1-cadastro">Já tem conta no ArgendeX?<a id="text1-cadastro" href="Login"> Vá para a página de login</a></p> 
                        <p id="volta2-cadastro">Precisa de ajuda?<a id="text1-cadastro" href="Suporte"> Acesse nossa central de ajuda.</a></p>
                    </div>
                </form>
            </div>
            <p className="error-validation template"></p>
            <script src="../../js/jscadastro.js"></script>
        </div>
    );
}