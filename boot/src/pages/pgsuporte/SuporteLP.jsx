import './suporte.css'

export default function Suporte() {
    return (

        <div id='back-suporte'>
            <div id="container-Suporte">
                <div className="inicio-suporte">
                    <a id="inicial-suporte" href="">ArgendeX</a>
                </div>
                <h2 id="text-suporte">
                    Explique quais são os seus problemas? <b id="text1-suporte"></b>
                </h2>
                <form id="register-form-suporte" action="">
                    <div className="half-box spacing-suporte">
                        <label for="name">Nome</label>
                        <input type="text" name="name" id="name-suporte" placeholder="Digite seu nome" data-required data-min-length="3"
                            data-max-length="40" />
                    </div>
                    <div className="full-box-suporte">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email-suporte" placeholder="Digite seu e-mail" data-min-length="8"
                            data-email-validate />
                    </div>
                    <div className="sup-suporte">
                        <label for="suport">Fale conosco</label>
                        <textarea name="suporte" id="suporte-suporte" cols="52" rows="10"  maxLength={1250}></textarea>
                    </div>
                    <div className="arquivo-suporte">
                        <label for="arquivo">Anexe um arquivo</label>
                        <input type="file" name="arqv" id="arqv-suporte" />
                    </div>
                    <div className="full-box-suporte" id="box-button-suporte">
                        <a href="index.html"><input id="btn-submit-suporte" type="submit" value="Enviar" /></a>
                        <input id="button-suporte" type="button" value="Limpar" onclick="limpaForm()" />
                    </div>
                    <div className="volta-suporte">
                        <br />
                        <p id="volta1-suporte">Já tem conta no ArgendeX?<a id="text1-suporte" href="Login"> Vá para a página de login</a></p>
                        <p id="volta2-suporte">Volte para a pagina inicial<a id="text1-suporte" href="/"> clique aqui.</a></p>
                        <p id="volta2-suporte">Nao tem conta ainda?<a id="text1-suporte" href="Cadastro"> Crie agora!.</a></p>

                    </div>
                </form>
            </div>
            <p className="error-validation template"></p>
            <script src="../../js/jscadastro.js"></script>
        </div>

    );
}