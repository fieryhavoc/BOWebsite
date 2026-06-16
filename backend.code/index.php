<!-- deze index.php is gemaakt door Mazin -->

<?php include 'header.php'; ?>

<main>
</div>
</main>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DuHu dashboard</title>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <link rel="stylesheet" href="css/style-main.css">
    <link rel="stylesheet" href="css/style-header.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php include_once 'header.php'; ?>
    <main class="container">
        <section class="item" id="item-tijd"><?php include_once '../includes/tijd.php'; ?></section>
        <section class="item" id="item-gas"><?php include_once '../includes/gasverbruik.php'; ?></section>
        <section class="item" id="item-elektriciteit"><?php include_once '../includes/elektriciteit.php'; ?></section>
        <section class="item" id="item-actueletemperatuur"><?php include_once '../includes/buiten-temperatuur.php'; ?></section>
        <section class="item" id="item-weersverwachting"><?php include_once '../includes/weersverwachting.php'; ?></section>
        <section class="item" id="item-zontijden"><?php include_once '../includes/zontijden.php'; ?></section>
        <section class="item" id="item-water"><?php include_once '../includes/waterverbruik.php'; ?></section>
        <section class="item" id="item-opbrengst"><?php include_once '../includes/zonnepanelen.php'; ?></section>
        <section class="item" id="item-knopjes"><?php include_once '../includes/dark-light-mode.php'; ?></section>
    </main>
    <?php include_once 'footer.php'; ?>
</body>

</html>