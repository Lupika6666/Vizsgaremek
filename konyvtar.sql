-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 10. 21:00
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konyvtar`
--

DROP DATABASE IF EXISTS konyvtar;
CREATE DATABASE konyvtar CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE konyvtar;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonzes`
--

CREATE TABLE `kolcsonzes` (
  `id` int(11) NOT NULL,
  `kolcsonzes_ideje` date NOT NULL,
  `hatarido` date NOT NULL,
  `peldany_id` int(11) NOT NULL,
  `olvaso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyv`
--

CREATE TABLE `konyv` (
  `id` int(11) NOT NULL,
  `cim` varchar(50) NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `leiras` text DEFAULT NULL,
  `publikalas_ev` int(4) DEFAULT NULL,
  `szerzo_id` int(11) DEFAULT NULL,
  `nyelv_id` int(11) DEFAULT NULL,
  `mufaj_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `konyv`
--

INSERT INTO `konyv` (`id`, `cim`, `isbn`, `leiras`, `publikalas_ev`, `szerzo_id`, `nyelv_id`, `mufaj_id`) VALUES
(1, 'Földrajz Atlasz középiskolásoknak', '9789633284858', NULL, 2024, NULL, 1, 2),
(2, 'Digitális kultúra 10.', '9786156256393', NULL, 2021, 1, 1, 1),
(3, 'Egri Csillagok', '9631139557', NULL, 1985, 2, 1, 4),
(4, 'Szent Péter esernyője', '9789636450496', NULL, 2010, 3, 1, 3),
(5, 'Földrajz 10.', '9789636974107', NULL, 2014, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mufaj`
--

CREATE TABLE `mufaj` (
  `id` int(11) NOT NULL,
  `nev` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `mufaj`
--

INSERT INTO `mufaj` (`id`, `nev`) VALUES
(2, 'földrajzi atlasz'),
(3, 'kisregény'),
(1, 'tankönyv'),
(4, 'történelmi regény');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyelv`
--

CREATE TABLE `nyelv` (
  `id` int(11) NOT NULL,
  `nev` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `nyelv`
--

INSERT INTO `nyelv` (`id`, `nev`) VALUES
(2, 'angol'),
(1, 'magyar');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `olvaso`
--

CREATE TABLE `olvaso` (
  `kartyaszam` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tel` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `peldany`
--

CREATE TABLE `peldany` (
  `id` int(11) NOT NULL,
  `hely` varchar(25) NOT NULL,
  `konyv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerzo`
--

CREATE TABLE `szerzo` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szerzo`
--

INSERT INTO `szerzo` (`id`, `nev`) VALUES
(2, 'Gárdonyi Géza'),
(3, 'Mikszáth Kálmán'),
(1, 'Pintér Gergely');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `nev` varchar(25) NOT NULL,
  `jelszo` varchar(25) NOT NULL,
  `role` varchar(25) NOT NULL,
  `olvaso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `peldany_id` (`peldany_id`),
  ADD KEY `olvaso_id` (`olvaso_id`);

--
-- A tábla indexei `konyv`
--
ALTER TABLE `konyv`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `szerzo_id` (`szerzo_id`),
  ADD KEY `nyelv_id` (`nyelv_id`),
  ADD KEY `mufaj_id` (`mufaj_id`);

--
-- A tábla indexei `mufaj`
--
ALTER TABLE `mufaj`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `nyelv`
--
ALTER TABLE `nyelv`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `olvaso`
--
ALTER TABLE `olvaso`
  ADD PRIMARY KEY (`kartyaszam`),
  ADD UNIQUE KEY `kartyaszam` (`kartyaszam`);

--
-- A tábla indexei `peldany`
--
ALTER TABLE `peldany`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- A tábla indexei `szerzo`
--
ALTER TABLE `szerzo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`nev`),
  ADD UNIQUE KEY `nev` (`nev`),
  ADD KEY `olvaso_id` (`olvaso_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `konyv`
--
ALTER TABLE `konyv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `mufaj`
--
ALTER TABLE `mufaj`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `nyelv`
--
ALTER TABLE `nyelv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `olvaso`
--
ALTER TABLE `olvaso`
  MODIFY `kartyaszam` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `peldany`
--
ALTER TABLE `peldany`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szerzo`
--
ALTER TABLE `szerzo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD CONSTRAINT `kolcsonzes_ibfk_1` FOREIGN KEY (`peldany_id`) REFERENCES `peldany` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `kolcsonzes_ibfk_2` FOREIGN KEY (`olvaso_id`) REFERENCES `olvaso` (`kartyaszam`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `konyv`
--
ALTER TABLE `konyv`
  ADD CONSTRAINT `konyv_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `konyv_ibfk_2` FOREIGN KEY (`nyelv_id`) REFERENCES `nyelv` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `konyv_ibfk_3` FOREIGN KEY (`mufaj_id`) REFERENCES `mufaj` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `peldany`
--
ALTER TABLE `peldany`
  ADD CONSTRAINT `peldany_ibfk_1` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`olvaso_id`) REFERENCES `olvaso` (`kartyaszam`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
