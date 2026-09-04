import './TaskSummary.css'

function TaskSummary({ contadores }) {
  return (
    <div className='resumo-tarefas'>
      <span>Total: {contadores.total}</span>
      <span>Pendentes: {contadores.pendentes}</span>
      <span>Concluídas: {contadores.concluidas}</span>
      <span>Atrasadas: {contadores.atrasadas}</span>
    </div>
  )
}

export default TaskSummary