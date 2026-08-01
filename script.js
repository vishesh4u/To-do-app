
let tasksData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
let dragElement = null;


function addTask(title, desc, column) {
    const div = document.createElement("div")
    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div)

    div.querySelector("button").addEventListener("click", () => {
        div.remove();
    updateTaskCount();
        
    })

    addDragEvent(div);
    return div;
}



function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,

                desc: t.querySelector("p").innerText

            }
        })

        localStorage.setItem("tasks", JSON.stringify(tasksData));
        count.innerText = tasks.length;
    })

}
if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);

        })

    }
    updateTaskCount();

}

const tasks = document.querySelectorAll(".task");
// Save dragged

tasks.forEach(task => {
    addDragEvent(task)
})

function addDragEvent(task) {
    task.addEventListener("dragstart", function () {

        dragElement = task;

        console.log("Dragging:", dragElement);

    });
}

// Add drag events to every column
function addDragEventsOnColumn(column) {

    column.addEventListener("dragenter", function () {

        column.classList.add("hover-over");

    });

    column.addEventListener("dragleave", function () {

        column.classList.remove("hover-over");

    });

    column.addEventListener("dragover", function (e) {

        e.preventDefault();

    });

    column.addEventListener("drop", function (e) {

        e.preventDefault();


        column.appendChild(dragElement);

        column.classList.remove("hover-over");

        // [todo,progress,done].forEach(col =>{
        //     const tasks = col.querySelectorAll(".task");
        //     const count = col.querySelector(".right");

        //     count.innerHTML = tasks.length;
        // })
        updateTaskCount();


    });

}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);



const toggleModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector(".modal .bg")
const modal = document.querySelector(".modal")
const addTaskbutton = document.querySelector("#add-new-task")

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active")
})

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})

addTaskbutton.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-title-input").value
    const taskdesc = document.querySelector("#task-desc-input").value

    addTask(taskTitle, taskdesc, todo);
    updateTaskCount();
    document.querySelector("#task-title-input").value = "";
document.querySelector("#task-desc-input").value = "";
    modal.classList.remove("active")

})


// modal relted logic

