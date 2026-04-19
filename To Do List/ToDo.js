// select dom Element
const input = document.getElementById("todo-input")
const addbtn = document.getElementById("add-btn")
const list = document.getElementById("todo-list")

// try to load saved todos from localStorage(if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // save current todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

//create a dom node for a todo object and append it to the list
function createTodoNode(todo, Index) {
    const li = document.createElement("li");

    //checkbox to toggle completion
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //Visual feedback: Strick-througt when completed
        render();
        saveTodos();
    })

    //text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    //Add double click eventlistener
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    //Delete todo
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        todos.splice(Index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox)
    li.appendChild(textSpan)
    li.appendChild(delBtn)
    return li

}

//Render the whole todo list from the todos array
function render() {
    list.innerHTML = "";

    //recreate each item
    todos.forEach((todo, Index) => {
        const node = createTodoNode(todo, Index);
        list.appendChild(node)
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    //Push a new todo object
    todos.push({ text, completed: false })
    input.value = "";
    render()
    saveTodos()
}
addbtn.addEventListener("click", addTodo)
input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addTodo();
    }
})
render();