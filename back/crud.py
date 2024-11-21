from conexao import conectar

def criar_tarefa(data):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    cursor = connection.cursor()
    sql = "INSERT INTO tasks (title, description, date, time, user_id) VALUES (%s, %s, %s, %s, %s)"  # Adicione user_id aqui
    valores = (data['title'], data['description'], data['date'], data['time'], data['user_id'])  # Certifique-se que user_id está incluído
    cursor.execute(sql, valores)
    connection.commit()
    cursor.close()
    connection.close()
    return {'message': 'Tarefa criada com sucesso.'}

def listar_tarefas(user_id):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    cursor = connection.cursor(dictionary=True)
    sql = "SELECT * FROM tasks WHERE user_id = %s"
    cursor.execute(sql, (user_id,))
    tarefas = cursor.fetchall()
    cursor.close()
    connection.close()
    return tarefas

def atualizar_tarefa(data):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    cursor = connection.cursor()
    print('dados do data:', data)
    sql = "UPDATE tasks SET title=%s, description=%s, date=%s, time=%s WHERE id=%s"
    valores = (data['title'], data['description'], data['date'], data['time'], data['id'])
    cursor.execute(sql, valores)
    connection.commit()
    cursor.close()
    connection.close()
    return {'message': 'Tarefa atualizada com sucesso.'}

def deletar_tarefa(id):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    cursor = connection.cursor()
    sql = "DELETE FROM tasks WHERE id=%s"
    cursor.execute(sql, (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return {'message': 'Tarefa deletada com sucesso.'}


def atualizar_foto_perfil(ID, foto_data):
    connection = conectar()
    if connection is None:
        return {'error': 'Erro ao conectar ao banco de dados.'}

    cursor = connection.cursor()

    # SQL para atualizar a foto de perfil no banco de dados
    sql = "UPDATE cadastro SET foto_perfil = %s WHERE ID = %s"
    valores = (foto_data, ID)

    cursor.execute(sql, valores)
    connection.commit()
    cursor.close()
    connection.close()

    return {'message': 'Foto de perfil atualizada com sucesso.'}


def obter_foto_perfil_por_id(ID):
    connection = conectar()  # Usando a função de conexão já existente
    if connection is None:
        return None  # Ou você pode retornar um erro

    cursor = connection.cursor()
    sql = "SELECT foto_perfil FROM cadastro WHERE ID = %s"
    cursor.execute(sql, (ID,))
    resultado = cursor.fetchone()

    cursor.close()
    connection.close()

    # Verifica se há resultado e retorna a foto
    if resultado and resultado[0]:
        return resultado[0]  # Retorna o conteúdo binário da foto
    else:
        return None
