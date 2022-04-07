const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('.form-input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearchHistory.querySelector('ol')

const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)

const deleteButton = gnbSearchHistoryList.querySelectorAll('.delete-button')

// 히스토리 모달 닫은 후 윈도우 클릭 이벤트 삭제해주는 코드를 별도 함수로 만들어 활용
function afterCloseSearchHistory() {
  gnbSearchHistory.classList.remove('is-active')
  window.removeEventListener('click', closeSearchGnbHistory)
}

// 바깥영역 클릭 시 히스토리 창 닫힘
function closeSearchGnbHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    afterCloseSearchHistory()
  }
}

function openSearchGnbHistory() {
  if (gnbSearchHistoryList.children.length == 0) {
    return // 리스트에 내용 삭제된 이후면 뒤에 코드 실행하지 않음
  }
  gnbSearchHistory.classList.add('is-active')
  if (gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeSearchGnbHistory)
  }
}

gnbSearchInput.addEventListener('focus', openSearchGnbHistory)
// window.addEventListener('click', closeSearchGnbHistory)

// 전체삭제 버튼 클릭 시 리스트 삭제
function deleteAllSearchHistory() {
  gnbSearchHistoryList.innerHTML = ''
  afterCloseSearchHistory()
}

deleteAllButton.addEventListener('click', deleteAllSearchHistory)

// 리스트 하나씩 삭제
function deleteSearchHistoryItem(e) {
  e.stopPropagation() // 이벤트 버블링을 막음
  const itemToDelete = this.parentNode
  gnbSearchHistoryList.removeChild(itemToDelete)
  // DOM에서 요소를 삭제할때는 부모요소에서 메소드를 사용해 삭제 해야한다.

  if (gnbSearchHistoryList.children.length == 0) {
    afterCloseSearchHistory()
  }
}

deleteButton.forEach(function (button) {
  button.addEventListener('click', deleteSearchHistoryItem)
})
