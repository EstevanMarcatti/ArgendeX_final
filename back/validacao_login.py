from flask import Flask, request, jsonify
from flask_cors import CORS
import conexao

app = Flask(__name__)
CORS(app)  # Permite solicitações CORS

# Função para validar o login no banco de dados
def validar_login(email, senha):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT ID FROM cadastro WHERE Email = %s AND Senha = %s"
    val = (email, senha)
    cursor.execute(sql, val)
    usuario = cursor.fetchone()
    conex.close()

    if usuario:
        # Retorna o ID do usuário se o login for bem-sucedido
        return {'erro': False, 'mensagem': {'Email': email, 'ID': usuario[0]}}
    else:
        # Retorna uma mensagem de erro se as credenciais forem inválidas
        return {'erro': True, 'mensagem': {'error': 'Credenciais inválidas'}}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('Email')
    senha = data.get('Senha')

    if email and senha:
        response = validar_login(email, senha)
    else:
        response = {'erro': True, 'mensagem': {'error': 'Credenciais incompletas'}}

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
