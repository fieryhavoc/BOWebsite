<div class="dark-light-mode">
<<<<<<< HEAD
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
=======
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
>>>>>>> 37ee189708b8e8858da3c10638007e335f38e814
    });
})();
</script>