from flask import Flask, jsonify
import conexao
app = Flask(__name__)

def selecionar_usuario():
    usuario_id = int(input("Digite o ID do usuario que deseja selecinar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * FROM cadastro WHERE ID = %s"
    val = (usuario_id,)
    cursor.execute(sql, val)
    usuario = cursor.fetchone()
    conex.close()
    return print(usuario)

def deletar_cadastro():
    usuario_id = int(input("Digite o ID do usuario que deseja deletar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM cadastro WHERE ID = %s"
    val = (usuario_id,)
    cursor.execute(sql, val)
    conex.commit()
    print("Usuarios deletados com sucesso")
    conex.close()

# Rota para excluir a conta de um usuário

if __name__ == '__main__':
    app.run(debug=True)
