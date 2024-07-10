
const InputText = document.querySelector('#input-text');
const createToDo = document.querySelector('.container1 ul')
const list = document.querySelectorAll('.span')
const todoButton = document.querySelector('.todo-button')
const itemsLeft = document.querySelector('#itemsLeft');

const todoList = [];



// functions


//function to change theme
function changeTheme() {
  document.body.classList.toggle('theme1');
  const themeIcon = document.getElementById('theme-icon');
  if (document.body.classList.contains('theme1')) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
  } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
  }
}
// Enable or disable the button based on input value
InputText.addEventListener('input', () => {
    todoButton.disabled = InputText.value.trim() === '';
});
todoButton.addEventListener('click',addToDo);

function addToDo() {
  const inputValue = InputText.value.trim();
  if (!inputValue) {
      alert('Add a task');
      return;
  }

  const newToDoId = getRandomID();
  const newToDo = document.createElement('li');
  newToDo.classList.add('span');
  newToDo.dataset.todoId = newToDoId;
  newToDo.innerHTML = `
      <div class="sub-container1">
        <h3 contenteditable="true" data-todo-id="${newToDoId}">${inputValue}</h3>
          <div>
          <h4 onclick="enableEdit('${newToDoId}')">Edit</h4>
           <h4 onclick="toggleTaskStatus('${newToDoId}')">Completed</h4>
          <i class="fa-solid fa-trash" id="delete-btn" onclick="deleteTask('${newToDoId}')"></i>
          </div>
         
      </div>
  `;
  createToDo.appendChild(newToDo);
  InputText.value = "";

  todoList.push({ id: newToDoId, todo: inputValue, completed: false });
  updateItemsLeft();
}
function deleteTask(id) {
  const index = todoList.findIndex(todo => todo.id === id);
  if (index !== -1) {
      todoList.splice(index, 1);
      const taskElement = document.querySelector(`li[data-todo-id="${id}"]`);
      if (taskElement) {
          taskElement.remove();
      }
  }
  updateItemsLeft();
}
function getRandomID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}


// mark completed

function toggleTaskStatus(id) {
  const todo = todoList.find(todo => todo.id === id);
  if (todo) {
      todo.completed = !todo.completed;
      const taskElement = document.querySelector(`li[data-todo-id="${id}"]`);
      console.log(todo);
      console.log(taskElement);
      if (taskElement) {
          taskElement.classList.toggle('completed', todo.completed);
          
      }
  }
  updateItemsLeft();
}

// edit function

function enableEdit(id) {
    const todo = todoList.find(todo => todo.id === id);
    if (todo) {
        InputText.value = todo.todo;
        InputText.focus();
        
        todoButton.removeEventListener('click', addToDo);
        todoButton.addEventListener('click', function updateTodo() {
            const newTodoText = InputText.value.trim();
            if (newTodoText !== '') {
                todo.todo = newTodoText;
                const taskElement = document.querySelector(`li[data-todo-id="${id}"] h3`);
                if (taskElement) {
                    taskElement.textContent = newTodoText;
                }
                InputText.value = "";
                todoButton.removeEventListener('click', updateTodo);
                todoButton.addEventListener('click', addToDo);
            } else {
                alert('To do cannot be empty');
                InputText.focus();
            }
        });
    }
  }



  // update items left

  function updateItemsLeft() {
    const itemsLeftCount = todoList.filter(todo => !todo.completed).length;
    itemsLeft.textContent = itemsLeftCount;
}



  function filterTasks(filter) {
    const listItems = document.querySelectorAll('.container1 ul li');
    listItems.forEach(item => {
        const isCompleted = item.classList.contains('completed');
        switch (filter) {
            case 'all':
                item.style.display = '';
                break;
            case 'active':
                item.style.display = isCompleted ? 'none' : '';
                break;
            case 'completed':
                item.style.display = isCompleted ? '' : 'none';
                break;
        }
    });
    
}

function clearCompleted() {
    const completedTasks = todoList.filter(todo => todo.completed);
    completedTasks.forEach(task => deleteTask(task.id));
}

updateItemsLeft();
