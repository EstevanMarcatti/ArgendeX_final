import conexao

def inserir_tarefa(date, time, title, description, user_id):
    conn = conexao()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tarefa (date, time, title, description, user_id) VALUES (%s, %s, %s, %s, %s)",
        (date, time, title, description, user_id)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return new_id

def obter_tarefas():
    conn = conexao()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tarefa")
    tarefas = cursor.fetchall()
    conn.close()
    return tarefas