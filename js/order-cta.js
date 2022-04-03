const orderCta = document.querySelector('.order-cta')

const [orderCtaBookmarkButton, orderCtaBuyButton] = orderCta.children

const orderModal = document.querySelector('.order-form-modal')
const orderModalOverlay = document.querySelector('.overlay')

function openOrderModal() {
  orderModal.classList.add('is-open')
  orderModalOverlay.classList.add('is-active')
}

function closeOrderModal() {
  orderModal.classList.remove('is-open')
  orderModalOverlay.classList.remove('is-active')
}

function toggleOrderCtaBookmark() {
  const [icon, countSpan] = this.children
  const count = Number(countSpan.innerHTML.replaceAll(',', ''))
  // 문자를 원하는 다른 문자로 교체해주는 메소드 (All은 전체 교체)

  this.classList.toggle('is-active')
  icon.classList.toggle('ic-bookmark')
  icon.classList.toggle('ic-bookmark-filled')

  let newCount = count
  if (this.classList.contains('is-active')) {
    newCount = newCount + 1
  } else {
    newCount = newCount - 1
  }

  countSpan.innerHTML = newCount.toLocaleString()
  // 숫자 자료에 콤마를 붙여주는 메소드
  countSpan.setAttribute('aria-label', `북마크 ${newCount.toLocaleString()}회`)
  // semantic markup을 위해 aria-label까지 바뀌주는 센수!
}

orderCtaBuyButton.addEventListener('click', openOrderModal)
orderModalOverlay.addEventListener('click', closeOrderModal)
orderCtaBookmarkButton.addEventListener('click', toggleOrderCtaBookmark)
