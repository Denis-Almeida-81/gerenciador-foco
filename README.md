# 📝 Gerenciador de Foco

Aplicação web desenvolvida em React para organização e gerenciamento de tarefas.

O projeto permite cadastrar, editar, concluir e excluir tarefas, além de definir data, horário e alarmes para lembrar o usuário de suas atividades.

## 🚀 Funcionalidades

- ✅ Cadastro de novas tarefas
- ✏️ Edição de tarefas
- 🗑️ Exclusão de tarefas
- ☑️ Marcação de tarefas concluídas
- 📅 Definição de data para as tarefas
- ⏰ Definição de horário
- 🔔 Ativação e desativação de alarmes
- 🔔 Notificações do sistema operacional
- 🔎 Filtros por:
  - Todas
  - Pendentes
  - Concluídas
  - Atrasadas
- 📊 Resumo das tarefas
- 📱 Interface adaptada para diferentes tamanhos de tela

## 🛠️ Tecnologias utilizadas

- React
- JavaScript
- HTML
- CSS
- Vite
- Git
- GitHub

## 📚 Conceitos praticados

Durante o desenvolvimento foram utilizados conceitos importantes do desenvolvimento Front-end, como:

- Componentização com React
- `useState`
- `useEffect`
- `useRef`
- Props
- Renderização condicional
- Manipulação de arrays com `map()` e `filter()`
- Eventos e formulários
- CSS Grid
- CSS Flexbox
- Design responsivo
- Web Notifications API

## 🔔 Sistema de alarmes

O projeto possui um sistema de alarmes que verifica as tarefas cadastradas e, quando uma tarefa chega ao horário definido, utiliza a API de notificações do navegador para exibir uma notificação no sistema operacional.

Para utilizar essa funcionalidade, é necessário permitir notificações para o navegador.

## 💻 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/Denis-Almeida-81/gerenciador-foco.git
