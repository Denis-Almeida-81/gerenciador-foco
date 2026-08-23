import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

function TaskList({
  tarefas,
  alternarTarefa,
  excluirTarefa,
  editarTarefa
}) {
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