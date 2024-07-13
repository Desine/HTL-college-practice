


const main = document.querySelector('main')

function registerNavigation() {
    document.querySelectorAll("a").forEach(link => {
        if (link.hasAttribute('load-main')) {
            link.addEventListener("click", handleNavClick, { once: true })
        }
    })
}
function handleNavClick(event) {
    event.preventDefault()
    const contentKey = event.target.closest("a").getAttribute("load-main")
    loadMain(contentKey)
    history.pushState({ contentKey: contentKey }, "", `#${contentKey}`)
}

window.addEventListener("popstate", handlePopState)
function handlePopState(event) {
    if (event.state) loadMain(event.state.contentKey);
}

const initialContent = location.hash.replace("#", "") || "home"
loadMain(initialContent);

function loadMain(content) {
    const path = `../page/Content/${content}.html`
    console.log(`ME. Try loading main from: ${path}`)
    fetch(path)
        .then(response => {
            if (!response.ok) {
                main.innerHTML = '<h1>404</h1><p>page not found</p>'
                throw new Error('Network response was not ok')
            }
            return response.text()
        })
        .then(data => {
            const mainContentMatch = data.match(/<body[^>]*>([\s\S]*?)<\/body>/)
            if (mainContentMatch && mainContentMatch[1]) {
                main.innerHTML = mainContentMatch[1];
            } else {
                main.innerHTML = 'ME. page found, but no content found'
                throw new Error('ME. main not found')
            }
        })

    registerNavigation()
    document.querySelector('title').textContent = `HTL - ${content}`
}