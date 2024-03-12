import conexao
# função para recuperar todos os autores

def selecionar_usuarios():
    usuario_id = int(input("Digite o ID do usuario que deseja selecinar:"))
    conex = conexao.conectar()
    cursor = conex.cursor()
    sql = "SELECT * FROM usuario WHERE ID = %s"
    val = (usuario_id,)
    cursor.execute(sql, val)
    usuario = cursor.fetchone()
    conex.close()
    return usuario


#def selecionar_cadastros():
#    conex = conexao.conectar()
#    cursor = conex.cursor()
#    cursor.execute("SELECT * FROM cadastro ")
#    cadastro = cursor.fetchall()
#    conex.close()
#    return cadastro
#

# exemplo de uso

if __name__ == "__main__":

    for usuario in selecionar_usuarios():
        print(usuario)

    #print("\nCadastros:")
    #for cadastro in selecionar_cadastros():
    #    print(cadastro)
