import conexao

# função para deletar um usuario

def selecionar_usuario():
    usuario_id = int(input("Digite o ID do usuario que deseja selecinar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * FROM usuario WHERE ID = %s"
    val = (usuario_id,)
    cursor.execute(sql, val)
    usuario = cursor.fetchone()
    conex.close()
    return print(usuario)


def atualizar_cadastro():
    usuario_id = int(input("Digite o ID do usuario que deseja atualizar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE FROM cadastro WHERE ID = %s"
    val = (usuario_id,)
    cursor.execute(sql, val)
    conex.commit()
    print("Usuarios atualizados com sucesso")
    conex.close()

def atualizar_tarefa():
    tarefa_id = int(input("Digite o ID da tarefa que deseja atualizar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "UPDATE FROM tarefa WHERE ID = %s"
    val = (tarefa_id,)
    cursor.execute(sql, val)
    conex.commit()
    print("tarefa atualizada")
    conex.close()


def menu():

    print("1. atualizar usuario")
    print("2. atualizar tarefa")
    opcao = input("Digite o número da opção desejada:")

    if opcao == "1":
        selecionar_usuario()
        atualizar_cadastro()
    elif opcao == "2":
        atualizar_tarefa()
    else:
        print("Opção inválida. por favor, escolha uma opção valida.")

if __name__ == "__main__":
    menu()