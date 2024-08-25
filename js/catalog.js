
var toggleLinks = document.querySelectorAll('[catalog-toggle]');

toggleLinks.forEach(function (toggleLink) {
    toggleLink.addEventListener('click', function (event) {
        event.preventDefault();

        const toggleValue = toggleLink.getAttribute('catalog-toggle');

        const list = document.querySelector(`[catalog-section="${toggleValue}"]`);

        if (list) {
            list.classList.toggle('hidden');
        }
        console.log("toggle")
    });
});
