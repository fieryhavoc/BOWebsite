<div class="dark-light-mode">
    <button id="toggle-theme" aria-label="Schakel licht- en donker thema">Schakel thema</button>
</div>

<script>
/**
 * Dark/Light Mode Toggle
 * Eenvoudige thema-omschakeling met localStorage
 */
(function() {
    const button = document.getElementById('toggle-theme');
    if (!button) return;
    
    const THEME_KEY = 'app-theme';
    const DARK = 'dark';
    const LIGHT = 'light';
    
    // Laad voorkeur uit localStorage
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === DARK) {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle thema bij klik
    button.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem(THEME_KEY, isDark ? DARK : LIGHT);
    });
})();
</script>

/* logan en mazin /