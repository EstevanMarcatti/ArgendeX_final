import Button from 'react-bootstrap/Button';
import './css_config.css'

function BlockExample() {
    return (

        <div className="d-grid gap-2" id='opcoes_config'>
            <h1 id='princonfg'>Principais Configuraçoes</h1>
            <Button variant="primary" size="lg" id='bttconta'>
                <h1>Conta</h1>
            </Button>
        </div>
    );
}

export default BlockExample;
