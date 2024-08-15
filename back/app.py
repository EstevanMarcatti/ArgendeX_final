from flask import Flask, request, jsonify
import conexao
from flask_cors import CORS
from processamento import processar_dados  # Importe a função processar_dados
from processatualizar import atualizar_dados
from validacao_login import validar_login
from select_atualiz import obter_dados_usuario_por_id

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
    ret = atualizar_dados(dados)  # Chame a função atualizar_dados
    
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
        response = {'erro': 'Credenciais incompletas'}, 400

    return jsonify(response)

@app.route('/delete_usuario/<int:user_id>', methods=['DELETE'])
def delete_usuario(user_id):
    try:
        # Chamar a função para excluir o cadastro
        delete_usuario_db(user_id)
        
        # Retornar a resposta com o código de status apropriado
        return jsonify({'mensagem': 'Usuário excluído com sucesso'}), 200
    except Exception as e:
        return jsonify({'erro': f'Erro ao processar solicitação: {str(e)}'}), 500

def delete_usuario_db(user_id):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM cadastro WHERE ID = %s"
    val = (user_id,)
    cursor.execute(sql, val)
    conex.commit()
    print("Usuário deletado com sucesso")
    conex.close()

@app.route('/dados-usuario/<int:ID>', methods=['GET'])
def obter_dados_usuario(ID):
    usuario = obter_dados_usuario_por_id(ID)
    if usuario:
        return jsonify({'ID': usuario[0], 'nome': usuario[1], 'email': usuario[2], 'senha': usuario[3]})
    else:
        return jsonify({'erro': 'Usuário não encontrado'}), 404

@app.route('/atualizar-dados/<int:ID>', methods=['POST'])
def atualizar_dados_usuario(ID):
    dados = request.json
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')

    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE cadastro SET nome = %s, email = %s, senha = %s WHERE ID = %s"
    val = (nome, email, senha, ID)
    cursor.execute(sql, val)
    conex.commit()
    conex.close()

    return jsonify({'mensagem': 'Dados atualizados com sucesso!'})






@app.route('/api/tarefa', methods=['GET'])
def get_tarefas():
    conn = conexao.conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tarefa")
    tarefas = cursor.fetchall()
    conn.close()
    
    tarefas_list = [{'id': t[0], 'date': t[1], 'title': t[2], 'description': t[3], 'user_id': t[4]} for t in tarefas]
    return jsonify(tarefas_list)

@app.route('/api/tarefa', methods=['POST'])
def create_tarefa():
    dados = request.json
    date = dados.get('date')
    title = dados.get('title')
    description = dados.get('description')
    user_id = dados.get('user_id')

    conn = conexao.conectar()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tarefa (date, title, description, user_id) VALUES (%s, %s, %s, %s)",
        (date, title, description, user_id)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({'id': new_id, 'date': date, 'title': title, 'description': description, 'user_id': user_id})

@app.route('/api/tarefa/<int:tarefa_id>', methods=['PUT'])
def update_tarefa(tarefa_id):
    dados = request.json
    title = dados.get('title')
    description = dados.get('description')

    conn = conexao.conectar()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE tarefa SET title = %s, description = %s WHERE id = %s",
        (title, description, tarefa_id)
    )
    conn.commit()
    conn.close()

    return jsonify({'id': tarefa_id, 'title': title, 'description': description})

@app.route('/api/tarefa/<int:tarefa_id>', methods=['DELETE'])
def delete_tarefa(tarefa_id):
    conn = conexao.conectar()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tarefa WHERE id = %s", (tarefa_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Tarefa excluída com sucesso'})
# Mantenha o restante do seu código original


if __name__ == '__main__':
    app.run(port=8085, host='10.135.60.8', debug=True, threaded=True)
