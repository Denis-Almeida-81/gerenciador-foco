import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ tarefa, alternarTarefa, excluirTarefa, editarTarefa }) {
  const [editando, setEditando] = useState(false)
  const [textoEditando, setTextoEditando] = useState(tarefa.texto)
  const [prioridadeEditando, setPrioridadeEditando] = useState(tarefa.prioridade || 'media')
  const [horarioEditando, setHorarioEditando] = useState(tarefa.horario || '')
  const [dataEditando, setDataEditando] = useState(tarefa.data || '')

  function salvarEdicao() {
    editarTarefa(
      tarefa.id,
      textoEditando,
      prioridadeEditando,
      horarioEditando,
      dataEditando
    )

    setEditando(false)
  }

  function cancelarEdicao() {
    setTextoEditando(tarefa.texto)
    setHorarioEditando(tarefa.horario || '')
    setDataEditando(tarefa.data || '')
    setEditando(false)
  }
  function formatarData(data) {
    if (!data) return ''

    const [ano, mes, dia] = data.split('-')

    return `${dia}/${mes}/${ano}`
  }
  function tarefaAtrasada() {
    if (!tarefa.data || tarefa.concluida) {
      return false
    }

    const horario = tarefa.horario || '23:59'
    const dataHoraTarefa = new Date(`${tarefa.data}T${horario}`)

    return dataHoraTarefa < new Date()
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        id={`tarefa-${tarefa.id}`}
        checked={tarefa.concluida}
        onChange={() => alternarTarefa(tarefa.id)}
      />

      {editando ? (
        <>
          <input
            type="text"
            value={textoEditando}
            onChange={(e) => setTextoEditando(e.target.value)}
          />

          <select
            className="prioridade-select"
            value={prioridadeEditando}
            onChange={(e) => setPrioridadeEditando(e.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>

          <input
            type="time"
            value={horarioEditando}
            onChange={(e) => setHorarioEditando(e.target.value)}
          />

          <input
            type="date"
            value={dataEditando}
            onChange={(e) => setDataEditando(e.target.value)}
          />

          <button onClick={salvarEdicao}>
            Salvar
          </button>

          <button onClick={cancelarEdicao}>
            Cancelar
          </button>
        </>
      ) : (
        <>
          <label
            htmlFor={`tarefa-${tarefa.id}`}
            className={tarefa.concluida ? 'tarefa-concluida' : ''}
          >
            {tarefa.texto}
          </label>

          <span className={`prioridade prioridade-${tarefa.prioridade}`}>
            {tarefa.prioridade}
          </span>

          <span className="data-tarefa">
            {formatarData(tarefa.data)}
          </span>

          <span className="horario-tarefa">
            {tarefa.horario}
          </span>

          {tarefaAtrasada() && (
            <span
              className={`tarefa-atrasada ${tarefaAtrasada() ? '' : 'sem-atraso'
                }`}
              title={tarefaAtrasada() ? 'Tarefa atrasada' : ''}
            >
              {tarefaAtrasada() ? '!' : ''}
            </span>
          )}

          <div className="task-actions">
            <button
              onClick={() => {
                setTextoEditando(tarefa.texto)
                setHorarioEditando(tarefa.horario || '')
                setDataEditando(tarefa.data || '')
                setEditando(true)
              }}
            >
              Editar
            </button>

            <button onClick={() => excluirTarefa(tarefa.id)}>
              Excluir
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem