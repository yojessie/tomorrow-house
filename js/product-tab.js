const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

let currentActiveTab = productTab.querySelector('.is-active')

function activateTab() {
  const tabItem = this.parentNode
  currentActiveTab.classList.remove('is-active')
  currentActiveTab = tabItem
  tabItem.classList.add('is-active')
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', activateTab)
})
