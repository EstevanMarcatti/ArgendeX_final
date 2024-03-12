import { Link } from 'react-router-dom';
import './css_config.css'

function BlockExample() {
    return (

        <div className="d-grid gap-2" id='opcoes_config'>
            <h1 id='princonfg'>Principais Configuraçoes</h1>
            <li><Link to="/Subcadastro" id='linkcadastro'><h1 id='bttconta'>Conta</h1></Link></li>
        </div>
    );
}

export default BlockExample;

