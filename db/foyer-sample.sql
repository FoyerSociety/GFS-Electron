-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 27 jan. 2020 à 11:44
-- Version du serveur :  8.0.13-4
-- Version de PHP :  7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `g13Pj1NqxI`
--

-- --------------------------------------------------------

--
-- Structure de la table `Argent`
--

DROP TABLE IF EXISTS `Argent`;
CREATE TABLE IF NOT EXISTS `Argent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `mois` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `annee` int(4) NOT NULL,
  `paye` int(11) NOT NULL DEFAULT '0',
  `apayer` int(11) NOT NULL DEFAULT '18000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Argent`
--

INSERT INTO `Argent` (`id`, `username`, `mois`, `annee`, `paye`, `apayer`) VALUES
(1, 'gaetan', 'Novembre', 2019, 18000, 18000),
(2, 'dinahasina', 'Novembre', 2019, 18000, 18000),
(3, 'aina', 'Novembre', 2019, 18000, 18000),
(4, 'landry', 'Novembre', 2019, 18000, 18000),
(5, 'sarino', 'Novembre', 2019, 18000, 18000),
(6, 'rojo', 'Novembre', 2019, 2500, 18000),
(7, 'aina', 'Decembre', 2019, 2000, 10200),
(8, 'dinahasina', 'Decembre', 2019, 6900, 10200),
(9, 'gaetan', 'Decembre', 2019, 0, 10200),
(10, 'landry', 'Decembre', 2019, 10200, 10200),
(12, 'sarino', 'Decembre', 2019, 7600, 10200),
(18, 'aina', 'Janvier', 2020, 6600, 6600),
(19, 'arleme', 'Janvier', 2020, 6000, 6600),
(20, 'dinahasina', 'Janvier', 2020, 5000, 6600),
(21, 'gaetan', 'Janvier', 2020, 6600, 6600),
(22, 'landry', 'Janvier', 2020, 6600, 6600),
(23, 'sarino', 'Janvier', 2020, 0, 6600),
(24, 'zacke', 'Janvier', 2020, 6600, 6600);

-- --------------------------------------------------------

--
-- Structure de la table `Depense`
--

DROP TABLE IF EXISTS `Depense`;
CREATE TABLE IF NOT EXISTS `Depense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `somme` int(11) NOT NULL,
  `motif` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Depense`
--

INSERT INTO `Depense` (`id`, `username`, `somme`, `motif`, `date`) VALUES
(9, 'aina', 500, 'Savon', '2019-11-25');

-- --------------------------------------------------------

--
-- Structure de la table `Membre`
--

DROP TABLE IF EXISTS `Membre`;
CREATE TABLE IF NOT EXISTS `Membre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `privilege` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'nn',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cuisinier` int(10) UNSIGNED DEFAULT '1',
  `ordures` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `Membre`
--

INSERT INTO `Membre` (`id`, `username`, `privilege`, `password`, `cuisinier`, `ordures`) VALUES
(1, 'aina', 'cf', '71f8e7976e4cbc4561c9d62fb283e7f788202acb', 0, 0),
(2, 'dinahasina', 'nn', '71f8e7976e4cbc4561c9d62fb283e7f788202acb', 4, 1),
(3, 'gaetan', 'su', '338d64381be5cea342447402b84f7f5511e3bf1e', 3, 4),
(4, 'landry', 'ch', 'dc76e9f0c0006e8f919e0c515c66dbba3982f785', 1, 5),
(5, 'sarino', 'nn', '71f8e7976e4cbc4561c9d62fb283e7f788202acb', 5, 6),
(6, 'arleme', 'nn', '5dba789c517f483d36860c1a48be1530f1ddae99', 2, 3),
(7, 'zacke', 'nn', '71f8e7976e4cbc4561c9d62fb283e7f788202acb', 6, 2),
(9, 'fabien', 'nn', '71f8e7976e4cbc4561c9d62fb283e7f788202acb', 7, 7),
(10, 'casimir', 'nn', '71f8e7976e4cbc4561c9d62fb283e7f788202acb', 8, 8);

-- --------------------------------------------------------

--
-- Structure de la table `Menu`
--

DROP TABLE IF EXISTS `Menu`;
CREATE TABLE IF NOT EXISTS `Menu` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `menu` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `prix` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Menu`
--

INSERT INTO `Menu` (`id`, `menu`, `prix`) VALUES
(1, 'Oeufs sauce', 4000),
(2, 'Chou', 3500),
(3, 'Brède & Viande', 2500),
(4, 'kitoza', 5000),
(5, 'Légume sauté', 3000),
(6, 'Petit Poids', 3000),
(7, 'Voanjobory', 2500),
(8, 'Steak', 5000),
(9, 'Freestyle', 3500),
(10, 'Brède sauce', 2500),
(11, 'Kitoza', 5000),
(12, 'Haricot Vert', 3000),
(13, 'Soupe légume', 3000),
(14, 'Poulet', 6000);

-- --------------------------------------------------------

--
-- Structure de la table `Repas`
--

DROP TABLE IF EXISTS `Repas`;
CREATE TABLE IF NOT EXISTS `Repas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `somme` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `Repas`
--

