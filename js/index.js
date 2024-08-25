


const main = document.querySelector('main')

function registerNavigation() {
    setTimeout(() => {
        document.querySelectorAll("a").forEach(link => {
            //link.style = 'background-color: blue'
            if (link.hasAttribute('load-main')) {
                link.addEventListener("click", handleNavClick, { once: true })
                //link.style = 'background-color: green'
            }
        })
    }, 500)
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

function loadMain(name) {
    const path = `../html/${name}.html`
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
                insertStyle(main, name)
                insertScript(main, name)
            } else {
                main.innerHTML = 'ME. page found, but no content found'
                throw new Error('ME. main not found')
            }
        })
        .catch(console.error);

    registerNavigation()
    document.querySelector('title').textContent = `HTL - ${name}`
}

function insertStyle(parent, css) {
    const link = document.createElement('link')
    link.rel = "stylesheet"
    link.href = `../../css/${css}.css`
    parent.appendChild(link)
}
function insertScript(parent, js) {
    const script = document.createElement('script')
    script.src = `../../js/${js}.js`
    parent.appendChild(script)
}







ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.75097278964379, 37.61758211769605],
        zoom: 16
    });
}