-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2021 a las 03:59:28
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `consultas_medicas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultations`
--

CREATE TABLE `consultations` (
  `ID_CONSULTA` int(10) NOT NULL,
  `ID_PAT` int(10) NOT NULL,
  `ID_DOC` int(10) NOT NULL,
  `ID_NUR` int(10) NOT NULL,
  `ID_PRES` int(10) NOT NULL,
  `DATE` datetime NOT NULL,
  `DURATION` int(10) NOT NULL,
  `VIDEO` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diseases`
--

CREATE TABLE `diseases` (
  `ID_DISEASE` int(10) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `MEDICAL_TERM` varchar(30) NOT NULL,
  `CAUSES` text NOT NULL,
  `SYMPTOM` text NOT NULL,
  `TREATMENT` text NOT NULL,
  `LETHALITY` varchar(30) NOT NULL,
  `RISK_GROUPS` varchar(30) NOT NULL,
  `RECURRENCE` varchar(30) NOT NULL,
  `IMAGE` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medical_history`
--

CREATE TABLE `medical_history` (
  `ID_USR` int(10) NOT NULL,
  `ILLNESS` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medical_history`
--

INSERT INTO `medical_history` (`ID_USR`, `ILLNESS`) VALUES
(5, 'Cáncer'),
(5, 'Asma'),
(5, 'Diabetes'),
(7, 'Asma'),
(7, 'Cáncer');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--

CREATE TABLE `patients` (
  `ID_USR` int(10) NOT NULL,
  `SEX` varchar(10) NOT NULL,
  `AGE` int(10) NOT NULL,
  `HEIGHT` double NOT NULL,
  `WEIGHT` double NOT NULL,
  `PRESSURE` varchar(10) NOT NULL,
  `BREATHING` varchar(10) NOT NULL,
  `PULSE` varchar(10) NOT NULL,
  `TEMPERATURE` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`ID_USR`, `SEX`, `AGE`, `HEIGHT`, `WEIGHT`, `PRESSURE`, `BREATHING`, `PULSE`, `TEMPERATURE`) VALUES
(5, 'Femenino', 23, 1.64, 22.5, '120/80', '8 a 16', '60 y 100', 37.4),
(6, 'Femenino', 23, 1.64, 22.5, '120/80', '8 a 16', '60 y 100', 37.4),
(7, 'Masculino', 23, 1.64, 22.5, '120/80', '8 a 16', '60 y 100', 37.4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prescrips`
--

CREATE TABLE `prescrips` (
  `ID_PRES` int(10) NOT NULL,
  `PAT_NAME` varchar(60) NOT NULL,
  `DOC_NAME` varchar(60) NOT NULL,
  `DATE` date NOT NULL,
  `DIAGNOSIS` text NOT NULL,
  `MEDICATION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID_USR` int(10) NOT NULL,
  `USR_NAME` varchar(30) NOT NULL,
  `USR_PASSW` varchar(100) NOT NULL,
  `USR_TYPE` varchar(30) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `LASTNAME` varchar(30) NOT NULL,
  `BIRTH` date NOT NULL,
  `EMAIL` varchar(40) NOT NULL,
  `PHONE` varchar(30) NOT NULL,
  `COUNTRY` varchar(30) NOT NULL,
  `STREET` varchar(40) NOT NULL,
  `CITY` varchar(30) NOT NULL,
  `POSTCODE` varchar(30) NOT NULL,
  `PHOTO` varchar(60) NOT NULL,
  `IS_REG` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consultations`
--
ALTER TABLE `consultations`
  ADD PRIMARY KEY (`ID_CONSULTA`),
  ADD KEY `ID_PAT` (`ID_PAT`),
  ADD KEY `ID_DOC` (`ID_DOC`),
  ADD KEY `ID_NUR` (`ID_NUR`),
  ADD KEY `ID_PRES` (`ID_PRES`);

--
-- Indices de la tabla `diseases`
--
ALTER TABLE `diseases`
  ADD PRIMARY KEY (`ID_DISEASE`);

--
-- Indices de la tabla `medical_history`
--
ALTER TABLE `medical_history`
  ADD KEY `ID_USR` (`ID_USR`);

--
-- Indices de la tabla `patients`
--
ALTER TABLE `patients`
  ADD UNIQUE KEY `ID_USR_2` (`ID_USR`),
  ADD KEY `ID_USR` (`ID_USR`);

--
-- Indices de la tabla `prescrips`
--
ALTER TABLE `prescrips`
  ADD PRIMARY KEY (`ID_PRES`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_USR`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultations`
--
ALTER TABLE `consultations`
  MODIFY `ID_CONSULTA` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `diseases`
--
ALTER TABLE `diseases`
  MODIFY `ID_DISEASE` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `prescrips`
--
ALTER TABLE `prescrips`
  MODIFY `ID_PRES` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID_USR` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `medical_history`
--
ALTER TABLE `medical_history`
  ADD CONSTRAINT `medical_history_ibfk_1` FOREIGN KEY (`ID_USR`) REFERENCES `patients` (`ID_USR`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
