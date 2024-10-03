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

