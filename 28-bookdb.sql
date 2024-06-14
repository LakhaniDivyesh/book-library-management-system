-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3325
-- Generation Time: May 30, 2024 at 02:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `28-bookdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_book`
--

CREATE TABLE `tbl_book` (
  `id` bigint(20) NOT NULL,
  `title` varchar(128) NOT NULL,
  `author` varchar(128) NOT NULL,
  `thumbnail` varchar(64) NOT NULL,
  `pdf` varchar(64) NOT NULL,
  `no_of_page` int(64) NOT NULL,
  `price` double(8,2) NOT NULL,
  `tags` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_book`
--

INSERT INTO `tbl_book` (`id`, `title`, `author`, `thumbnail`, `pdf`, `no_of_page`, `price`, `tags`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'You Like It Darker', 'Stephen King', '1716897909926-book-book1.jpg', '1716897909929-book-B08_Divyesh Lakhani_MCA-1.pdf', 496, 1000.00, 'Sifi,Mistry', 1, 0, '2024-05-28 12:05:09', '2024-05-28 12:05:09'),
(2, 'How to be Happy', 'Ruskin Bond', '1716898250897-book-book2.jpg', '1716898250975-book-B08_Divyesh Lakhani_MCA-1.pdf', 132, 500.00, 'happy,funny', 1, 0, '2024-05-28 12:10:51', '2024-05-29 04:17:21'),
(3, 'hhkhhkooo', 'hjhkhkhk', '1716904341765-book-image3.jpg', '1716904341899-book-B08_Divyesh Lakhani_MCA-1.pdf', 56, 687.80, 'ghh,jkkh', 1, 1, '2024-05-28 13:52:21', '2024-05-29 04:24:09'),
(4, 'The Black Orphan', 'Hussain Zaidi', '1717067281610-book-book3.jpg', '1717067281656-book-B08_Divyesh Lakhani_MCA-1.pdf', 300, 600.00, 'history', 1, 0, '2024-05-30 11:08:01', '2024-05-30 11:08:01'),
(5, 'The Wealth Money Can\'t Buy', 'Robin Sharma', '1717067418866-book-book4.jpg', '1717067418866-book-B08_Divyesh Lakhani_MCA-1.pdf', 500, 420.00, 'Hidden,Habits', 1, 0, '2024-05-30 11:10:18', '2024-05-30 11:10:18'),
(6, 'The Gruffalo', 'Julia Donaldson', '1717067553514-book-book5.jpg', '1717067553514-book-B08_Divyesh Lakhani_MCA-1.pdf', 200, 300.00, 'comic,cartoon', 1, 0, '2024-05-30 11:12:33', '2024-05-30 11:12:33'),
(7, 'Lucifer was Innocent The Red Pill', 'Raj Parsana', '1717067707013-book-book6.jpg', '1717067707057-book-B08_Divyesh Lakhani_MCA-1.pdf', 500, 349.00, 'mind,power', 1, 0, '2024-05-30 11:15:07', '2024-05-30 11:15:07'),
(8, 'Rich Dad Poor Dad', 'Robert Kiyosaki', '1717069520274-book-book7.jpg', '1717069520289-book-B08_Divyesh Lakhani_MCA-1.pdf', 336, 322.00, 'motivation', 1, 0, '2024-05-30 11:45:20', '2024-05-30 11:45:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `quantity` int(8) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_country_code`
--

CREATE TABLE `tbl_country_code` (
  `id` bigint(20) NOT NULL,
  `code` int(8) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_country_code`
--

INSERT INTO `tbl_country_code` (`id`, `code`, `is_active`, `is_deleted`) VALUES
(1, 1, 1, 0),
(2, 7, 1, 0),
(3, 20, 1, 0),
(4, 27, 1, 0),
(5, 30, 1, 0),
(6, 31, 1, 0),
(7, 32, 1, 0),
(8, 33, 1, 0),
(9, 34, 1, 0),
(10, 36, 1, 0),
(11, 39, 1, 0),
(12, 40, 1, 0),
(13, 41, 1, 0),
(14, 43, 1, 0),
(15, 44, 1, 0),
(16, 45, 1, 0),
(17, 46, 1, 0),
(18, 47, 1, 0),
(19, 48, 1, 0),
(20, 49, 1, 0),
(21, 51, 1, 0),
(22, 52, 1, 0),
(23, 53, 1, 0),
(24, 54, 1, 0),
(25, 55, 1, 0),
(26, 56, 1, 0),
(27, 57, 1, 0),
(28, 58, 1, 0),
(29, 60, 1, 0),
(30, 61, 1, 0),
(31, 62, 1, 0),
(32, 63, 1, 0),
(33, 64, 1, 0),
(34, 65, 1, 0),
(35, 66, 1, 0),
(36, 81, 1, 0),
(37, 82, 1, 0),
(38, 84, 1, 0),
(39, 86, 1, 0),
(40, 90, 1, 0),
(41, 91, 1, 0),
(42, 92, 1, 0),
(43, 93, 1, 0),
(44, 94, 1, 0),
(45, 95, 1, 0),
(46, 98, 1, 0),
(47, 211, 1, 0),
(48, 212, 1, 0),
(49, 213, 1, 0),
(50, 216, 1, 0),
(51, 218, 1, 0),
(52, 220, 1, 0),
(53, 221, 1, 0),
(54, 222, 1, 0),
(55, 223, 1, 0),
(56, 224, 1, 0),
(57, 225, 1, 0),
(58, 226, 1, 0),
(59, 227, 1, 0),
(60, 228, 1, 0),
(61, 229, 1, 0),
(62, 230, 1, 0),
(63, 231, 1, 0),
(64, 232, 1, 0),
(65, 233, 1, 0),
(66, 234, 1, 0),
(67, 235, 1, 0),
(68, 236, 1, 0),
(69, 237, 1, 0),
(70, 238, 1, 0),
(71, 239, 1, 0),
(72, 240, 1, 0),
(73, 241, 1, 0),
(74, 242, 1, 0),
(75, 243, 1, 0),
(76, 244, 1, 0),
(77, 245, 1, 0),
(78, 246, 1, 0),
(79, 247, 1, 0),
(80, 248, 1, 0),
(81, 249, 1, 0),
(82, 250, 1, 0),
(83, 251, 1, 0),
(84, 252, 1, 0),
(85, 253, 1, 0),
(86, 254, 1, 0),
(87, 255, 1, 0),
(88, 256, 1, 0),
(89, 257, 1, 0),
(90, 258, 1, 0),
(91, 260, 1, 0),
(92, 261, 1, 0),
(93, 262, 1, 0),
(94, 263, 1, 0),
(95, 264, 1, 0),
(96, 265, 1, 0),
(97, 266, 1, 0),
(98, 267, 1, 0),
(99, 268, 1, 0),
(100, 269, 1, 0),
(101, 290, 1, 0),
(102, 291, 1, 0),
(103, 297, 1, 0),
(104, 298, 1, 0),
(105, 299, 1, 0),
(106, 350, 1, 0),
(107, 351, 1, 0),
(108, 352, 1, 0),
(109, 353, 1, 0),
(110, 354, 1, 0),
(111, 355, 1, 0),
(112, 356, 1, 0),
(113, 357, 1, 0),
(114, 358, 1, 0),
(115, 359, 1, 0),
(116, 370, 1, 0),
(117, 371, 1, 0),
(118, 372, 1, 0),
(119, 373, 1, 0),
(120, 374, 1, 0),
(121, 375, 1, 0),
(122, 376, 1, 0),
(123, 377, 1, 0),
(124, 378, 1, 0),
(125, 379, 1, 0),
(126, 380, 1, 0),
(127, 381, 1, 0),
(128, 382, 1, 0),
(129, 383, 1, 0),
(130, 385, 1, 0),
(131, 386, 1, 0),
(132, 387, 1, 0),
(133, 389, 1, 0),
(134, 420, 1, 0),
(135, 421, 1, 0),
(136, 423, 1, 0),
(137, 500, 1, 0),
(138, 501, 1, 0),
(139, 502, 1, 0),
(140, 503, 1, 0),
(141, 504, 1, 0),
(142, 505, 1, 0),
(143, 506, 1, 0),
(144, 507, 1, 0),
(145, 508, 1, 0),
(146, 509, 1, 0),
(147, 590, 1, 0),
(148, 591, 1, 0),
(149, 592, 1, 0),
(150, 593, 1, 0),
(151, 594, 1, 0),
(152, 595, 1, 0),
(153, 596, 1, 0),
(154, 597, 1, 0),
(155, 598, 1, 0),
(156, 599, 1, 0),
(157, 670, 1, 0),
(158, 672, 1, 0),
(159, 673, 1, 0),
(160, 674, 1, 0),
(161, 675, 1, 0),
(162, 676, 1, 0),
(163, 677, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `order_number` varchar(64) NOT NULL,
  `total_quantity` int(8) NOT NULL,
  `sub_total` double(8,2) NOT NULL,
  `charge` double(8,2) NOT NULL,
  `grand_total` double(8,2) NOT NULL,
  `status` enum('pending','accept','reject') NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `user_id`, `order_number`, `total_quantity`, `sub_total`, `charge`, `grand_total`, `status`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(5, 3, 'ORDERBOOK1WESPTlzoZ', 4, 3500.00, 50.00, 3550.00, 'reject', 1, 0, '2024-05-29 13:03:12', '2024-05-30 09:14:08'),
(6, 4, 'ORDERBOOKB3UEsayHyv', 3, 1500.00, 50.00, 1550.00, 'pending', 1, 0, '2024-05-29 13:41:12', '2024-05-30 09:43:33'),
(7, 3, 'ORDERBOOK9CCBW07WQ2', 3, 3000.00, 50.00, 3050.00, 'accept', 1, 0, '2024-05-30 07:04:47', '2024-05-30 09:55:09'),
(8, 3, 'ORDERBOOKsYVmKDGC6o', 9, 3050.00, 50.00, 3100.00, 'pending', 1, 0, '2024-05-30 11:48:45', '2024-05-30 11:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_details`
--

CREATE TABLE `tbl_order_details` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `book_id` bigint(20) NOT NULL,
  `qnt` int(8) NOT NULL,
  `price` double(8,2) NOT NULL,
  `total` double(8,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_order_details`
--

INSERT INTO `tbl_order_details` (`id`, `order_id`, `book_id`, `qnt`, `price`, `total`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(5, 5, 1, 3, 1000.00, 3000.00, 1, 0, '2024-05-29 13:03:12', '2024-05-29 13:03:12'),
(6, 5, 2, 1, 500.00, 500.00, 1, 0, '2024-05-29 13:03:12', '2024-05-29 13:03:12'),
(7, 6, 2, 3, 500.00, 1500.00, 1, 0, '2024-05-29 13:41:12', '2024-05-29 13:41:12'),
(8, 7, 1, 3, 1000.00, 3000.00, 1, 0, '2024-05-30 07:04:47', '2024-05-30 07:04:47'),
(9, 8, 6, 2, 300.00, 600.00, 1, 0, '2024-05-30 11:48:45', '2024-05-30 11:48:45'),
(10, 8, 5, 2, 420.00, 840.00, 1, 0, '2024-05-30 11:48:45', '2024-05-30 11:48:45'),
(11, 8, 8, 5, 322.00, 1610.00, 1, 0, '2024-05-30 11:48:45', '2024-05-30 11:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(128) NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `country_code` varchar(8) NOT NULL,
  `mobile` varchar(16) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `token` varchar(128) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `name`, `username`, `email`, `country_code`, `mobile`, `password`, `role`, `token`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(2, 'divyesh lakhani', 'admin', 'divyesh@gmail.com', '91', '1234567897', '5403c84e72ea7fa4f8b7e281c98922cd', 'admin', 'LwK2t7IGDi', 1, 0, '2024-05-28 07:30:51', '2024-05-30 11:52:11'),
(3, 'vatsal patel', 'vatsal_12', 'vatsal@gmail.com', '91', '1234567898', '1f5b599b7292499fdfc0368fb6c3d671', 'user', 'w0gioEO7OX', 1, 0, '2024-05-29 07:05:13', '2024-05-30 11:46:00'),
(4, 'jay patel', 'jay_patel', 'jay@gmail.com', '91', '1234567896', '3a7e5d8cbfcf4e6b6813992512db00c4', 'user', 'Tqg841B9yH', 1, 0, '2024-05-29 13:39:14', '2024-05-29 13:39:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_book`
--
ALTER TABLE `tbl_book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `tbl_country_code`
--
ALTER TABLE `tbl_country_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_order_details`
--
ALTER TABLE `tbl_order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_book`
--
ALTER TABLE `tbl_book`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `tbl_country_code`
--
ALTER TABLE `tbl_country_code`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_order_details`
--
ALTER TABLE `tbl_order_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD CONSTRAINT `tbl_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `tbl_cart_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `tbl_book` (`id`);

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `tbl_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`);

--
-- Constraints for table `tbl_order_details`
--
ALTER TABLE `tbl_order_details`
  ADD CONSTRAINT `tbl_order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`id`),
  ADD CONSTRAINT `tbl_order_details_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `tbl_book` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
