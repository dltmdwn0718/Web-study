const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// 1. 브라우저 저장소(localStorage)에서 데이터 불러오기
// 저장된 게 없으면 3개의 기본 샘플 항목을 띄워줍니다.
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [
  { text: "왕복 4시간 통학길에 전공 서적 읽어보기", completed: false },
  { text: "파이썬 리스트 내포, 제너레이터 문법 실습하기", completed: false },
  { text: "시티드로우, 랫풀다운 등 등 운동 루틴 가기", completed: false }
];

// 2. 화면에 목록을 그려주는 함수
function renderTasks() {
  taskList.innerHTML = ''; // 기존 화면에 있던 걸 싹 지우고 새로 그림

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }

    // 체크박스 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));

    // 글자 영역 생성
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(index));

    // 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    // 조립해서 리스트(ul)에 넣기
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  // 변경된 내용을 브라우저 저장소에 업데이트
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// 3. 할 일 추가하기
function addTask() {
  const text = taskInput.value.trim(); // 양끝 공백 제거
  if (text !== '') {
    tasks.push({ text: text, completed: false }); // 배열에 추가
    taskInput.value = ''; // 입력창 비우기
    renderTasks(); // 화면 다시 그리기
  }
}

// 4. 완료 상태 껐다 켜기 (토글)
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// 5. 할 일 삭제하기
function deleteTask(index) {
  tasks.splice(index, 1); // 배열에서 1개 뽑아내기
  renderTasks();
}

// 6. 버튼 클릭 및 엔터키 이벤트 달아주기
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// 7. 앱이 처음 켜질 때 화면 한 번 그려주기
renderTasks();