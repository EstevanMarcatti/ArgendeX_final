
{/* 
    Footer Componente
    Joao Gabriel
    01/12/2023 (ultima alteração)
    Descrição Detalhada :
        Consiste em demontrar no final do site
        a historia de nossa empresa e nossa forma
        de contato
    Observações Pertinentes:
 */}





import './Footer.css'




export default function Footer() {

    return (

        
        <footer className="footer-">
            <img src="../../img/footergreen.png" alt="" id="img_footer"/>
            <div className="nome_logo">
                <img src="../../img/Logion.png" alt="" id="logo_footer"/>
                <h1 id="nome_footer">ArgendeX</h1>
            </div>
            <div className="all_footer-"/>
                <div id='texto_equipe'/>
                    <h3 id='txt_equip1-'>Projetado e construído com todo <br/> o amor do mundo pela equipe JTP.</h3>
                    <h3 id='txt_equip2-'>Bem-vindo ao ArgendeX, onde você organiza sua vida! <br/> Somos a equipe JovenTechPro,
                        um grupo de jovens entusiastas da programação,<br/> comprometidos em criar soluções tecnológicas
                        excepcionais.</h3>
                    <h3 id='txt_equip3-'>JovenTechPro - Transformando ideias em realidade através da programação.</h3>
                <div/>
                <div className="contato">
                    <div className="email">
                        <h2>E-mail</h2>
                        <h3>Suporte@ArgendeX.com</h3>
                        <h3>Financeiro@ArgendeX.com</h3>
                    </div>
                    <div className="telefone">
                        <h2>Telefone</h2>
                        <h3>+55 (19) 99838-8670</h3>
                        <h3>+55 (11) 94031-1533</h3>
                        <h3>+55 (19) 99905-2839</h3>
                    </div>
                </div>
                <div>
                    <h1 id="redesocial">Redes Sociais</h1>
                    <div className="inst">
                        <img src="../../img/insta.png" alt=""/>
                        <h2>Instagram</h2>
                    </div>
                    <div className="wz">
                        <img src="../../img/logo_wz-removebg-preview.png" alt=""/>
                        <h2>WhatsApp</h2>
                    </div>
                    <div className="face">
                        <img src="../../img/logo_face-removebg-preview.png" alt=""/>
                        <h2>FaceBook</h2>
                    </div>
                    <div className="tw">
                        <img src="../../img/logo_tw-removebg-preview.png" alt=""/>
                        <h2>Twitter</h2>
                    </div>
                </div>
            <div/>
            
        </footer>
    );

}

