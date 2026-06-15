<!-- deze index.php is gemaakt door Mazin -->

<?php include 'header.php'; ?>

<main>
    </div>
        <div class="container">
        <h2>Mijn Gasverbruik</h2>

    </div>
</main>

<?php include 'footer.php'; ?>


<!-- deze index.php is gemaakt door Opdracht -->

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
        <section class="item"><?php include_once 'includes/item_tijd.php'; ?></section>
        <section class="item"><?php include_once 'includes/item_gas.php'; ?></section>
        <section class="item"><?php include_once 'includes/item_elektriciteit.php'; ?></section>
        <section class="item"><?php include_once 'includes/item-4.php'; ?></section>
        <section class="item"><?php include_once 'includes/item-5.php'; ?></section>
        <section class="item"><?php include_once 'includes/item-6.php'; ?></section>
        <section class="item"><?php include_once 'includes/item-7.php'; ?></section>
        <section class="item"><?php include_once 'includes/item-8.php'; ?></section>
        <section class="item"><?php include_once 'includes/item-9.php'; ?></section>
    </main>
    <?php include_once 'footer.php'; ?>
</body>

</html>