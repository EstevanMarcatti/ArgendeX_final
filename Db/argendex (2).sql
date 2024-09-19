-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/09/2024 às 18:55
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `argendex`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro`
--

CREATE TABLE `cadastro` (
  `ID` int(10) NOT NULL,
  `Nome` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Senha` varchar(50) NOT NULL,
  `Cidade` varchar(30) NOT NULL,
  `Data_Nascimento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `cadastro`
--

INSERT INTO `cadastro` (`ID`, `Nome`, `Email`, `Senha`, `Cidade`, `Data_Nascimento`) VALUES
(2, 'Arthur Nicoleti', 'arthurbarassa@gmail.com', 'Arthur@gay', 'Itapira', '1948-03-24'),
(3, 'joao gabriel', 'joao524@gmail.com', 'Joao@1234', 'sao paulo', '1939-03-23'),
(4, 'Estevan Marcatti', 'marcattiestevan@gmail.com', 'Estevan@123.', 'Itapira', '2006-12-26'),
(6, 'Estevan Marcatti R', 'estevanmr@gmai.com', 'Arthurgay123.', 'Itapira', '2004-07-21'),
(8, 'Arthur gay123', 'Arthurviadinho23@gmail.com', 'Arthur@gay123', 'Itapira', '2000-08-25'),
(11, 'Estevan Marcti', 'marcattiestevan175@gmail.com', 'EstevanRabechi!@@1', 'Itapira', '2002-07-07'),
(12, 'Estevna Marc', 'Estevanmarc1@gmail.com', 'estevaN123@', 'Itapira', '1995-08-31'),
(13, 'Estevan Marcatti RB', 'estevanm12334@hotmal.com', 'Estevan23432@ccs', 'Itapira', '1996-07-10'),
(14, 'Estevan Marcatt', 'estevanmarcatti@gmail.com', 'Fusca963.', 'Itapira', '2002-12-26'),
(15, 'Estevanmr ', 'Rstevan9362@gmail.co.', 'jsbsbsHsjs97.', 'Itapira ', '1999-09-24'),
(16, 'Otavio Arthur', 'iufdnviydfuy@gmail.com', 'sdjncinsdicnsidcnsdluNUISNIH34567.', 'Itapira', '1997-02-19'),
(17, 'Estevan ', 'Estevan685@gmail.com', 'Hdjsv867.', 'Itapira', '2002-09-20'),
(18, 'José Pinto ', 'Josesilvapinto@gmail.com', 'Silva123@', 'Itapira', '1986-09-25'),
(19, 'Melissa Balbieri', 'Melissa.balbieri@gmail.com', 'Nin@M3l', 'Itapira', '2008-08-28'),
(20, 'Carlinhos ', 'carlinhos@gmail.com', '@Gjceisv.72', 'Itapira', '1998-09-18'),
(21, 'Paulo Guilherme ', 'terrazangui800@gmail.com', 'Erickpreto10@', 'Itapira ', '1899-12-31'),
(22, 'Murylo Otavio Alvez de Toledo', 'murylorodnei@gmail.com', 'Murylorodnei2008@', 'Itapira', '2008-09-02'),
(23, 'Diogo Gonçalves de Souza ', 'Diogosouzagon@gmail.com', 'Ad46164208823#', 'Itapurq', '1998-09-18'),
(24, 'Diogo Gonçalves de Souza ', 'Diogosouzagon@gmail.com', 'Ad46164208823#', 'Itapurq', '1998-09-18'),
(25, 'Caio Nicolas', 'caio.ferreira10@portalsesisp.com', 'ARTHur@1106', 'Itapira', '2000-05-20'),
(26, 'Diogo Gonçalves de Souza ', 'Diogosouzagon@gmail.com', 'Ad46164208823#', 'Itapira ', '2000-09-18'),
(27, 'Raica Gabrieli de Lima ', 'Raica@gmail.com', 'Ad46164208823#', 'Itapira ', '2000-09-18'),
(28, 'Estevan Marcatti', 'felipesouza@gmail.com', 'Felipe@291000', 'Itapira', '2004-10-29'),
(29, 'Julia Bosso Albano', 'Julia.zbosso2@gmail.com', 'Julia2004@', 'Itapira', '2000-09-18'),
(30, 'Adrian Matheus morais giolo', 'adriangiolo2905@gmail.com', '@A290501g', 'Itapira', '2001-05-29'),
(31, 'vanessa castelion', 'vanessacastelion@hotmail.com', 'van253512A@', 'Itapira', '1979-03-13'),
(32, 'Arthur nicoleti', 'Arthurbarassa@gmail.com', 'Arthur@1106', 'Itapira', '1986-09-18'),
(33, 'Maria Luiza ', 'marialuiza@gmail.com', 'Malu@1234', 'Itapira ', '1986-09-18'),
(34, 'Pedro Augusto marchioretto fil', 'Pedro@depositomarchioretto.com.br', 'Pedrinho5819#', 'Itapira', '1997-10-30'),
(36, 'Júlia Dias', 'julia@gmail.com', 'Julia@123', 'Nova York', '2007-04-18'),
(37, 'Júlia Dias', 'julia@gmail.com', 'Julia@123', 'Nova York', '2007-04-18'),
(38, 'Rafael Sapeca', 'rafinhadecalcinha@gmail.com', 'Rafa@123', 'Nova York', '2007-04-18');

-- --------------------------------------------------------

--
-- Estrutura para tabela `compartilhar`
--

CREATE TABLE `compartilhar` (
  `ID_Usuario` int(10) NOT NULL,
  `Niv_Comp` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `importancia`
--

CREATE TABLE `importancia` (
  `ID_import` int(11) NOT NULL,
  `Nivel importancia` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `importancia`
--

INSERT INTO `importancia` (`ID_import`, `Nivel importancia`) VALUES
(0, 'nulo'),
(1, 'dispençavel'),
(2, 'importante'),
(3, 'indispençavel');

-- --------------------------------------------------------

--
-- Estrutura para tabela `plano`
--

CREATE TABLE `plano` (
  `ID_Usuario` int(6) NOT NULL,
  `Cod_Plano` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `plano`
--

INSERT INTO `plano` (`ID_Usuario`, `Cod_Plano`) VALUES
(1, 'gratuito'),
(2, 'gratuito'),
(4, 'empresarial'),
(3, 'gratuito'),
(5, 'universitario'),
(6, 'universitario');

-- --------------------------------------------------------

--
-- Estrutura para tabela `subtarefa`
--

CREATE TABLE `subtarefa` (
  `ID_import` int(6) NOT NULL,
  `Descricao` varchar(50) NOT NULL,
  `Alarme` datetime(6) NOT NULL,
  `Compartilhar` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefa`
