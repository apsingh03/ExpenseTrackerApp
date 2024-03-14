-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2024 at 09:19 AM
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
-- Database: `expensetrackerdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `catName` varchar(255) NOT NULL,
  `budget` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `catName`, `budget`, `createdAt`, `updatedAt`) VALUES
(2, 'Petrol', 4600, '2024-03-10 06:12:39', '2024-03-10 06:14:10'),
(3, 'Movies', 6000, '2024-03-13 14:47:05', '2024-03-13 14:47:05'),
(4, 'Food', 800, '2024-03-13 14:47:18', '2024-03-13 14:47:18');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `money`, `description`, `date`, `createdAt`, `updatedAt`, `user_id`, `cat_id`) VALUES
(1, 3072, 'Major depressv disord, single epsd, sev w/o psych features', '2023-05-23 22:01:26', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(2, 2555, 'Pnctr w fb of left great toe w/o damage to nail, init', '2023-06-10 15:44:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(3, 2605, 'Laceration of superficial palmar arch of right hand', '2023-10-07 18:26:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(4, 2619, 'Other specified disorders of cartilage', '2023-02-08 08:51:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(5, 1935, 'Hemarthrosis, shoulder', '2023-07-03 16:31:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(6, 2863, 'Drug/chem diabetes w oth diabetic ophthalmic complication', '2023-04-24 06:47:36', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(7, 1399, 'Pathological fracture, unspecified site', '2023-01-14 15:46:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(8, 3666, 'Agoraphobia without panic disorder', '2023-06-05 11:17:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(9, 2180, 'Malignant neoplasm of upper-inner quadrant of breast, male', '2023-12-17 04:05:34', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(10, 3734, 'Poisoning by oth antidepressants, accidental, sequela', '2023-06-26 05:19:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(11, 1767, 'Immersion hand, unspecified hand, sequela', '2024-01-09 11:50:58', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(12, 1282, 'Other synovitis and tenosynovitis, unspecified forearm', '2023-09-14 02:05:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(13, 2728, 'Spontaneous rupture of unspecified tendon', '2023-11-17 19:55:30', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(14, 1241, 'Gonococcal infection of kidney and ureter', '2023-12-09 05:43:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(15, 3518, 'Nondisp fx of base of nk of l femr, 7thH', '2023-02-01 01:41:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(16, 1219, 'Transverse fracture of shaft of humerus', '2023-01-17 11:48:39', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(17, 3130, 'Unsp open wound of l mid finger w/o damage to nail, init', '2023-03-03 20:20:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(18, 3849, 'Poisoning by intravenous anesthetics, undetermined, subs', '2023-05-28 17:18:02', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(19, 1806, 'Laceration without foreign body, left foot, sequela', '2023-11-07 20:41:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(20, 3583, 'Oth fx shaft of right tibia, init for opn fx type 3A/B/C', '2023-04-26 19:11:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(21, 1995, 'Chronic venous hypertension w/o comp of bilateral low extrm', '2023-02-04 05:48:36', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(22, 3887, 'Bus as the place of occurrence of the external cause', '2023-12-20 06:21:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(23, 1942, 'Maternal care for viable fetus in abd preg, third tri, oth', '2023-01-15 14:57:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(24, 2881, 'Other juvenile osteochondrosis of hip and pelvis, left leg', '2023-01-30 14:45:33', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(25, 2673, 'Contact with nonvenomous frogs, sequela', '2024-01-12 02:50:52', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(26, 3034, 'Hemiplga fol ntrm intcrbl hemor aff right dominant side', '2023-01-16 18:44:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(27, 1669, 'Non-ABO incompat react d/t tranfs of bld/bld prod,unsp, sqla', '2023-04-08 15:32:16', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(28, 3465, 'Oth dis of bld/bld-form org/immun mechnsm comp preg, 3rd tri', '2024-02-24 03:00:46', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(29, 1232, 'Open wound of lower back and pelvis', '2023-06-24 01:27:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(30, 2126, 'Puncture wound w/o foreign body, unsp lower leg, subs encntr', '2023-01-09 00:53:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(31, 1623, 'Pnctr w fb of unsp great toe w/o damage to nail, init', '2023-08-04 15:04:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(32, 3196, 'Complete traumatic amp of l low leg, level unsp, sequela', '2023-06-25 16:38:05', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(33, 1331, 'Laceration of body of pancreas, unspecified degree, sequela', '2023-07-08 03:21:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(34, 2486, 'Mallet finger of unspecified finger(s)', '2023-08-18 23:18:26', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(35, 1956, 'Underdosing of primarily systemic and hematolog agents, subs', '2023-02-06 21:42:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(36, 1870, 'Peroneal tendinitis, unspecified leg', '2023-07-15 08:03:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(37, 3078, 'Benign carcinoid tumors', '2023-03-25 21:22:17', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(38, 2192, 'Corrosion of second degree of trunk, unsp site, init encntr', '2023-01-15 22:19:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(39, 2241, 'Benign neoplasm of other and unsp parts of small intestine', '2023-03-29 15:19:33', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(40, 2775, 'Pedl cyc pasngr inj in clsn w statnry object nontraf, subs', '2023-07-09 23:55:53', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(41, 3315, 'Unsp fx l low leg, subs for opn fx type 3A/B/C w nonunion', '2024-01-10 09:21:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(42, 2105, 'Sltr-haris Type III physl fx lower end humer, left arm, 7thK', '2023-05-14 10:34:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(43, 2305, 'Unsp fx low end unsp ulna, 7thR', '2024-01-14 02:54:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(44, 1464, 'Secondary carcinoid tumors of bone', '2023-12-24 04:53:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(45, 2484, 'Injury of sciatic nerve at hip and thigh level, unsp leg', '2023-04-13 15:12:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(46, 2672, 'Puncture wound with foreign body, unspecified lower leg', '2023-03-23 19:33:24', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(47, 1627, 'Unspecified injury of unspecified thigh, sequela', '2023-09-18 06:59:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(48, 3030, 'Struck by falling object on merchant ship', '2023-08-25 17:04:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(49, 1746, 'Oth fx of lower end r radius, subs for clos fx w delay heal', '2023-02-14 19:42:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(50, 3362, 'Fam hx of congen malform, deformations and chromsoml abnlt', '2023-03-22 00:23:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(51, 3078, 'Nondisp fx of less trochanter of l femr, 7thN', '2023-01-25 04:07:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(52, 3975, 'Complete traumatic amp at knee level, unsp low leg, sequela', '2023-04-24 07:48:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(53, 1606, 'Nondisp fx of low epiphy (separation) of r femr, 7thP', '2023-05-23 11:54:05', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(54, 1356, 'Superficial foreign body of breast, left breast, sequela', '2024-01-03 01:06:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(55, 3958, 'Other rosacea', '2024-02-01 22:44:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(56, 3458, 'Person outsd bus inj pk-up truck, pk-up/van in traf, sequela', '2023-07-04 11:43:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(57, 2679, 'Congenital malformations of corpus callosum', '2023-12-31 06:54:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(58, 3169, 'Disp fx of greater trochanter of unsp femr, 7thG', '2023-04-14 21:47:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(59, 1815, 'Exposure to infrared radiation', '2023-03-27 18:54:58', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(60, 3715, 'Pedl cyc passenger injured in clsn w oth and unsp mv in traf', '2023-09-18 18:39:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(61, 1607, 'Influenza due to unidentified influenza virus w oth manifest', '2023-09-29 08:28:11', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(62, 1351, 'Contact with hot food, subsequent encounter', '2023-02-02 07:33:51', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(63, 2389, 'Superficial foreign body, right knee, initial encounter', '2023-05-26 22:08:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(64, 3600, 'Insect bite (nonvenomous) of other finger', '2023-10-03 20:50:53', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(65, 2413, 'Idiopathic chronic gout, knee', '2023-04-03 20:52:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(66, 2602, 'Disp fx of lateral malleolus of unsp fibula, 7thR', '2023-01-30 22:26:37', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(67, 2958, 'Displ commnt fx shaft of rad, r arm, 7thR', '2024-03-06 20:58:49', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(68, 2403, 'Lac w fb of abd wall, right lower q w penet perit cav, sqla', '2023-02-25 01:30:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(69, 1300, 'Pigmentary glaucoma, right eye, indeterminate stage', '2024-03-04 10:42:47', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(70, 1775, 'Inj oth blood vessels at wrist and hand level of left arm', '2023-11-14 13:17:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(71, 2042, 'Nondisp transverse fx r patella, 7thG', '2024-02-28 00:18:56', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(72, 3252, 'Oth exposure to uncontrolled fire, not in bldg', '2023-08-27 02:30:09', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(73, 1469, 'Laceration of musc/fasc/tend lower back, sequela', '2023-03-31 15:10:33', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(74, 1921, 'Sltr-haris Type IV physl fx lower end humer, right arm, sqla', '2023-11-09 10:31:58', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(75, 1974, 'Other specified spondylopathies, cervical region', '2023-12-05 00:49:21', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(76, 2489, 'Erectile dysfunction following radical prostatectomy', '2023-05-17 13:55:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(77, 3220, 'Displ bicondylar fx unsp tibia, 7thE', '2023-12-27 02:00:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(78, 1745, 'Puncture wound with foreign body of trachea, init encntr', '2023-08-06 07:18:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(79, 3114, 'Oth fracture of first metacarpal bone, unsp hand, init', '2023-01-27 13:31:17', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(80, 3903, 'Acquired atrophy of right fallopian tube', '2023-04-10 15:19:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(81, 2704, 'Unsp injury of posterior tibial artery, right leg, sequela', '2023-10-12 20:08:59', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(82, 2611, 'Aspirat pneumonitis due to anesth during preg, third tri', '2023-01-08 22:38:47', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(83, 3375, 'Superficial foreign body of right upper arm, subs encntr', '2023-01-17 16:10:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(84, 1289, 'Displ apophyseal fx r femur, subs for clos fx w delay heal', '2024-02-08 04:59:35', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(85, 1906, 'Path fx in neopltc disease, l ulna, subs for fx w routn heal', '2023-08-16 14:47:36', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(86, 1280, 'Facial weakness following nontraumatic intcrbl hemorrhage', '2023-09-25 03:11:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(87, 1281, 'Type I occipital condyle fracture, right side, 7thK', '2023-06-18 07:18:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(88, 1258, 'Injury of ulnar nerve at forearm level, right arm, sequela', '2024-01-04 07:37:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(89, 2016, 'Sltr-haris Type III physl fx low end rad, unsp arm, 7thP', '2023-06-13 04:17:32', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(90, 2701, 'Nondisp spiral fx shaft of rad, r arm, 7thF', '2023-04-26 12:49:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(91, 2499, 'Driver of pk-up/van injured in clsn w hv veh in traf, subs', '2023-09-15 04:09:45', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(92, 3443, 'Inj oth blood vessels at forearm level, left arm, init', '2023-04-11 12:46:02', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(93, 3298, 'Pathological fracture in neoplastic disease, left fibula', '2023-02-02 05:11:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(94, 3554, 'Unspecified injury to sacral spinal cord, sequela', '2023-10-06 06:17:14', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(95, 1311, 'Abscess of tendon sheath, unspecified ankle and foot', '2023-12-07 11:53:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(96, 3847, 'Other congenital malformations of hair', '2023-07-30 18:54:26', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(97, 3737, 'Trichodermal cyst', '2023-06-01 19:42:08', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(98, 1462, 'Ototoxic hearing loss, unspecified ear', '2024-01-29 17:02:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(99, 3692, 'Path fx in neopltc dis, unsp site, subs for fx w delay heal', '2023-08-09 23:28:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(100, 3246, 'Type 1 diab with severe nonp rtnop with macular edema, unsp', '2023-10-04 15:37:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(101, 2569, 'Hemorrhage due to internal orthopedic prosth dev/grft, init', '2024-03-08 17:52:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(102, 1978, 'Unspecified injury of unspecified lower leg, init encntr', '2024-03-04 22:22:43', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(103, 2076, 'Assault by hunting rifle, initial encounter', '2024-03-09 23:33:06', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(104, 2947, 'Arcus senilis, left eye', '2024-03-11 08:27:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(105, 2368, 'Strain of muscle and tendon of head, subsequent encounter', '2024-03-04 07:32:16', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(106, 2277, 'Other specified injury of unspecified renal vein, sequela', '2024-03-07 01:43:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(107, 2672, 'Cerebral infarction due to thrombosis of left cereblr artery', '2024-03-04 08:33:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(108, 3098, 'Injury of bladder', '2024-03-05 22:47:19', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(109, 1241, 'Walked into lamppost', '2024-03-02 15:31:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(110, 3781, 'Unsp opn wnd abd wall, r upper q w/o penet perit cav, subs', '2024-03-04 17:08:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(111, 1443, 'Adverse effect of other antidepressants, subs encntr', '2024-03-04 03:09:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(112, 3498, 'Unsp injury of unsp blood vessel at shldr/up arm', '2024-03-10 21:49:53', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(113, 2396, 'Age-rel osteopor w crnt path fx, verteb, 7thK', '2024-03-07 02:56:57', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(114, 1517, 'Other displaced fracture of lower end of unspecified humerus', '2024-03-03 06:12:27', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(115, 3367, 'Driver of pk-up/van inj in clsn w oth mv nontraf, sequela', '2024-03-08 16:00:07', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(116, 3878, 'Dislocation of T12/L1 thoracic vertebra, initial encounter', '2024-03-06 07:43:58', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(117, 2161, 'Encounter for gynecological examination', '2024-03-02 20:22:24', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(118, 2984, 'Unsp injury of blood vessel of unspecified thumb, sequela', '2024-03-10 03:13:30', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(119, 2358, 'Other osteonecrosis, left shoulder', '2024-03-05 13:47:18', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(120, 1883, 'Drown after fall into bathtub, undetermined intent, init', '2024-03-10 22:39:31', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(121, 3337, 'Person injured in collision betw car and 2/3-whl pwr veh', '2024-03-05 19:45:50', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(122, 1433, 'Pnctr w/o foreign body of l idx fngr w damage to nail, init', '2024-03-03 05:53:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(123, 2308, 'Fall from non-moving motorized mobility scooter, init encntr', '2024-03-02 13:14:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(124, 3568, 'Passenger injured in collision w unsp mv nontraf, sequela', '2024-03-06 21:02:23', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(125, 3682, 'Burn of unspecified degree of unspecified wrist, subs encntr', '2024-03-04 20:34:17', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(126, 1385, 'Toxic effect of contact w venomous toad, self-harm, subs', '2024-03-06 23:58:46', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(127, 1313, 'Sixth [abducent] nerve palsy, unspecified eye', '2024-03-06 20:23:15', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(128, 3053, 'Inj femoral vein at hip and thigh level, left leg, sequela', '2024-03-06 06:19:26', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(129, 1491, 'Laceration of dorsal vein of unspecified foot, init encntr', '2024-03-04 14:26:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2),
(130, 1828, 'Lacrimal cyst', '2024-03-07 10:29:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `filedownloads`
--

CREATE TABLE `filedownloads` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `filedownloads`
--

INSERT INTO `filedownloads` (`id`, `url`, `createdAt`, `updatedAt`, `user_id`) VALUES
(16, 'https://expenserackerplatform.s3.amazonaws.com/expense1/Mon%20Mar%2011%202024%2019%3A04%3A54%20GMT%2B0530%20%28India%20Standard%20Time%29/.txt', '2024-03-11 13:34:57', '2024-03-11 13:34:57', 1),
(17, 'https://expenserackerplatform.s3.amazonaws.com/expense1/Tue%20Mar%2012%202024%2017%3A14%3A18%20GMT%2B0530%20%28India%20Standard%20Time%29/.txt', '2024-03-12 11:44:22', '2024-03-12 11:44:22', 1),
(18, 'https://expenserackerplatform.s3.amazonaws.com/expense1/Tue%20Mar%2012%202024%2017%3A15%3A40%20GMT%2B0530%20%28India%20Standard%20Time%29/.txt', '2024-03-12 11:45:44', '2024-03-12 11:45:44', 1),
(19, 'https://expenserackerplatform.s3.amazonaws.com/expense1/Tue%20Mar%2012%202024%2017%3A16%3A19%20GMT%2B0530%20%28India%20Standard%20Time%29/.txt', '2024-03-12 11:46:22', '2024-03-12 11:46:22', 1),
(20, 'https://expenserackerplatform.s3.amazonaws.com/expense1/Tue%20Mar%2012%202024%2017%3A16%3A49%20GMT%2B0530%20%28India%20Standard%20Time%29/.txt', '2024-03-12 11:46:52', '2024-03-12 11:46:52', 1),
(21, 'https://expenserackerplatform.s3.amazonaws.com/expense1/Tue%20Mar%2012%202024%2017%3A18%3A01%20GMT%2B0530%20%28India%20Standard%20Time%29/.txt', '2024-03-12 11:48:04', '2024-03-12 11:48:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `forgotpasswords`
--

CREATE TABLE `forgotpasswords` (
  `id` int(11) NOT NULL,
  `requestId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `expiryby` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forgotpasswords`
--

INSERT INTO `forgotpasswords` (`id`, `requestId`, `isActive`, `expiryby`, `createdAt`, `updatedAt`, `user_id`) VALUES
(23, '5d73df92-5504-43aa-bcba-2bd6d83b7ba9', 0, '2024-03-13 08:50:28', '2024-03-13 07:50:28', '2024-03-13 08:41:26', 1),
(24, '97834852-4d26-4b0e-8ca6-13c89d639f3d', 0, '2024-03-13 09:46:21', '2024-03-13 08:46:21', '2024-03-13 08:46:50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `paymentid` varchar(255) DEFAULT NULL,
  `orderid` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `paymentid`, `orderid`, `status`, `createdAt`, `updatedAt`, `user_id`) VALUES
(1, 'pay_Nkf3sUZcjE49Jx', 'order_Nkf3YdQa6Aia2X', 'SUCCESSFUL', '2024-03-10 13:00:23', '2024-03-10 13:00:52', 1),
(2, 'pay_NlwFe9tf7iSXxf', 'order_NlwFTmPd1pMARW', 'SUCCESSFUL', '2024-03-13 18:28:26', '2024-03-13 18:28:46', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isPremiumuser` tinyint(1) DEFAULT 0,
  `totalExpense` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `isPremiumuser`, `totalExpense`, `createdAt`, `updatedAt`) VALUES
(1, 'Ajay Pratap', 'ankupran@gmail.com', '$2b$10$k/ik12O5VAwXmztMErNkTO5kibSkNj.LiQb20cRT6JcuSonxuMfqi', 1, -7903, '2024-03-10 06:10:46', '2024-03-13 18:28:46'),
(2, 'pranav sinha', 'pranav@gmail.com', '$2b$10$BOgzvOiX5zfBsFPvnvQ8r.aZCVRoX3xR8P7SEVKb0eTsVRNoHO/PW', 0, 0, '2024-03-10 06:11:07', '2024-03-10 06:11:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `filedownloads`
--
ALTER TABLE `filedownloads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `filedownloads`
--
ALTER TABLE `filedownloads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `filedownloads`
--
ALTER TABLE `filedownloads`
  ADD CONSTRAINT `filedownloads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `forgotpasswords`
--
ALTER TABLE `forgotpasswords`
  ADD CONSTRAINT `forgotpasswords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
