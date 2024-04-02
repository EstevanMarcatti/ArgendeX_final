from flask import Flask, request, jsonify
import conexao

app = Flask(__name__)

def obter_dados_usuario_por_id(ID):
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * FROM cadastro WHERE ID = %s"
    val = (ID,)
    cursor.execute(sql, val)
    usuario = cursor.fetchone()
    conex.close()
    return usuario

if __name__ == '__main__':
    app.run(debug=True)
