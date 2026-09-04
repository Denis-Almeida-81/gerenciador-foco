import { useState } from 'react'

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
    <>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => {
          setNovaTarefa(e.target.value)
          setErro('')
        }}
        className={erro ? 'input-erro' : ''}
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <input
        type="time"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={alarme}
          onChange={(e) => setAlarme(e.target.checked)}
        />
        Ativar alarme
      </label>

      {erro && (
        <span className="mensagem-erro">
          {erro}
        </span>
      )}

      <button onClick={adicionar}>
        Adicionar
      </button>

      <button onClick={onCancelar}>
        Cancelar
      </button>
    </>
  )
}

export default TaskForm