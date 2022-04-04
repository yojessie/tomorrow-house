const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('.form-input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearchHistory.querySelector('ol')

const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)

// 바깥영역 클릭 시 히스토리 창 닫힘
function openSearchGnbHistory() {
  if (gnbSearchHistoryList.children.length == 0) {
    return // 리스트에 내용 삭제된 이후면 뒤에 코드 실행하지 않음
  }

  if (gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeSearchGnbHistory)
  }

  gnbSearchHistory.classList.add('is-active')
}

function closeSearchGnbHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active')
    window.removeEventListener('click', closeSearchGnbHistory)
  }
}

gnbSearchInput.addEventListener('focus', openSearchGnbHistory)

// 전체삭제 버튼 클릭 시 리스트 삭제
function deleteAllSearchHistory() {
  gnbSearchHistoryList.innerHTML = ''
  gnbSearchHistory.classList.remove('is-active')
}

deleteAllButton.addEventListener('click', deleteAllSearchHistory)
