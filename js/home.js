
var product_category = document.querySelectorAll('.product-category')
product_category.forEach(product => {
    product.addEventListener('click', () => {
        product_category.forEach(product_other => {
            product_other.removeAttribute('opened')
        })
        product.setAttribute('opened', '')
    })
})

