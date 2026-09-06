import './TaskSummary.css'

function TaskSummary({ contadores }) {
  return (
    <div className="resumo-tarefas">

      <div className="card-resumo">
        <span className="label-resumo">Total</span>
        <strong>{contadores.total}</strong>
      </div>

      <div className="card-resumo">
        <span className="label-resumo">Pendentes</span>
        <strong>{contadores.pendentes}</strong>
      </div>

      <div className="card-resumo">
        <span className="label-resumo">Concluídas</span>
        <strong>{contadores.concluidas}</strong>
      </div>

      <div className="card-resumo card-atrasadas">
        <span className="label-resumo">Atrasadas</span>
        <strong>{contadores.atrasadas}</strong>
      </div>

    </div>
  )
}

export default TaskSummary