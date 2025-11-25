create table usuario (
	id SERIAL PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
	email VARCHAR(300) unique NOT NULL 
)

create table tarefas (
	id_tarefa SERIAL PRIMARY KEY,
	id_usuario int,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id),
	setor VARCHAR(100) NOT NULL,
	data_tarefa DATE ,
	status VARCHAR(50) DEFAULT 'fazer',
	prioridade VARCHAR(50) NOT NULL
)