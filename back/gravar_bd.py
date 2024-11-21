import conexao

def inserir_Cadastro(nome, email, senha, cidade, data_nascimento):
    conex = conexao.conectar()
    cursor = conex.cursor()

    sql = "INSERT INTO cadastro (Nome, Email, Senha, Cidade, Data_nascimento) VALUES (%s, %s, %s, %s, %s)"
    val = (nome, email, senha, cidade, data_nascimento)

    cursor.execute(sql, val)
    conex.commit()

    print("Novo Cadastro inserido com sucesso!")
    conex.close()


def Configconta(dados_processados):
    conex = conexao.conectar()
    cursor = conex.cursor()

    sql = "INSERT INTO cadastro (Nome, Email, Senha) VALUES (%s, %s, %s)"
    val = (dados_processados)

    cursor.execute(sql, val)
    conex.commit()

    print("Cadastro redefinido com sucesso!")
    conex.close()

    
'''----------------------------tarefa----------------------------------------------------------------------------------------------------------'''

# Função para atualizar a foto de perfil
def atualizar_foto_perfil(user_id, foto_data):
    # A função assume que você já tem uma função para conectar ao banco de dados
    conex = conexao.conectar()
    cursor = conex.cursor()

    # Query para atualizar a foto no banco de dados
    update_query = "UPDATE cadastro SET foto = %s WHERE id = %s"
    
    cursor.execute(update_query, (foto_data, user_id))
    conex.commit()
    
    cursor.close()
    conex.close()

    print("Foto de perfil atualizada com sucesso!")
