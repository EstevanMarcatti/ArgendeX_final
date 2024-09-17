from flask import Flask, request, jsonify
from flask_cors import CORS
from validacao_login import validar_login
from processamento import processar_dados 
from processatualizar import atualizar_dados
from select_atualiz import obter_dados_usuario_por_id, atualizar_dados_usuario
import conexao
import crud

app = Flask(__name__)
CORS(app)  # Permite solicitações CORS

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('Email')
    senha = data.get('Senha')

    if email and senha:
        response = validar_login(email, senha)
        return jsonify(response)
    else:
        return jsonify({'erro': 'Credenciais incompletas'}), 400

@app.route('/receber-dados', methods=['POST'])
def receber_dados():
    try:
        dados = request.json
        ret = processar_dados(dados)
        return jsonify(ret)
    except Exception as e:
        return jsonify({'erro': 'Erro interno do servidor', 'mensagem': str(e)}), 500


@app.route('/redefinir_dados', methods=['POST'])
def redefinir_dados():
    dados = request.json
    ret = atualizar_dados(dados)
    return jsonify(ret)

@app.route('/dados-usuario/<int:ID>', methods=['GET'])
def obter_dados_usuario(ID):
    usuario = obter_dados_usuario_por_id(ID)
    if usuario:
        return jsonify({
            'ID': usuario[0],
            'nome': usuario[1],
            'email': usuario[2],
            'senha': usuario[3]
        })
    else:
        return jsonify({'erro': 'Usuário não encontrado'}), 404

@app.route('/atualizar-dados/<int:ID>', methods=['POST'])
def atualizar_dados_usuario(ID):
    dados = request.json
    resultado = atualizar_dados(ID, dados)
    return jsonify(resultado)

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    print('dados gravação: ', data)
    return crud.criar_tarefa(data)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(crud.listar_tarefas())

@app.route('/tasks', methods=['PUT'])
def update_task():
    data = request.json
    print('dados update: ', data)
    return crud.atualizar_tarefa(data)

@app.route('/tasks', methods=['DELETE'])
def delete_task():
    data = request.json
    print('dados delete: ', data)
    return crud.deletar_tarefa(data['id'])

if __name__ == '__main__':
    app.run(port=8085, host='0.0.0.0', debug=True, threaded=True)
