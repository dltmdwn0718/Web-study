// HTML 요소 가져오기
const countDisplay = document.getElementById('count');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const resetBtn = document.getElementById('reset-btn');

// 카운트 숫자 변수
let currentCount = 0;

// +1 증가 버튼 클릭 이벤트
plusBtn.addEventListener('click', () => {
  currentCount++;
  countDisplay.textContent = currentCount;
});

// -1 감소 버튼 클릭 이벤트
minusBtn.addEventListener('click', () => {
  currentCount--;
  countDisplay.textContent = currentCount;
});

// 초기화 버튼 클릭 이벤트
resetBtn.addEventListener('click', () => {
  currentCount = 0;
  countDisplay.textContent = currentCount;
});