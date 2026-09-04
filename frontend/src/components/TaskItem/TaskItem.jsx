import { useState } from 'react'
import './TaskItem.css'

function TaskItem({ tarefa, alternarTarefa, excluirTarefa, editarTarefa, alternarAlarme }) {
  const [editando, setEditando] = useState(false)
  const [textoEditando, setTextoEditando] = useState(tarefa.texto)
  const [horarioEditando, setHorarioEditando] = useState(tarefa.horario || '')
  const [dataEditando, setDataEditando] = useState(tarefa.data || '')

  function salvarEdicao() {
    editarTarefa(
      tarefa.id,
      textoEditando,
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

          <span className="data-tarefa">
            {formatarData(tarefa.data)}
          </span>

          <span className="horario-tarefa">
            {tarefa.horario}
          </span>

          <div className="task-actions">
            <button
              onClick={() => alternarAlarme(tarefa.id)}
              title={tarefa.alarme ? 'Desativar alarme' : 'Ativar alarme'}
            >
              {tarefa.alarme ? '🔔' : '🔕'}
            </button>
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

            <button
              onClick={() => {
                const confirmou = window.confirm(
                  'Tem certeza que deseja excluir esta tarefa?'
                )

                if (confirmou) {
                  excluirTarefa(tarefa.id)
                }
              }}
            >
              Excluir
            </button>
            
          </div>
          {tarefaAtrasada() && (
              <span
                className="tarefa-atrasada"
                title="Tarefa atrasada"
              >
                !
              </span>
            )}
        </>
      )}
    </li>
  )
}

export default TaskItem