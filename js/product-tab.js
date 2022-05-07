const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')

// 탭 직접 클릭 이동 시, 중간에 다른 탭의 액티브를 거쳐가는 ux 개선
let disableUpdating = false

function activateTab() {
  const tabItem = this.parentNode

  disableUpdating = true
  currentActiveTab.classList.remove('is-active')
  currentActiveTab = tabItem
  tabItem.classList.add('is-active')

  // 탭 클릭 후 영역 이동 다 하고 난 다음에는 다시 updateActiveTabOnScroll 함수가 다시 실행되어야 하니까
  setTimeout(function () {
    disableUpdating = false
  }, 1000)
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

// 현재 보고있는 영역에 맞게 탭을 액티브 해주기 위한 사전 작업
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
    // 만들어 놓은 객체 보관함에 id를 속성으로 하고 position을 값으로 가진 항목들을 업데이트

    updateActiveTabOnScroll()
    // 페이지가 로드되었을때 스크롤 위치에 따라 탭 패널이 액티브 되도록 개선
  })
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000))
// load : 페이지 내 모든 요소가 완전히 랜더 되었을때 이벤트 발생
// 모든 요소가 로드 되어야 정확한 위치를 파악할 수 있기 때문
// 창의 사이즈가 바뀌었을때도 위치값을 새로 업데이트 해주기 위해 resize 이벤트 추가

// 위에서 정리한 y축 값을 탭 액티브 이벤트에 활용
function updateActiveTabOnScroll() {
  if (disableUpdating) {
    return
  }

  const SECTION_BOTTOM_DESKTOP = 80
  const SECTION_BOTTOM_MOBILE = 20 + 8
  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768
      ? TOP_HEADER_DESKTOP + SECTION_BOTTOM_DESKTOP
      : TOP_HEADER_MOBILE + SECTION_BOTTOM_MOBILE)

  // 먼저 스크롤 정도에 따라 액티브 해야할 탭 버튼을 찾기
  let newActiveTab
  if (scrolledAmount >= productTabPanelPositionMap['product-recomendation']) {
    newActiveTab = productTabButtonList[4] // 추천 탭 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newActiveTab = productTabButtonList[3] // 배송/환불 탭 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = productTabButtonList[2] // 문의 탭 버튼
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newActiveTab = productTabButtonList[1] // 리뷰 탭 버튼
  } else {
    newActiveTab = productTabButtonList[0] // 상품정보 탭 버튼
  }

  // 추천 탭 버튼이 충분한 높이를 가지지 못해도 페이지 가장 하단에서 탭 활성화 되도록 디버깅
  // 태블릿에서는 하단에 orderCta때문에 margin-bottom: 56px이 있어서 제대로 동작하지 않으므로 추가 대응
  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)
  if (window.scrollY + window.innerHeight == bodyHeight) {
    newActiveTab = productTabButtonList[4]
  }

  // 찾은 내용에 따라 탭 버튼을 active 시키기
  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
        // html파일에서 기본적으로 넣어놓은 is-active 클래스를 삭제했으므로, 초기 curruntActiveTab이 null이 되어버리는 이슈 해결
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('scroll', _.throttle(updateActiveTabOnScroll, 300))
