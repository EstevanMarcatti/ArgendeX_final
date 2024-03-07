
import conexao


def inserir_Cadastro(dados_processados):
    conex = conexao.conectar()
    cursor = conex.cursor()

    sql = "INSERT INTO cadastro (Nome, Email, Senha, Cidade, Data_nascimento) VALUES (%s, %s, %s, %s, %s)"
    val = (dados_processados)

    cursor.execute(sql, val)
    conex.commit()

    print("Novo Cadastro inserido com sucesso!")
    conex.close()

