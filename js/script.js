const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const errorEl = document.getElementById('error');
const listEl = document.getElementById('todo-list');
const emptyEl = document.getElementById('empty');

const filterText = document.getElementById('filter-text');
const filterDate = document.getElementById('filter-date');
const applyFilterBtn = document.getElementById('apply-filter');
const resetFilterBtn = document.getElementById('reset-filter');

let todos = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  errorEl.textContent = '';
  const task = taskInput.value.trim();
  const due = dateInput.value;

  if (!task || !due) {
    errorEl.textContent = 'Task and date are required';
    return;
  }

  const todo = { id: Date.now(), task, due };
  todos.push(todo);
  taskInput.value = '';
  dateInput.value = '';
  render();
});

applyFilterBtn.addEventListener('click', () => {
  render();
});

resetFilterBtn.addEventListener('click', () => {
  filterText.value = '';
  filterDate.value = '';
  render();
});

function render() {
  listEl.innerHTML = '';
  let filtered = todos;

  if (filterText.value.trim()) {
    filtered = filtered.filter(t =>
      t.task.toLowerCase().includes(filterText.value.toLowerCase())
    );
  }
  if (filterDate.value) {
    filtered = filtered.filter(t => new Date(t.due) <= new Date(filterDate.value));
  }

  if (!filtered.length) {
    emptyEl.style.display = 'block';
  } else {
    emptyEl.style.display = 'none';
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `<span>${todo.task} (due: ${todo.due})</span>`;
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.className = 'delete-btn';
      delBtn.onclick = () => {
        todos = todos.filter(t => t.id !== todo.id);
        render();
      };
      li.appendChild(delBtn);
      listEl.appendChild(li);
    });
  }
}

render();
