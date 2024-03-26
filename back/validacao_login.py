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
        #return {'Email': email, 'Senha': senha, 'ID': usuario[0]}
        return {'erro': False, 'mensagem': {'Email': email, 'Senha': senha, 'ID': usuario[0]}}
    else:
        # Retorna uma mensagem de erro se as credenciais forem inválidas
        return {'erro': True,'mensagem':{'error': 'Credenciais inválidas'}}



if __name__ == '__main__':
    app.run(debug=True)
