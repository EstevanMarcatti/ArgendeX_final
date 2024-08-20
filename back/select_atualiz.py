import conexao

def obter_dados_usuario_por_id(ID):
    try:
        conex = conexao.conectar()
        cursor = conex.cursor()
        sql = "SELECT * FROM cadastro WHERE ID = %s"
        val = (ID,)
        cursor.execute(sql, val)
        usuario = cursor.fetchone()
        conex.close()
        return usuario
    except Exception as e:
        print(f"Erro ao obter dados do usuário: {e}")
        return None

def atualizar_dados_usuario(ID, nome, email, senha):
    try:
        conex = conexao.conectar()
        cursor = conex.cursor()
        sql = "UPDATE cadastro SET nome = %s, email = %s, senha = %s WHERE ID = %s"
        val = (nome, email, senha, ID)
        cursor.execute(sql, val)
        conex.commit()
        conex.close()
        return {'mensagem': 'Dados atualizados com sucesso!'}
    except Exception as e:
        print(f"Erro ao atualizar dados: {e}")
        return {'erro': 'Erro ao atualizar dados'}
