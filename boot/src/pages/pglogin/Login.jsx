import './login.css'
import {Link} from 'react-router-dom'

export default function Login() {
    return (
        <div id='back-login'>
            <div id="container-login">
                <div className="inicio-login">
                    <a id="inicial-login" href="">ArgendeX</a>
                </div>
                <h1>Conecte-se e organize sua agenda.</h1>

                <form id="register-form-login" action="">

                    <div className="email-form-login">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email-login" placeholder="Digite seu e-mail" data-min-length="8" data-email-validate />
                    </div>

                    <div className="form-box spacing-login">
                        <label for="lastname">Senha</label>
                        <input type="password" name="password" id="password-login" placeholder="Digite sua senha" data-password-validate data-required />
                    </div>

                    <div className="div-button">
                    <li><Link to="/Appsite" id='button-login'>Entrar</Link></li>
                    </div>

                    <div className="volta-login">
                        <p id="volta1-login">Esqueceu sua senha?<a id="text1-login" href="Esqsenha"> clique aqui</a></p>
                        <p id="volta2-login">Precisa de ajuda?<a id="text1-login" href="Suporte"> Acesse nossa central de ajuda.</a></p>
                    </div>
                </form>

            </div>
            <p className="error-validation template"></p>
            <script src="../../js/jscadastro.js"></script>
        </div>

    );
}