--

CREATE TABLE `tarefa` (
  `ID` int(10) NOT NULL,
  `Data` date NOT NULL,
  `Hora` datetime NOT NULL,
  `Titulo` varchar(50) NOT NULL,
  `Descricao` varchar(1000) NOT NULL,
  `Categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `date`, `time`) VALUES
(106, 'ssssss', 'sssssssss', '2024-08-14', '16:07'),
(107, 'eeeeeeeee', 'eeeeee', '2024-08-20', '16:10'),
(108, 'eeee', 'eeeeeee', '2024-08-14', '21:00'),
(109, 'fgggggggg', 'ddddd', '2024-08-22', '23:59'),
(110, 'fffffffff', 'ffffffffff', '2024-08-22', '19:13'),
(111, ' xzcsdvcsdsd', 'sdcsxz', '2024-09-18', '09:48'),
(112, 'dscusdncksndi', 'shdnciusdni', '2024-09-18', '09:53'),
(113, 'eeeeeeeeeeeeee', 'cbukztkuvsjd', '2024-09-18', '10:50'),
(114, 'eeeeeeeeeeeeee', 'cbukztkuvsjd', '2024-09-18', '10:50'),
(115, 'eeeeeeeeeeeeee', 'cbukztkuvsjd', '2024-09-18', '10:50'),
(116, 'eeeeeeeeeeeeee', 'cbukztkuvsjd', '2024-09-18', '10:50'),
(117, 'estevan', 'dsffsdgdf', '2024-09-18', '10:59'),
(118, 'estevan', 'dsffsdgdf', '2024-09-18', '10:59'),
(119, 'nnnnksdoksodk', 'sdfdsf', '2024-09-19', '11:01'),
(120, 'sddsfds', 'sdfsd', '2024-09-18', '11:10'),
(121, 'csvsdvds', 'dscs', '2024-09-11', '11:21'),
(122, 'scsds', 'dcsd', '2024-09-24', '11:22'),
(123, 'vcdvf', 'dfvfdd', '2024-09-18', '11:28'),
(124, 'sdvskhdchis', 'usdnciusd', '2024-09-17', '11:34'),
(125, 'wertyQ', 'WERT', '2024-09-17', '11:35'),
(126, 'Teste ', 'Mobile ', '2024-09-28', '06:25'),
(127, 's dcsd', 'sdcds ds', '2024-09-18', '12:01'),
(128, 'dcsdcsd', 'sdcds', '2024-09-19', '13:57'),
(129, 'Estevna', 'Nsnsbsb', '2024-09-18', '03:34'),
(130, 'Hshwhsv', 'Hshhshs', '2024-09-16', '10:03'),
(131, ' ,jgvgjvmjg', 'hibv,bhjm', '2024-09-01', '10:10'),
(132, 'Cabelo', 'Cortar ', '2024-09-18', '12:20'),
(133, 'Cortar cabelo ', 'cortar cabelo ', '2024-09-19', '12:30'),
(134, 'Exame do toque ', 'Toque', '2024-09-20', '06:30'),
(135, 'exame da bunda', 'bunda', '2024-09-20', '10:30'),
(136, 'bater uma', 'ja sabe né', '2024-09-06', '00:00'),
(137, 'Hxncggv', 'Hgvbbct', '2024-09-19', '03:25'),
(138, 'Hcvncfg', 'Bnccnj', '2024-09-19', '11:07'),
(139, 'Fui shhsbsegsb', 'Sgsbhs', '2024-09-18', '11:08'),
(140, 'Hshsbs', 'Shhsbs', '2024-09-18', '11:11'),
(141, 'Estudo pra prova de inglês ', 'Estudar', '2024-09-19', '11:12'),
(142, 'estudar', 'estudar pra prova de ingles\n', '2024-09-02', '04:44'),
(143, 'Ola', 'Gsgshsbs', '2024-08-08', '11:18'),
(144, 'campeonato FN', 'campeonato 0 bild', '2024-09-19', '19:00'),
(145, 'Campeonato FN', 'Campeonato 0build', '2024-09-19', '16:00'),
(146, 'Viajar ', 'Londres ', '2024-11-06', '00:40'),
(147, 'corta bebelo', 'vou corta o cabelo no geraldinho', '2024-09-19', '14:00'),
(148, 'apresentaçao', 'sp', '2024-09-25', '08:00'),
(149, 'Thermas ', 'Dia da família ', '2024-10-12', '12:00'),
(150, 'Yhsuf', 'Gjshvb', '2024-09-17', '10:10'),
(151, 'r6jkihyki', 'hiçpkji9.', '2024-09-17', '15:10'),
(152, 'Apresentação Senai', 'Sesi de portas abertas ', '2024-09-18', '09:30'),
(153, 'Apresentação', 'Apresentação SENAI', '2024-09-02', '14:13'),
(154, 'jgejgjkfk', 'lp.okko', '2024-10-14', '16:36'),
(155, 'Hjsh', 'Ufhf', '2024-09-08', '09:30'),
(156, 'pagamento academia ', '$150,00', '2024-11-20', '16:30'),
(157, 'banho e tosa pipoca', 'pet', '2024-11-20', '16:00'),
(158, 'pag academia', '$150,00\n', '2024-12-20', '14:00'),
(159, 'Pag academia ', '$150.00', '2024-09-17', '13:58'),
(160, 'reuniao', 'reuniao pais', '2024-12-11', '18:13'),
(161, 'Jsgdbdhs', 'Bxhhdnd', '2024-09-03', '14:10'),
(162, 'Reuniao', 'Reuniao', '2024-09-12', '03:10'),
(163, 'Hjhh', 'Jjjjjj', '2024-09-12', '14:13'),
(164, 'Curso', 'Alfabetização ', '2024-09-12', '14:14'),
(165, 'mikujnyhbtg', 'vnyjnyj', '2024-09-11', '20:19'),
(166, 'Dghcvjv', 'Hncnfjnf', '2024-09-17', '12:20'),
(167, 'Meu niver', 'Melhor dia do mundo', '2024-10-12', '00:00'),
(168, 'Aniversário ', 'Aniversário da Marília ', '2024-10-12', '14:19'),
(169, 'APRESENTAÇÃO SENAI', 'APRESENTACAO TOP VENHAM AO TOINTO!!!!!!!!!!!!!', '2024-09-18', '10:15'),
(170, 'Apresentação ', 'Apresentação do TOINTO', '2024-09-18', '14:31'),
(171, 'Limpar a bunda', 'Jjj', '2024-09-24', '18:30'),
(172, 'Arthur limpar a bunda', 'Se limpar', '2024-09-24', '14:39'),
(173, 'Arthur limpar a bunda', 'Se limpar', '2024-09-24', '14:39'),
(174, 'treino', 'ok', '2024-09-25', '18:49'),
(175, 'rvtgr', 'rtgrtg', '2024-09-05', '13:59');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(10) NOT NULL,
  `Nome` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Senha` varchar(50) NOT NULL,
  `Cidade` varchar(30) NOT NULL,
  `Data_Nasc` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`ID`, `Nome`, `Email`, `Senha`, `Cidade`, `Data_Nasc`) VALUES
