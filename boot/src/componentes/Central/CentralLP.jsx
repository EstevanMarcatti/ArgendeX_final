{/* 
    Componente Slogan inicial
    Estevan
    29/11/2023 (ultima alteração)
    Descrição Detalhada :
        Um slogan com frase de markete e um
        designer 3D sobre nosso produto.
    Observações Pertinentes:
 */}




import './CentralLP.css'



export default function CentralLP() {

    return (
        <>
            {/*cadastro do email*/}
            <h1 id="verde">Site para agendamentos de sua empresa</h1>
                    <h1 id="branco">Programação de agendamentos, melhore seus serviços,<br /> promova seu negócio, agendamento                                                          
                        online 24h, lembrete para clientes.</h1>
                    
            <section className="meio">
                <div className="sobre">
                    
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        
                </div>
                {/*Imagem lateral da primeira parte do site*/}
                <iframe src="https://my.spline.design/argendex1-11ebd772f929de9991bdcae396c4a4dd/" frameborder="0"
                    width="1500px" id="obj3d"></iframe>

                <div id="logocobre">
                    <img src="https://thumbs2.imgbox.com/8c/ab/eDptieML_t.png" alt=""/>
                </div>

            </section>
        </>
    );

}
