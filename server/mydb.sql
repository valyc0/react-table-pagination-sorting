-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Creato il: Mag 31, 2023 alle 16:04
-- Versione del server: 8.0.33
-- Versione PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
 Database: `mydb`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `employees`
--

CREATE TABLE `employees` (
  `id` bigint NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `employees`
--

INSERT INTO `employees` (`id`, `email_id`, `first_name`, `last_name`) VALUES
(1, 'aaa@tin.iy', 'aaa', 'bbbb');

-- --------------------------------------------------------

--
-- Struttura della tabella `tutorials`
--

CREATE TABLE `tutorials` (
  `id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` bit(1) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `tutorials`
--

INSERT INTO `tutorials` (`id`, `description`, `published`, `title`) VALUES
(52, 'aaaa', b'0', 'pippo'),
(53, 'vale1', b'0', 'vale1'),
(54, '', b'0', 'vale2'),
(55, '', b'0', 'vale3'),
(56, '', b'0', 'vale4'),
(57, '', b'0', 'vale5'),
(102, 'ddd', b'0', 'vale8');

-- --------------------------------------------------------

--
-- Struttura della tabella `tutorials_seq`
--

CREATE TABLE `tutorials_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `tutorials_seq`
--

INSERT INTO `tutorials_seq` (`next_val`) VALUES
(201);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
