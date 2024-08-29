from gravar_bd import inserir_Cadastro
from validacoes import (
    validar_nome,
    validar_email,
    validar_cidade,
    validar_data_nascimento,
    validar_senha
)


def processar_dados(dados):
    try:
        # Processar os dados
        mensagens_erro = []

        mensagens_erro.append(validar_nome(dados.get('nome', '')))
        mensagens_erro.append(validar_email(dados.get('email', '')))
        mensagens_erro.append(validar_senha(dados.get('senha', '')))
        mensagens_erro.append(validar_cidade(dados.get('cidade', '')))
        mensagens_erro.append(validar_data_nascimento(dados.get('dataNascimento', '')))

        mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

        if mensagens_erro:
            return {'erro': True, 'mensagens': mensagens_erro}
        else:
            inserir_Cadastro(dados['nome'], dados['email'], dados['senha'], dados['cidade'], dados['dataNascimento'])
            return {'erro': False, 'mensagem': 'Dados Processados com Sucesso!'}
    except Exception as e:
        return {'erro': True, 'mensagem': str(e)}










