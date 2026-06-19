<div class="dark-light-mode">
    <button id="toggle-theme">Schakel thema</button>
</div>

<script>
(function(){
    const btn = document.getElementById('toggle-theme');
    if(!btn) return;
    const root = document.body;
    // Initialize from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark-theme');
    }
    btn.addEventListener('click', function(){
        const isDark = root.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
})();
</script>