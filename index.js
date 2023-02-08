
const form = document.getElementById('form')
const input = document.getElementById('input')
const divTaskList = document.getElementById('task-list')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()



document.addEventListener('DOMContentLoaded', () => {
    showTasks()
})

divTaskList.addEventListener('click', event => {
    btnAccion(event)
})

form.addEventListener('submit', event => {
    event.preventDefault()
    setTask(event)
})


let taskList = {}

const setTask = (event) => {
    // valido contenido
    if (input.value.trim() === "") {
        console.log("vacio");
        return
    }
    // creo obj task
    const task = {
        id: Date.now(),
        text: input.value,
        state: false
    }
    taskList[task.id] = task
    // limpio input
    form.reset()
    // focus al input
    input.focus()
    showTasks()
}


const showTasks = () => {

    if (Object.values(taskList).length === 0) {
        divTaskList.innerHTML = `<div class="task border ">
        <div class="inner-task">
            <p class="no-task-text">Nothing to do, lazy ¬¬</p>
        </div>
    </div>`
        return
    }


    // se limpia el DOM
    divTaskList.innerHTML = ''
    // metodo optimizado  
    Object.values(taskList).forEach(task => {
        // clono template para reutilizarlo con modificaciones
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = task.text

        if (task.state) {

            clone.getElementById('divTask').classList.add("task-checked")
            clone.getElementById('divInnerTask').classList.add("checked")
            // obtengo el nodo padre(div)
            let parent = clone.getElementById('divInnerTask')
            // capturo el check sin marcar
            let check = clone.getElementById('check')
            // creo elem img para asignar el svg checked
            let checked = document.createElement("img")
            checked.src = "./assets/check.svg"
            checked.setAttribute('class', 'check svg checked')
            //    reemplazo en el div padre el check por el checked
            parent.replaceChild(checked, check)

        }

        // [0]-> img check / [1]-> img remove
        clone.querySelectorAll('.svg')[0].dataset.id = task.id
        clone.querySelectorAll('.svg')[1].dataset.id = task.id
        fragment.appendChild(clone)

    })
    divTaskList.appendChild(fragment)

}


const btnAccion = (event) => {

    if (event.target.classList.contains('check')) {
        taskList[event.target.dataset.id].state = true
        showTasks()
    }

    if (event.target.classList.contains('remove')) {
        delete taskList[event.target.dataset.id]
        showTasks()
    }

    //desmarcar tarea concluida 
    if (event.target.classList.contains('checked')) {
        taskList[event.target.dataset.id].state = false
        showTasks()
    }
    // anula los demas EventListener fuera del contenedor
    event.stopPropagation()
}