(1, 'Rafael', 'Rafael123@gmail.com', 'gytresfg', 'Itapira', '2007-05-16'),
(2, 'Arthur', 'Arthur123@gmail.com', 'gytresfg', 'Itapira', '2007-07-11'),
(3, 'Joao', 'Joao123@gmail.com', '#viadoassumido', 'Sao Paulo', '2006-11-13'),
(4, 'Estevan', 'Estevan123@gmail.com', 'gytresfg', 'Itapira', '1997-05-09'),
(5, 'Joao Pedro', 'JoaoPedro123@gmail.com', 'gytresfg', 'Itapira', '2007-03-02'),
(6, 'Otavio', 'Otavio24@gmail.com', '#gayLBGT24', 'Itapira', '2006-06-29');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cadastro`
--
ALTER TABLE `cadastro`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `compartilhar`
--
ALTER TABLE `compartilhar`
  ADD PRIMARY KEY (`ID_Usuario`);

--
-- Índices de tabela `plano`
--
ALTER TABLE `plano`
  ADD KEY `ID_Usuario` (`ID_Usuario`);

--
-- Índices de tabela `tarefa`
--
ALTER TABLE `tarefa`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastro`
--
ALTER TABLE `cadastro`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `plano`
--
ALTER TABLE `plano`
  ADD CONSTRAINT `plano_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
