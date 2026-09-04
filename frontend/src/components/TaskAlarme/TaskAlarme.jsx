import { useEffect, useRef } from 'react'

function TaskAlarme({ tarefas }) {

    const tarefasAvisadas = useRef(new Set())

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        const intervalo = setInterval(() => {
            const agora = new Date()

            const horarioAtual = agora.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            })

            const ano = agora.getFullYear()
            const mes = String(agora.getMonth() + 1).padStart(2, '0')
            const dia = String(agora.getDate()).padStart(2, '0')
            const dataAtual = `${ano}-${mes}-${dia}`

            const tarefasEncontradas = tarefas.filter(
                tarefa =>
                    tarefa.data === dataAtual &&
                    tarefa.horario === horarioAtual &&
                    !tarefa.concluida &&
                    tarefa.alarme
            )
            tarefasEncontradas.forEach(tarefa => {
                if (!tarefasAvisadas.current.has(tarefa.id)) {
                    new Notification('Gerenciador de Foco', {
                        body: `Hora da tarefa: ${tarefa.texto}`
                    })

                    tarefasAvisadas.current.add(tarefa.id)
                }
            })

        }, 1000)

        return () => {
            clearInterval(intervalo)
        }
    }, [tarefas])

    return (
        <div>
            <p>Total de tarefas: {tarefas.length}</p>
        </div>
    )
}

export default TaskAlarme