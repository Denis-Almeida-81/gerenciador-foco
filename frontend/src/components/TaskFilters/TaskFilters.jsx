import './TaskFilters.css'

function TaskFilters({ filtro, setFiltro }) {
  return (
    <div className="filtros">
      <button
        className={`filtro-botao ${filtro === 'todas' ? 'filtro-ativo' : ''}`}
        onClick={() => setFiltro('todas')}
      >
        Todas
      </button>

      <button
        className={`filtro-botao ${filtro === 'pendentes' ? 'filtro-ativo' : ''}`}
        onClick={() => setFiltro('pendentes')}
      >
        Pendentes
      </button>

      <button
        className={`filtro-botao ${filtro === 'concluidas' ? 'filtro-ativo' : ''}`}
        onClick={() => setFiltro('concluidas')}
      >
        Concluídas
      </button>

      <button
        className={`filtro-botao ${filtro === 'atrasadas' ? 'filtro-ativo' : ''}`}
        onClick={() => setFiltro('atrasadas')}
      >
        Atrasadas
      </button>
    </div>
  )
}

export default TaskFilters