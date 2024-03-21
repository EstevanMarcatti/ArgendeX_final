from flask import Flask, request, jsonify
from flask_cors import CORS
import conexao

app = Flask(__name__)
CORS(app)  # Permitindo CORS globalmente para todas as rotas

# Função para validar o login no banco de dados
def validar_login(email, senha):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * FROM cadastro WHERE Email = %s AND Senha = %s"
    val = (email, senha)
    cursor.execute(sql, val)
    usuario = cursor.fetchone()
    conex.close()

    if usuario:
        # Retorna os dados do usuário se o login for bem-sucedido
        return {'Email': email, 'Senha': senha, 'ID': usuario[0]}
    else:
        # Retorna uma mensagem de erro se as credenciais forem inválidas
        return {'error': 'Credenciais inválidas'}, 401

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

if __name__ == '__main__':
    app.run(debug=True)
