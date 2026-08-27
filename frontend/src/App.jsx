import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas')

    if (tarefasSalvas) {
      const tarefas = JSON.parse(tarefasSalvas)

      return tarefas.map(tarefa => ({
        ...tarefa,
        prioridade: tarefa.prioridade || 'media'
      }))
    }

    return [
      { id: 1, texto: 'Fazer almoço', concluida: false, prioridade: 'media' },
      { id: 2, texto: 'Lavar roupas', concluida: false, prioridade: 'media' }
    ]
  })

  const [formularioAberto, setFormularioAberto] = useState(false)
  const [novaTarefa, setNovaTarefa] = useState('')
  const [prioridade, setPrioridade] = useState('media')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [filtro, setFiltro] = useState('todas')
  const [erro, setErro] = useState('')

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }, [tarefas])

  function alternarTarefa(id) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida }
      }

      return tarefa
    })

    setTarefas(novasTarefas)
  }

  function adicionarTarefa() {
    if (!novaTarefa.trim()) {
      setErro('Digite uma tarefa antes de adicionar.')
      return false
    }

    setErro('')

    const tarefa = {
      id: Date.now(),
      texto: novaTarefa,
      concluida: false,
      prioridade: prioridade,
      data: data,
      horario: horario
    }

    setTarefas([...tarefas, tarefa])

    return true
  }

  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id)

    setTarefas(novasTarefas)
  }

  function editarTarefa(id, novoTexto, novaPrioridade, novoHorario, novaData) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          texto: novoTexto
          , prioridade: novaPrioridade
          , data: novaData
          , horario: novoHorario
        }
      }

      return tarefa
    })

    setTarefas(novasTarefas)
  }
  function ordenarTarefas(tarefas) {
    return [...tarefas].sort((a, b) => {
      const dataHoraA = `${a.data}T${a.horario || '00:00'}`
      const dataHoraB = `${b.data}T${b.horario || '00:00'}`

      return new Date(dataHoraA) - new Date(dataHoraB)
    })
  }

  function tarefaAtrasada(tarefa) {
    if (!tarefa.data || tarefa.concluida) {
      return false
    }

    const dataHora = `${tarefa.data}T${tarefa.horario || '23:59'}`
    return new Date(dataHora) < new Date()
  }

  function filtrarTarefas(tarefas) {
    if (filtro === 'pendentes') {
      return tarefas.filter(tarefa => !tarefa.concluida)
    }

    if (filtro === 'concluidas') {
      return tarefas.filter(tarefa => tarefa.concluida)
    }

    if (filtro === 'atrasadas') {
      return tarefas.filter(tarefa => tarefaAtrasada(tarefa))
    }

    return tarefas
  }
  function contarTarefas(tarefas) {
    const total = tarefas.length

    const pendentes = tarefas.filter(tarefa => !tarefa.concluida).length

    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length

    const atrasadas = tarefas.filter(tarefa => tarefaAtrasada(tarefa)).length

    return {
      total,
      pendentes,
      concluidas,
      atrasadas
    }
  }
  const contadores = contarTarefas(tarefas)

  return (
    <main className="main-content">
      <h1>Gerenciador de Foco</h1>

      <p className="descrição">
        Organize suas tarefas e não esqueça do que é importante.
      </p>

      <button
        onClick={() => {
          setErro('')
          setFormularioAberto(true)
        }}
      >
        Nova Tarefa
      </button>

      {formularioAberto && (
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
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
          {erro && (
            <span className="mensagem-erro">
              {erro}
            </span>
          )}

          <button
            onClick={() => {
              const adicionou = adicionarTarefa()

              if (adicionou) {
                setNovaTarefa('')
                setFormularioAberto(false)
              }
            }}
          >
            Adicionar
          </button>

          <button
            onClick={() => {
              setFormularioAberto(false)
              setNovaTarefa('')
              setErro('')
            }}
          >
            Cancelar
          </button>
        </>
      )}
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
      <div className="resumo-tarefas">
        <span>Total: {contadores.total}</span>
        <span>Pendentes: {contadores.pendentes}</span>
        <span>Concluídas: {contadores.concluidas}</span>
        <span>Atrasadas: {contadores.atrasadas}</span>
      </div>

      <h2>Tarefas de hoje</h2>

      <TaskList
        tarefas={ordenarTarefas(filtrarTarefas(tarefas))}
        filtro={filtro}
        alternarTarefa={alternarTarefa}
        excluirTarefa={excluirTarefa}
        editarTarefa={editarTarefa}
      />
    </main>
  )
}

export default App