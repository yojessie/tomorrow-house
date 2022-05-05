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

// 요소의 y축 위치 = window.scrollY + element.getBoundingClientRect().top
const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recomendation',
  // 확인해야 할 각 패널이 가지고 있는 ID를 미리 리스트로 선언
]

const productTabPanelList = productTabPanelIdList.map(function (panelId) {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})

const productTabPanelPositionMap = {}

function detectTabPanelPosition() {
  // 각각의 tabPanel의 y축 위치를 찾아서 productTabPanelPositionMap 객체에 값을 업데이트

  productTabPanelList.forEach(function (panel) {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top

    productTabPanelPositionMap[id] = position
    // 만들어 놓은 객체 보관함?에 id를 속성으로 하고 position을 값으로 가진 항목들을 업데이트
  })
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
// load : 페이지 내 모든 요소가 완전히 랜더 되었을때 이벤트 발생
// 모든 요소가 로드 되어야 정확한 위치를 파악할 수 있기 때문
// 창의 사이즈가 바뀌었을때도 위치값을 새로 업데이트 해주어야 함
