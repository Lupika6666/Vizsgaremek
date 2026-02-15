-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 14. 21:44
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
-- Tábla szerkezet ehhez a táblához `kolcsonzesek`
--

CREATE TABLE `kolcsonzesek` (
  `id` int(11) NOT NULL,
  `kolcsonzes_ideje` date NOT NULL,
  `hatarido` date NOT NULL,
  `peldany_id` int(11) NOT NULL,
  `olvaso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyvek`
--

CREATE TABLE `konyvek` (
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
-- A tábla adatainak kiíratása `konyvek`
--

INSERT INTO `konyvek` (`id`, `cim`, `isbn`, `leiras`, `publikalas_ev`, `szerzo_id`, `nyelv_id`, `mufaj_id`) VALUES
(1, 'Földrajz Atlasz középiskolásoknak', '9789633284858', NULL, 2024, NULL, 1, 2),
(2, 'Digitális kultúra 10.', '9786156256393', NULL, 2021, 1, 1, 1),
(3, 'Egri Csillagok', '9631139557', NULL, 1985, 2, 1, 4),
(4, 'Szent Péter esernyője', '9789636450496', NULL, 2010, 3, 1, 3),
(5, 'Földrajz 10.', '9789636974107', NULL, 2014, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mufajok`
--

CREATE TABLE `mufajok` (
  `id` int(11) NOT NULL,
  `nev` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `mufajok`
--

INSERT INTO `mufajok` (`id`, `nev`) VALUES
(2, 'földrajzi atlasz'),
(3, 'kisregény'),
(1, 'tankönyv'),
(4, 'történelmi regény');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nyelvek`
--

CREATE TABLE `nyelvek` (
  `id` int(11) NOT NULL,
  `nev` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `nyelvek`
--

INSERT INTO `nyelvek` (`id`, `nev`) VALUES
(2, 'angol'),
(1, 'magyar');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `olvasok`
--

CREATE TABLE `olvasok` (
  `kartyaszam` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tel` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `peldanyok`
--

CREATE TABLE `peldanyok` (
  `id` int(11) NOT NULL,
  `hely` varchar(25) NOT NULL,
  `konyv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerzok`
--

CREATE TABLE `szerzok` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szerzok`
--

INSERT INTO `szerzok` (`id`, `nev`) VALUES
(2, 'Gárdonyi Géza'),
(3, 'Mikszáth Kálmán'),
(1, 'Pintér Gergely');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userek`
--

CREATE TABLE `userek` (
  `nev` varchar(25) NOT NULL,
  `jelszo` varchar(25) NOT NULL,
  `role` varchar(25) NOT NULL,
  `olvaso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kolcsonzesek`
--
ALTER TABLE `kolcsonzesek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `peldany_id` (`peldany_id`),
  ADD KEY `olvaso_id` (`olvaso_id`);

--
-- A tábla indexei `konyvek`
--
ALTER TABLE `konyvek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `szerzo_id` (`szerzo_id`),
  ADD KEY `nyelv_id` (`nyelv_id`),
  ADD KEY `mufaj_id` (`mufaj_id`);

--
-- A tábla indexei `mufajok`
--
ALTER TABLE `mufajok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `nyelvek`
--
ALTER TABLE `nyelvek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `olvasok`
--
ALTER TABLE `olvasok`
  ADD PRIMARY KEY (`kartyaszam`),
  ADD UNIQUE KEY `kartyaszam` (`kartyaszam`);

--
-- A tábla indexei `peldanyok`
--
ALTER TABLE `peldanyok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- A tábla indexei `szerzok`
--
ALTER TABLE `szerzok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nev` (`nev`);

--
-- A tábla indexei `userek`
--
ALTER TABLE `userek`
  ADD PRIMARY KEY (`nev`),
  ADD UNIQUE KEY `nev` (`nev`),
  ADD KEY `olvaso_id` (`olvaso_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kolcsonzesek`
--
ALTER TABLE `kolcsonzesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `konyvek`
--
ALTER TABLE `konyvek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `mufajok`
--
ALTER TABLE `mufajok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `nyelvek`
--
ALTER TABLE `nyelvek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `olvasok`
--
ALTER TABLE `olvasok`
  MODIFY `kartyaszam` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `peldanyok`
--
ALTER TABLE `peldanyok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `szerzok`
--
ALTER TABLE `szerzok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kolcsonzesek`
--
ALTER TABLE `kolcsonzesek`
  ADD CONSTRAINT `kolcsonzesek_ibfk_1` FOREIGN KEY (`peldany_id`) REFERENCES `peldanyok` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `kolcsonzesek_ibfk_2` FOREIGN KEY (`olvaso_id`) REFERENCES `olvasok` (`kartyaszam`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `konyvek`
--
ALTER TABLE `konyvek`
  ADD CONSTRAINT `konyvek_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzok` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `konyvek_ibfk_2` FOREIGN KEY (`nyelv_id`) REFERENCES `nyelvek` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `konyvek_ibfk_3` FOREIGN KEY (`mufaj_id`) REFERENCES `mufajok` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `peldanyok`
--
ALTER TABLE `peldanyok`
  ADD CONSTRAINT `peldanyok_ibfk_1` FOREIGN KEY (`konyv_id`) REFERENCES `konyvek` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `userek`
--
ALTER TABLE `userek`
  ADD CONSTRAINT `userek_ibfk_1` FOREIGN KEY (`olvaso_id`) REFERENCES `olvasok` (`kartyaszam`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
