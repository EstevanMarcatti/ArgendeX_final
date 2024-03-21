import conexao

# função para recuperar todos os autores
def selecionar_usuarios():
    usuario_email = input("Digite o email do usuário referente a sua conta: ")
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * FROM cadastro WHERE Email = %s"
    val = (usuario_email,)
    cursor.execute(sql, val)
    usuarios = cursor.fetchall()
    conex.close()
    return usuarios

if __name__ == "__main__":
    for usuario in selecionar_usuarios():
        print(usuario)