INSERT INTO `Repas` (`id`, `username`, `somme`, `date`) VALUES
(6, 'sarino', 2500, '2019-11-01'),
(7, 'aina', 2500, '2019-11-02'),
(8, 'landry', 2500, '2019-11-03'),
(9, 'gaetan', 3500, '2019-11-04'),
(10, 'dinahasina', 2500, '2019-11-05'),
(11, 'sarino', 2500, '2019-11-06'),
(12, 'landry', 3000, '2019-11-07'),
(13, 'aina', 3500, '2019-11-14'),
(14, 'rojo', 3000, '2019-11-15'),
(15, 'gaetan', 2500, '2019-11-16'),
(16, 'dinahasina', 2500, '2019-11-17'),
(17, 'sarino', 2500, '2019-11-18'),
(18, 'aina', 2200, '2019-11-19'),
(21, 'landry', 2500, '2019-11-20'),
(22, 'rojo', 3000, '2019-11-21'),
(23, 'gaetan', 2500, '2019-11-22'),
(24, 'dinahasina', 2500, '2019-11-23'),
(25, 'sarino', 2500, '2019-11-24'),
(26, 'aina', 2500, '2019-11-25'),
(27, 'landry', 2500, '2019-11-26'),
(28, 'gaetan', 2000, '2019-11-27'),
(29, 'dinahasina', 3000, '2019-11-28'),
(30, 'sarino', 2500, '2019-11-29'),
(31, 'landry', 3000, '2019-11-30'),
(32, 'gaetan', 3000, '2019-12-01'),
(33, 'aina', 3500, '2019-12-02'),
(34, 'landry', 3400, '2020-01-21'),
(35, 'aina', 5000, '2020-01-20'),
(36, 'fabien', 3000, '2020-01-23'),
(37, 'dinahasina', 5000, '2020-01-24'),
(38, 'arleme', 2000, '2020-01-22'),
(39, 'sarino', 3000, '2020-01-25'),
(40, 'zacke', 6000, '2020-01-26'),
(41, 'casimir', 4000, '2020-01-27');

-- --------------------------------------------------------

--
-- Structure de la table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
CREATE TABLE IF NOT EXISTS `Transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `somme` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `motif` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Transaction`
--

INSERT INTO `Transaction` (`id`, `somme`, `motif`, `username`) VALUES
(12, -2500, 'Repas', 'sarino'),
(13, -2500, 'Repas', 'aina'),
(14, -2500, 'Repas', 'landry'),
(15, -3500, 'Repas', 'gaetan'),
(16, -2500, 'Repas', 'dinahasina'),
(17, -2500, 'Repas', 'sarino'),
(18, -3000, 'Repas', 'landry'),
(19, -3500, 'Repas', 'aina'),
(20, -3000, 'Repas', 'rojo'),
(21, -2500, 'Repas', 'gaetan'),
(22, -2500, 'Repas', 'dinahasina'),
(23, -2500, 'Repas', 'sarino'),
(24, -2200, 'Repas', 'aina'),
(25, 3000, 'cotisation', 'sarino'),
(26, -2500, 'Repas', 'landry'),
(27, -3000, 'Repas', 'rojo'),
(28, -2500, 'Repas', 'gaetan'),
(29, -2500, 'Repas', 'dinahasina'),
(30, 2500, 'cotisation', 'dinahasina'),
(35, -2500, 'Repas', 'sarino'),
(36, -2500, 'Repas', 'aina'),
(37, -500, 'Savon', 'aina'),
(39, -2500, 'Repas', 'landry'),
(40, -2000, 'Repas', 'gaetan'),
(41, -3000, 'Repas', 'dinahasina'),
(42, 3000, 'cotisation', 'dinahasina'),
(43, -2500, 'Repas', 'sarino'),
(44, -3000, 'Repas', 'landry'),
(45, -3000, 'Repas', 'gaetan'),
(46, -3500, 'Repas', 'aina'),
(47, 2000, 'cotisation', 'sarino'),
(48, 8000, 'cotisation', 'gaetan'),
(49, 10000, 'cotisation', 'dinahasina'),
(50, 10200, 'cotisation', 'landry'),
(52, 2000, 'cotisation', 'aina'),
(53, 3600, 'cotisation', 'sarino'),
(54, 2500, 'cotisation', 'dinahasina'),
(55, 3000, 'cotisation', 'dinahasina'),
(56, 4000, 'cotisation', 'sarino'),
(57, 1400, 'cotisation', 'dinahasina'),
(58, 6000, 'cotisation', 'arleme'),
(59, 6600, 'cotisation', 'gaetan'),
(60, 6000, 'cotisation', 'aina'),
(61, 6600, 'cotisation', 'zacke'),
(62, 6500, 'cotisation', 'landry'),
(64, 100, 'cotisation', 'landry'),
(65, -3400, 'Repas', 'landry'),
(66, -5000, 'Repas', 'aina'),
(67, 5000, 'cotisation', 'dinahasina'),
(68, -3000, 'Repas', 'fabien'),
(69, -5000, 'Repas', 'dinahasina'),
(70, 600, 'cotisation', 'aina'),
(71, -2000, 'Repas', 'arleme'),
(72, -3000, 'Repas', 'sarino'),
(73, -6000, 'Repas', 'zacke'),
(74, -4000, 'Repas', 'casimir');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
