from flask import Flask, request, jsonify
from flask_cors import CORS
from validacao_login import validar_login
from processamento import processar_dados 
from processatualizar import atualizar_dados
from select_atualiz import obter_dados_usuario_por_id, atualizar_dados_usuario
import conexao
import crud
from werkzeug.utils import secure_filename
import os


app = Flask(__name__)
CORS(app)  # Permite solicitações CORS

UPLOAD_FOLDER = 'uploads/fotos_perfil'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)



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
    user_id = request.args.get('user_id')  # Obtém o ID do usuário da query string
    return jsonify(crud.listar_tarefas(user_id))


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


# Definindo as extensões de arquivo permitidas
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Função para verificar se o arquivo tem uma extensão permitida
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/atualizar-foto-perfil/<int:ID>', methods=['POST'])
def atualizar_foto_perfil(ID):
    try:
        # Receber a foto enviada
        foto = request.files.get('foto')  # Arquivo da foto de perfil

        # Verificar se o arquivo é válido (extensão permitida)
        if foto and allowed_file(foto.filename):
            # Salvar o arquivo de foto com nome seguro
            filename = secure_filename(foto.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)

            # Salvar fisicamente a foto no servidor (opcional, dependendo do seu caso)
            foto.save(file_path)

            # Ler o conteúdo da foto em binário para salvar no banco de dados
            with open(file_path, 'rb') as file:
                foto_data = file.read()

            # Atualizar a foto no banco de dados
            resultado = crud.atualizar_foto_perfil(ID, foto_data)

            # Usando o resultado para retornar uma mensagem adequada
            if 'error' in resultado:
                return jsonify({'erro': 'Erro ao atualizar a foto no banco de dados', 'mensagem': resultado['error']}), 500
            else:
                return jsonify({'message': 'Foto de perfil atualizada com sucesso!'}), 200
        else:
            return jsonify({'erro': 'Arquivo inválido. Envie uma imagem PNG, JPG ou JPEG.'}), 400

    except Exception as e:
        return jsonify({'erro': 'Erro ao atualizar foto', 'mensagem': str(e)}), 500


@app.route('/foto-perfil/<int:ID>', methods=['GET'])
def obter_foto_perfil(ID):
    try:
        # Chamando o método do CRUD para buscar a foto de perfil
        foto_perfil = crud.obter_foto_perfil_por_id(ID)

        if foto_perfil:
            from base64 import b64encode
            # Converte a foto de perfil para base64 para ser retornada ao frontend
            foto_base64 = b64encode(foto_perfil).decode('utf-8')
            return jsonify({'foto_perfil': foto_base64})
        else:
            return jsonify({'erro': 'Foto não encontrada.'}), 404
    except Exception as e:
        return jsonify({'erro': 'Erro ao buscar foto de perfil', 'mensagem': str(e)}), 500



if __name__ == '__main__':
    app.run(port=8085, host='0.0.0.0', debug=True, threaded=True)