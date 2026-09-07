import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onAdicionar, onCancelar }) {
  const [novaTarefa, setNovaTarefa] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [erro, setErro] = useState('')
  const [alarme, setAlarme] = useState(true)

  function adicionar() {
    if (!novaTarefa.trim()) {
      setErro('Digite uma tarefa antes de adicionar.')
      return
    }

    setErro('')

    onAdicionar({
      texto: novaTarefa,
      data,
      horario,
      alarme
    })

    setNovaTarefa('')
    setData('')
    setHorario('')
    setAlarme(true)
  }

  return (
    <div className="task-form">

      <div className="form-group">
        <label>Tarefa</label>

        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => {
            setNovaTarefa(e.target.value)
            setErro('')
          }}
          placeholder="Digite uma nova tarefa"
          className={erro ? 'input-erro' : ''}
        />

        {erro && (
          <span className="mensagem-erro">
            {erro}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Data</label>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Horário</label>

        <input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
      </div>

      <label className="alarme-checkbox">
        <input
          type="checkbox"
          checked={alarme}
          onChange={(e) => setAlarme(e.target.checked)}
        />

        <span>Ativar alarme</span>
      </label>

      <div className="form-actions">

        <button
          className="btn-adicionar"
          onClick={adicionar}
        >
          Adicionar
        </button>

        <button
          className="btn-cancelar"
          onClick={onCancelar}
        >
          Cancelar
        </button>

      </div>

    </div>
  )
}

export default TaskForm
