import { useEffect, useRef, useState } from 'react'
import './TaskAlarme.css'

function TaskAlarme({ tarefas }) {

    const tarefasAvisadas = useRef(new Set())
    const audioContext = useRef(null)
    const osciladorAlarme = useRef(null)
    const [alarmeAtivo, setAlarmeAtivo] = useState(null)
    function tocarAlarme(tarefa) {
        if (!audioContext.current) {
            audioContext.current = new AudioContext()
        }

        const contexto = audioContext.current

        if (contexto.state === 'suspended') {
            contexto.resume()
        }

        const oscilador = contexto.createOscillator()
        const ganho = contexto.createGain()

        oscilador.type = 'sine'
        oscilador.frequency.value = 800

        ganho.gain.value = 0.3

        oscilador.connect(ganho)
        ganho.connect(contexto.destination)

        oscilador.start()

        osciladorAlarme.current = oscilador

        setAlarmeAtivo(tarefa)
    }
    function pararAlarme() {
        if (osciladorAlarme.current) {
            osciladorAlarme.current.stop()
            osciladorAlarme.current = null
        }

        setAlarmeAtivo(null)
    }


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
                const chaveAlarme = `${tarefa.id}-${tarefa.data}-${tarefa.horario}`

                if (!tarefasAvisadas.current.has(chaveAlarme)) {

                    tocarAlarme(tarefa)

                    tarefasAvisadas.current.add(chaveAlarme)
                }
            })

        }, 1000)

        return () => {
            clearInterval(intervalo)
        }
    }, [tarefas])

    return (
        <>
            {alarmeAtivo && (
                <div className="alarme-painel">
                    <strong className="alarme-titulo">
                        🔔 Alarme ativo
                    </strong>

                    <p className="alarme-tarefa">
                        Hora da tarefa: <span>{alarmeAtivo.texto}</span>
                    </p>

                    <button
                        className="alarme-parar"
                        onClick={pararAlarme}
                    >
                        Parar alarme
                    </button>
                </div>
            )}
        </>
    )
}

export default TaskAlarme