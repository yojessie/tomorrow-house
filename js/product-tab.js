const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')

function activateTab() {
  const tabItem = this.parentNode
  currentActiveTab.classList.remove('is-active')
  currentActiveTab = tabItem
  tabItem.classList.add('is-active')
}

// 탭 메뉴 클릭 시 해당 영역으로 이동
function scrollToTabPannel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)
  // 윈도우 가로값이 768보다 크니? 그럼 데스크탑만큼 동작하고 : 아니면 모바일만큼 동작해

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth', // 스르륵 움직여라~ 사파리에서 동작 안함...
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', activateTab)
  button.addEventListener('click', scrollToTabPannel)
})
