import conexao

# Funçao para inserir um novo cadastro


def inserir_Cadastro(ID, Nome, Email, Senha, Cidade, Data_nascimento):
    conex = conexao.conectar()
    cursor = conex.cursor()

    sql = "INSERT INTO cadastro (ID, Nome, Email, Senha, Cidade, Data_nascimento) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (ID, Nome, Email, Senha, Cidade, Data_nascimento)

    cursor.execute(sql, val)
    conex.commit()

    print("Novo Cadastro inserido com sucesso!")
    conex.close()



