const sectionHeaderButton = document.querySelector(
  '.product-shipment .product-section-header.sm-only .icon-button'
)

function openSection() {
  const section = this.parentNode.parentNode

  section.classList.add('is-open')
}

sectionHeaderButton.addEventListener('click', openSection)
