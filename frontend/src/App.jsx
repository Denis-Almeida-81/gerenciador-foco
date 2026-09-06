import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList'
import TaskForm from './components/TaskForm/TaskForm'
import TaskSummary from './components/TaskSummary/TaskSummary'
import TaskFilters from './components/TaskFilters/TaskFilters'
import TaskAlarme from './components/TaskAlarme/TaskAlarme'

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas')

    if (tarefasSalvas) {
      const tarefas = JSON.parse(tarefasSalvas)

      return tarefas.map(tarefa => {
        const { prioridade, ...tarefaSemPrioridade } = tarefa

        return {
          ...tarefaSemPrioridade,
          alarme: tarefaSemPrioridade.alarme ?? true
        }
      })
    }

    return [
      { id: 1, texto: 'Fazer almoço', concluida: false },
      { id: 2, texto: 'Lavar roupas', concluida: false }
    ]
  })

  const [formularioAberto, setFormularioAberto] = useState(false)
  const [filtro, setFiltro] = useState('todas')


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
  function alternarAlarme(id) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          alarme: !tarefa.alarme
        }
      }

      return tarefa
    })

    setTarefas(novasTarefas)
  }
  function adicionarTarefa(dados) {
    const tarefa = {
      id: Date.now(),
      texto: dados.texto,
      concluida: false,
      data: dados.data,
      horario: dados.horario,
      alarme: dados.alarme
    }

    setTarefas([...tarefas, tarefa])
  }

  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id)

    setTarefas(novasTarefas)
  }

  function editarTarefa(id, novoTexto, novoHorario, novaData) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return {
          ...tarefa,
          texto: novoTexto,
          data: novaData,
          horario: novoHorario
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

      <header className="app-header">
        <div>
          <h1>Gerenciador de Foco</h1>

          <p className="descrição">
            Organize suas tarefas e não esqueça do que é importante.
          </p>
        </div>

        <button
          className="btn-nova-tarefa"
          onClick={() => {
            setFormularioAberto(true)
          }}
        >
          + Nova Tarefa
        </button>
      </header>

      {formularioAberto && (
        <TaskForm
          onAdicionar={(dados) => {
            adicionarTarefa(dados)
            setFormularioAberto(false)
          }}
          onCancelar={() => {
            setFormularioAberto(false)
          }}
        />
      )}
      <TaskFilters
        filtro={filtro}
        setFiltro={setFiltro}
      />

      <TaskSummary contadores={contadores} />

      <h2>Tarefas de hoje</h2>

      <TaskList
        tarefas={ordenarTarefas(filtrarTarefas(tarefas))}
        filtro={filtro}
        alternarTarefa={alternarTarefa}
        excluirTarefa={excluirTarefa}
        editarTarefa={editarTarefa}
        alternarAlarme={alternarAlarme}
      />

      <TaskAlarme tarefas={tarefas} />
    </main>
  )
}

export default App