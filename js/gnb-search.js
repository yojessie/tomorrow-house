const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('.form-input')
const gnbSearchHistory = gnbSearch.querySelector('.search-history')

function openSearchGnbHistory() {
  gnbSearchHistory.classList.add('is-active')

  if (gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeSearchGnbHistory)
  }
}

function closeSearchGnbHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active')
    window.removeEventListener('click', closeSearchGnbHistory)
  }
}

gnbSearchInput.addEventListener('focus', openSearchGnbHistory)
