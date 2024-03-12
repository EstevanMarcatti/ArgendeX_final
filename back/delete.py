import conexao

# função para deletar um usuario

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

def deletar_tarefa():
    tarefa_id = int(input("Digite o ID da tarefa que deseja deletar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "DELETE FROM tarefa WHERE ID = %s"
    val = (tarefa_id,)
    cursor.execute(sql, val)
    conex.commit()
    print("tarefa deletada")
    conex.close()

def menu():

    print("1. Deletar usuario")
    print("2. Deletar tarefa")
    opcao = input("Digite o número da opção desejada:")

    if opcao == "1":
        deletar_cadastro()
    elif opcao == "2":
        deletar_tarefa()
    else:
        print("Opção inválida. por favor, escolha uma opção valida.")

       




if __name__ == "__main__":
    menu()
    