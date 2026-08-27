import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

function TaskList({
  tarefas,
  filtro,
  alternarTarefa,
  excluirTarefa,
  editarTarefa
}) {
  function mensagemFiltro() {
  if (filtro === 'pendentes') {
    return 'Nenhuma tarefa pendente.'
  }

  if (filtro === 'concluidas') {
    return 'Nenhuma tarefa concluída.'
  }

  if (filtro === 'atrasadas') {
    return 'Nenhuma tarefa atrasada.'
  }

  return 'Nenhuma tarefa cadastrada.'
}
    if (tarefas.length === 0) {
  return (
    <p className="mensagem-vazia">
    {mensagemFiltro()}
    </p>
  )
}
  return (
    <ul>
      {tarefas.map(tarefa => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          alternarTarefa={alternarTarefa}
          excluirTarefa={excluirTarefa}
          editarTarefa={editarTarefa}
        />
      ))}
    </ul>
  )
}

export default TaskList