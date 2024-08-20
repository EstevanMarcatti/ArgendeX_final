from validacoes import (
    validar_nome,
    validar_email,
    validar_senha,
)
import conexao  # Supondo que você tenha uma função de conexão com o banco de dados

def atualizar_dados(ID, dados):
    # Validações
    mensagens_erro = []
    mensagens_erro.append(validar_nome(dados.get('nome', '')))
    mensagens_erro.append(validar_email(dados.get('email', '')))
    mensagens_erro.append(validar_senha(dados.get('senha', '')))

    # Remove mensagens de erro vazias
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    
    # Atualiza os dados no banco de dados
    try:
        conex = conexao.conectar()
        cursor = conex.cursor()
        sql = "UPDATE cadastro SET nome = %s, email = %s, senha = %s WHERE ID = %s"
        val = (dados.get('nome'), dados.get('email'), dados.get('senha'), ID)
        cursor.execute(sql, val)
        conex.commit()
        conex.close()
        return {'erro': False, 'mensagem': 'Dados atualizados com sucesso!'}
    except Exception as e:
        return {'erro': True, 'mensagem': f'Erro ao atualizar dados: {str(e)}'}
