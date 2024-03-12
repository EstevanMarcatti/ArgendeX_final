from gravar_bd import inserir_Cadastro
from validacoes import (
    validar_nome,
    validar_email,
    validar_cidade,
    validar_data_nascimento,
    validar_senha
)


def processar_dados(dados):
    # Função para processar os dados recebidos do Flask
    # Retorna os dados processados
    dados_processados = dados

    lista = []

    lista.append(dados_processados.get('nome'))
    lista.append(dados_processados.get('email'))
    lista.append(dados_processados.get('senha'))
    lista.append(dados_processados.get('cidade'))
    lista.append(dados_processados.get('dataNascimento'))

    '''
        print(dados_processados.get)('ID')
        print(f"Nome: {dados_processados.get('nome')}")
        print()(f"E-mail: {dados_processados.get('email')}")
        print()(f"Senha: {dados_processados.get('senha')}")
        print()(f"Cidade: {dados_processados.get('cidade')}")
        print()(f"Data de Nascimento: {dados_processados.get('dataNascimento')}")
        print()("\nDados Processados com Sucesso!\n")
    '''

    mensagens_erro = []

    # Validações

    mensagens_erro.append(validar_nome(dados.get('nome', '')))
    mensagens_erro.append(validar_email(dados.get('email', '')))
    mensagens_erro.append(validar_senha(dados.get('senha', '')))
    mensagens_erro.append(validar_cidade(dados.get('cidade', '')))
    mensagens_erro.append(validar_data_nascimento(dados.get('dataNascimento', '')))

    # Remove mensagens de erro vazias
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

    print(mensagens_erro)

    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        # Chama a função para gravar os dados em um arquivo
        inserir_Cadastro(lista)
        # Retorna os dados processados
        return {'erro': False, 'mensagem': 'Dados Processados com Sucesso!'}

'''--------------------------------------------------------------Tarefas---------------------------------------------------------------------'''

# processamento.py
from gravar_bd import inserir_Tarefa


def processar_dados(dados):
    # Função para processar os dados recebidos do Flask
    # Retorna os dados processados
    dados_processados = dados

    lista = []

    lista.append(dados_processados.get('Titulo'))
    lista.append(dados_processados.get('descricao'))


    mensagens_erro = []

    # Remove mensagens de erro vazias
    mensagens_erro = [msg for msg in mensagens_erro if msg['erro']]

    print(mensagens_erro)

    if mensagens_erro:
        return {'erro': True, 'mensagens': mensagens_erro}
    else:
        # Chama a função para gravar os dados em um arquivo
        inserir_Tarefa(lista)
        # Retorna os dados processados
        return {'erro': False, 'mensagem': 'Dados Processados com Sucesso!'}













