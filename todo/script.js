const timeInput = document.getElementById('time-input');
const scheduleInput = document.getElementById('schedule-input');
const addScheduleBtn = document.getElementById('add-schedule-btn');
const scheduleList = document.getElementById('schedule-list');

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let schedules = JSON.parse(localStorage.getItem('mySchedules')) || [];

function updateDate() {
  const dateElement = document.getElementById('current-date');
  const today = new Date();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  dateElement.textContent = `${today.getMonth() + 1}월 ${today.getDate()}일 (${days[today.getDay()]}요일)`;
}

// 타임테이블 그리기
function renderSchedules() {
  scheduleList.innerHTML = '';
  // 시간을 기준으로 오름차순 정렬
  schedules.sort((a, b) => a.time.localeCompare(b.time));
  
  schedules.forEach((sched, index) => {
    const li = document.createElement('li');
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'time-badge';
    timeSpan.textContent = sched.time;

    const textSpan = document.createElement('span');
    textSpan.className = 'schedule-text';
    textSpan.textContent = sched.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
      schedules.splice(index, 1);
      renderSchedules();
    });

    li.appendChild(timeSpan);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    scheduleList.appendChild(li);
  });
  localStorage.setItem('mySchedules', JSON.stringify(schedules));
}

// 투두리스트 그리기
function renderTasks() {
  taskList.innerHTML = ''; 
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    });

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// 스케줄 추가 로직
addScheduleBtn.addEventListener('click', () => {
  const time = timeInput.value;
  const text = scheduleInput.value.trim();
  if (time && text !== '') {
    schedules.push({ time, text });
    timeInput.value = '';
    scheduleInput.value = '';
    renderSchedules();
  }
});

// 투두리스트 추가 로직
function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// 초기 실행
updateDate();
renderSchedules();
renderTasks();