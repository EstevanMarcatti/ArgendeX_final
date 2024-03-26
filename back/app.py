from flask import Flask, request, jsonify
from flask_cors import CORS
from processamento import processar_dados  # Importe a função processar_dados
from processatualizar import atualizar_dados
from validacao_login import validar_login

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

@app.route('/receber-dados', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True)
