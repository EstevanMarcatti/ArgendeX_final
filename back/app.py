from flask import Flask, request, jsonify
import conexao
from flask_cors import CORS
from processamento import processar_dados  # Importe a função processar_dados
from processatualizar import atualizar_dados
from validacao_login import  validar_login



app = Flask(__name__)
CORS(app)  # Permita solicitações CORS

@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    dados = request.json
    ret = processar_dados(dados)  # Chame a função processar_dados
    
    
    print('************************************************************************\n')
    print(ret)
    print('************************************************************************\n')
    return jsonify(ret)

@app.route('/redefinir_dados', methods=['POST'])
def redefinir_dados():
    dados = request.json
    ret = atualizar_dados(dados)  # Chame a função processar_dados
    
    
    print('************************************************************************\n')
    print(ret)
    print('************************************************************************\n')
    return jsonify(ret)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('Email')
    senha = data.get('Senha')

    # Verificar as credenciais no banco de dados
    if email and senha:
        response = validar_login(email, senha)
    else:
        response = {'error': 'Credenciais incompletas'}, 400

    return jsonify(response)

@app.route('/delete_usuario/<int:user_id>', methods=['DELETE'])
def delete_usuario(user_id):
    try:
        # Chamar a função para excluir o cadastro
        delete_usuario_db(user_id)
        
        # Retornar a resposta com o código de status apropriado
        return jsonify({'message': 'Usuário excluído com sucesso'}), 200
    except Exception as e:
        return {'error': f'Erro ao processar solicitação: {str(e)}'}, 500

def delete_usuario_db(user_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM cadastro WHERE ID = %s"
    val = (user_id,)
    cursor.execute(sql, val)
    conex.commit()
    print("Usuário deletado com sucesso")
    conex.close()



if __name__ == '__main__':
    app.run(debug=True)
