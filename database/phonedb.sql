-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: phoneshop4
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `adminname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`adminname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'kongming','kongming@gmail.com','$2b$10$7DCl83kNmkL4rQgk56Opou16KkLXj2i8lei/KN6gBHVynsSb9P/he','2024-11-12 15:56:43'),(2,'kongming123','kongming123@gmail.com','$2b$10$YVFHgtm.K0A0Jrk4mHPdQe2Tz1/bwSVg9cSTmqQrZRo2yzand22ra','2025-01-09 05:58:13'),(3,'kongming99','kongming99@gmail.com','$2b$10$jCElMpmB5HTViKAmsWPjoeYH.FynNzU2lb8sjaTXYVllIkVf3qmf2','2025-01-14 15:25:03');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`brand_id`),
  UNIQUE KEY `name` (`brand_name`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (10,'Apple','1736223652817-apple-brand-logo.webp'),(11,'Samsung','1736226479890-Samsung_Logo.png'),(12,'Honor','1737057653576-Honor-Logo.jpg'),(13,'Tecno','1737057664304-tecno_logo.png'),(14,'Asus','1737057671452-Asus-Logo.png'),(15,'Nokia','1737057678478-nokia_logo.jpg'),(16,'Sony','1737057685939-sony_logo.gif'),(17,'Oppo','1737057694650-oppo_logo.png'),(19,'Vivo','1737057736622-vivo_logo.png'),(20,'Xiaomi','1737058268287-Xiaomi_logo.png'),(21,'Huawei','1737058284913-Huawei.jpg'),(22,'Google','1737058294315-google.webp'),(23,'OnePlus','1737058303208-OnePlus-new-logo-2020.webp'),(24,'HMD','1737058315490-HMD_Global_logo_2024.png'),(25,'Infinix','1737058324359-Infinix.jpg'),(26,'Nothing','1737058334180-Nothing.jpg'),(27,'ZTE','1737058345202-ZTE-Logo.jpg'),(28,'Microsoft','1737058356380-microsoft-logo.webp'),(29,'Motorola','1737058375397-motorola-new7974.jpg'),(30,'Lenovo','1737058383937-Lenovo_Corporate_Logo.png'),(31,'Garmin','1737058392537-Garmin.png'),(32,'Hohem','1737058399348-Hohem.png'),(33,'Coros','1737058406046-Coros.png'),(34,'Havit','1737058418138-Havit-logo.jpg'),(35,'Chipolo','1737058424133-Chipolo_logo.png'),(37,'Bietrun','1737058442173-Bietrun.png'),(38,'FDuce','1737058450133-FDuce.png'),(39,'JBL','1737058461145-JBL.png'),(40,'Hikvision','1737058465755-Hikvision-Logo.png'),(41,'Mirfak Audio','1737058553119-Mirfak_Audio.png');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (42,'Accessories'),(40,'Headphones'),(37,'Laptops'),(33,'Smartphones'),(39,'Smartwatches'),(41,'Speakers'),(38,'Tablets');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'kongming','kongming@gmail.com','$2b$10$MJZNa8oEqUy4YQ6SyezaAOpwrbumZARjSYBZYuz8WDA52fpjCrzqW','2024-11-12 16:54:23'),(2,'kongming44','kongming44@gmail.com','$2b$10$BllV8HLp.9EvGT/3y5di6eX4exslpUXMovwFnl3TDRUIFr07j97Qm','2024-12-18 15:27:18');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `spec_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `spec_fk_idx` (`spec_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `spec_fk` FOREIGN KEY (`spec_id`) REFERENCES `specifications` (`spec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=236 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (234,55,159,1,609.00),(235,55,179,1,370.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `order_items_BEFORE_INSERT` BEFORE INSERT ON `order_items` FOR EACH ROW BEGIN
    -- Ensure that the price exists for the given spec_id
    DECLARE spec_price DECIMAL(10, 2);

    SELECT price INTO spec_price
    FROM specifications
    WHERE spec_id = NEW.spec_id
    LIMIT 1;

    -- Calculate the amount based on the price and quantity
    SET NEW.amount = spec_price * NEW.quantity;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `order_items_AFTER_INSERT` AFTER INSERT ON `order_items` FOR EACH ROW BEGIN
	UPDATE orders
    SET total_amount = COALESCE(total_amount, 0) + (NEW.amount)
    WHERE order_id = NEW.order_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_order_total_after_order_items_update` AFTER UPDATE ON `order_items` FOR EACH ROW BEGIN
    -- Adjust the total_amount in the orders table based on the updated order_item amount
    UPDATE orders
    SET total_amount = COALESCE(total_amount, 0) + (NEW.amount - OLD.amount)
    WHERE order_id = NEW.order_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_order_total_after_delete` AFTER DELETE ON `order_items` FOR EACH ROW BEGIN
    -- Subtract the amount of the deleted item from the total_amount
    UPDATE orders
    SET total_amount = total_amount - OLD.amount
    WHERE order_id = OLD.order_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` enum('Pending','Completed','Cancelled') DEFAULT 'Pending',
  `delivery` enum('Pick up','Delivery') DEFAULT 'Delivery',
  `payment` enum('Paid','By Delivery') DEFAULT 'Paid',
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (51,1,'2025-01-14 07:21:48',0.00,'Pending','Delivery','By Delivery','asdfasdf'),(52,1,'2025-01-14 16:17:21',0.00,'Pending','Pick up','Paid','123123123'),(53,1,'2025-01-15 15:36:48',0.00,'Pending','Delivery','By Delivery','Phnom Penh'),(54,1,'2025-01-17 17:35:22',0.00,'Pending','Delivery','Paid','123123'),(55,1,'2025-01-17 18:28:12',979.00,'Pending','Delivery','Paid','123');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_variants`
--

DROP TABLE IF EXISTS `phone_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_variants` (
  `idphone_variants` int NOT NULL AUTO_INCREMENT,
  `phone_id` int NOT NULL,
  `color` varchar(45) NOT NULL,
  `stock` int DEFAULT '0',
  PRIMARY KEY (`idphone_variants`),
  KEY `phone_fk_idx` (`phone_id`),
  CONSTRAINT `phone_fk` FOREIGN KEY (`phone_id`) REFERENCES `phones` (`phone_id`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_variants`
--

LOCK TABLES `phone_variants` WRITE;
/*!40000 ALTER TABLE `phone_variants` DISABLE KEYS */;
INSERT INTO `phone_variants` VALUES (187,146,'#70a3cc',25),(188,147,'#ffeacc',45),(189,148,'#323232',30),(191,150,'#121212',25),(203,169,'#6f8279',15),(204,170,'#edeae0',15),(205,171,'#1d1d21',25),(206,172,'',15),(207,173,'#000000',50),(208,174,'#c0c0c0',45),(209,175,'#0000ff',55),(210,176,'',45),(213,177,'#ffd700',55),(214,177,'#000000',45),(215,178,'',45),(216,179,'',100),(217,180,'#008000',250),(218,181,'',155),(219,182,'',45),(220,183,'',55),(221,184,'#e6e6e6',120);
/*!40000 ALTER TABLE `phone_variants` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `phone_variants_BEFORE_INSERT` BEFORE INSERT ON `phone_variants` FOR EACH ROW BEGIN
	UPDATE phones p
    SET p.stock = p.stock + NEW.stock
    WHERE p.phone_id = NEW.phone_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `phone_variants_BEFORE_UPDATE` BEFORE UPDATE ON `phone_variants` FOR EACH ROW BEGIN
	UPDATE phones p
    SET p.stock = p.stock + NEW.stock - OLD.stock
    WHERE p.phone_id = OLD.phone_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `phone_variants_BEFORE_DELETE` BEFORE DELETE ON `phone_variants` FOR EACH ROW BEGIN
	UPDATE phones p
    SET p.stock = p.stock - OLD.stock
    WHERE p.phone_id = OLD.phone_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `phones`
--

DROP TABLE IF EXISTS `phones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phones` (
  `phone_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `category_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `stock` int DEFAULT '0',
  `release_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`phone_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `phones_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL,
  CONSTRAINT `phones_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phones`
--

LOCK TABLES `phones` WRITE;
/*!40000 ALTER TABLE `phones` DISABLE KEYS */;
INSERT INTO `phones` VALUES (146,'iPhone 13 Pro','Excellent camera performance and a ProMotion display.',33,10,25,'2021-09-24','2025-01-07 04:41:42'),(147,'iPhone 13 Mini	','	Compact and powerful with the same performance as the iPhone 13.',33,10,45,'2021-09-24','2025-01-07 04:49:36'),(148,'iPhone 12 Pro Max','Excellent camera system and 5G connectivity for faster speeds.',33,10,30,'2020-11-13','2025-01-07 04:54:15'),(150,'Samsung Galaxy S23 Ultra','A flagship device with a dynamic AMOLED 2X display, S Pen, and a 200 MP main camera for stunning photography.',33,11,25,'2023-02-17','2025-01-07 05:11:10'),(169,'Asus ZenBook 14 OLED','Lightweight laptop with OLED display, suitable for work and entertainment.',37,14,15,'2024-01-15','2025-01-16 20:36:24'),(170,'Asus ROG Zephyrus G14','High-performance gaming laptop with NVIDIA RTX graphics and Ryzen 9 processor.',37,14,15,'2024-02-10','2025-01-16 20:38:10'),(171,'Asus VivoBook 15','	Budget-friendly laptop for everyday use with ample storage.',37,14,25,'2023-12-01','2025-01-16 20:41:01'),(172,'Asus ROG Strix Scar 17','High-end gaming laptop with advanced cooling and large screen.',37,14,15,'2024-02-05','2025-01-16 20:42:56'),(173,'Galaxy Watch 6','Latest Samsung smartwatch with health tracking, GPS, and LTE connectivity.',39,11,50,'2024-09-10','2025-01-17 15:28:22'),(174,'Apple Watch SE 3','Affordable Apple smartwatch with essential features for fitness and notifications.',39,10,45,'2024-11-01','2025-01-17 15:31:18'),(175,'Garmin Venu 3','Health and fitness-focused smartwatch with advanced sleep tracking and heart rate monitoring.',39,31,55,'2024-07-15','2025-01-17 15:34:51'),(176,'Huawei Watch GT 4','High-performance smartwatch with long battery life and AMOLED display.',39,21,45,'2024-10-25','2025-01-17 15:36:39'),(177,'Oppo Watch 3 Pro','Premium smartwatch with AMOLED curved display and eSIM support.',39,17,100,'2024-12-01','2025-01-17 15:49:04'),(178,'Wireless Charger','Fast wireless charger compatible with most smartphones.',42,11,45,'2024-02-15','2025-01-17 15:57:24'),(179,'Bluetooth Earbuds','High-quality Bluetooth earbuds with noise cancellation.',42,39,100,'2024-03-05','2025-01-17 15:58:59'),(180,'Smartwatch Strap','	Adjustable silicone strap for Apple Watch.',42,10,250,'2024-12-05','2025-01-17 16:00:56'),(181,'Lenovo Tab M10','Lightweight tablet',38,30,155,'2023-01-25','2025-01-17 16:07:28'),(182,'Lenovo Yoga Tab 11','Versatile tablet',38,30,45,'2023-02-18','2025-01-17 16:10:37'),(183,'Infinix XE21 Earbuds','Wireless earbuds with ANC',42,25,55,'2023-08-10','2025-01-17 16:15:11'),(184,'Huawei FreeBuds Pro 2','Premium wireless earbuds',42,21,120,'2023-07-12','2025-01-17 16:18:38');
/*!40000 ALTER TABLE `phones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimage`
--

DROP TABLE IF EXISTS `productimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_variant_id` int NOT NULL,
  `image` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `phone_variants_fk_idx` (`phone_variant_id`),
  CONSTRAINT `phone_variants_fk` FOREIGN KEY (`phone_variant_id`) REFERENCES `phone_variants` (`idphone_variants`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimage`
--

LOCK TABLES `productimage` WRITE;
/*!40000 ALTER TABLE `productimage` DISABLE KEYS */;
INSERT INTO `productimage` VALUES (381,187,'1736224902426-13ProMaxSierraBlue.avif'),(382,188,'1736225376339-iPhone-13-Mini-128GB-Starlight.webp'),(383,189,'1736225655435-12pm-Graphite.jpg'),(385,191,'1736226670376-S23-ultra-PhantomBlack.webp'),(396,203,'1737059784896-Asus_ZenBook_14_OLED.png'),(397,204,'1737059890177-Asus_ROG_Zephyrus_G14.jpeg'),(398,205,'1737060061274-Asus_VivoBook_15.jpg'),(399,206,'1737060176587-Asus_ROG_Strix_Scar_17.jpg'),(400,207,'1737127702207-31l5fWDD-eL._SL500_.jpg'),(401,208,'1737127878478-apple_watch_se_gps_silver_aluminum_storm_blue_sport_band_pdp_image_2023_position-1__en-me_1.jpg'),(402,209,'1737128091884-gar-20mm-022_5b4079a4-5152-4b06-96b4-9573143d13e9.webp'),(403,210,'1737128199542-s-l1200.jpg'),(406,213,'1737128944332-White_background-1_1024x1024.webp'),(407,214,'1737129001816-Oppo3_Black.png'),(408,215,'1737129444710-59722964583d6833_belkin-WIZ029myBK-Magnetic-Foldable-Charger-webgallery-hero01-v01-uk.webp'),(409,216,'1737129539797-71exNLc-CnL.jpg'),(410,217,'1737129656425-GREEN-opt_cf2bf63b-67fd-4150-9636-27260f068e7d_grande.webp'),(411,218,'1737130048798-Tab_M10_3rd_Gen_OverViewPic.avif'),(412,219,'1737130237260-amk8pdtzb75ly0d8hnvguj9owfocke014631.webp'),(413,220,'1737130511346-d05f2d260aa0dd1230359732c38a44f5baf9c0f1ecbbe13cbce6aa9363808bec.webp'),(414,221,'1737130718628-silver-blue.png');
/*!40000 ALTER TABLE `productimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promo_id` int NOT NULL AUTO_INCREMENT,
  `spec_id` int NOT NULL,
  `promo_name` varchar(50) NOT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('Active','Expired') DEFAULT 'Active',
  PRIMARY KEY (`promo_id`),
  KEY `spec_fk_idx` (`spec_id`),
  CONSTRAINT `spec_id_fk_promotion` FOREIGN KEY (`spec_id`) REFERENCES `specifications` (`spec_id`),
  CONSTRAINT `promotions_chk_1` CHECK ((`discount_percentage` between 0 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (109,160,'20',20.00,'2025-01-01','2025-02-02','Active'),(110,159,'11',30.00,'2025-01-01','2025-02-02','Active'),(114,171,'asdf',11.00,'2025-01-18','2025-01-31','Active');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specifications`
--

DROP TABLE IF EXISTS `specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specifications` (
  `spec_id` int NOT NULL AUTO_INCREMENT,
  `phone_variant_id` int NOT NULL,
  `screen_size` varchar(50) DEFAULT NULL,
  `processor` varchar(50) DEFAULT NULL,
  `ram` varchar(20) DEFAULT NULL,
  `storage` varchar(20) DEFAULT NULL,
  `battery` varchar(20) DEFAULT NULL,
  `camera` varchar(100) DEFAULT NULL,
  `Price` decimal(7,2) DEFAULT NULL,
  `stock` int DEFAULT '0',
  PRIMARY KEY (`spec_id`),
  KEY `phone_variants_fk_idx` (`phone_variant_id`),
  CONSTRAINT `varaints_fk` FOREIGN KEY (`phone_variant_id`) REFERENCES `phone_variants` (`idphone_variants`)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specifications`
--

LOCK TABLES `specifications` WRITE;
/*!40000 ALTER TABLE `specifications` DISABLE KEYS */;
INSERT INTO `specifications` VALUES (159,187,'6.1 inches','A15 Bionic','6GB','128GB','3095mAh','12MP Wide, 12MP Telephoto, 12MP Ultra-wide',609.00,0),(160,188,'5.4 inches','A15 Bionic','4GB','128GB','2438mAh	','12MP Wide, 12MP Ultra-wide',577.00,0),(161,189,'6.7 inches','A14 Bionic','6GB','128GB','3687mAh','12MP Wide, 12MP Telephoto, 12MP Ultra-wide',888.00,0),(163,191,'6.8 inches','Snapdragon 8 Gen 2','12 GB','512 GB','5000 mAh','Quad-camera system: 200 MP + 12 MP + 10 MP + 10 MP',488.00,0),(171,203,'14\"','Intel Core i7-12700H','16GB','512GB SSD','75Wh','	720p HD Webcam',999.00,15),(172,204,'14\"','AMD Ryzen 9 6900HS','16GB','1TB SSD','76Wh','720p HD Webcam',1899.00,15),(173,205,'15.6\"','	Intel Core i5-1235U','8GB','256GB SSD','42Wh','720p HD Webcam',499.00,25),(174,206,'17.3\"','	AMD Ryzen 9 7945HX','32GB','2TB SSD','90Wh','720p HD Webcam',2499.00,15),(175,207,'1.5\"','Exynos W930','2GB','16GB','40 hours','No camera',350.00,50),(176,208,'1.57\"','	Apple S8','1GB','	32GB','36 hours','No camera',250.00,45),(177,209,'	1.3\"','	Garmin Chipset','1GB','8GB','50 hours','No camera',450.00,55),(178,210,'1.43\"','Kirin A1','2GB','	16GB','48 hours','No camera',270.00,45),(179,213,'1.91\"','Snapdragon W5 Gen 1','2GB','	32GB','48 hours','No camera',370.00,55),(180,215,'N/A','N/A','N/A','N/A','N/A','N/A',50.00,45),(181,216,'N/A','N/A','N/A','N/A','	6 hours','N/A',120.00,100),(182,217,'N/A','N/A','N/A','N/A','N/A','N/A',35.00,250),(183,218,'	10.1\"','MediaTek Helio','4 GB','64 GB','7000 mAh','8MP single',199.99,155),(184,219,'11\"','Snapdragon 662','6 GB','128 GB','7500 mAh','13MP single',329.99,45),(185,220,'N/A','All Bluetooth devices','N/A','N/A','20-hour battery life','N/A',39.00,55),(186,221,'N/A','ANC, dual-driver system','N/A','N/A','6 hours','N/A',149.00,120);
/*!40000 ALTER TABLE `specifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `specifications_BEFORE_INSERT` BEFORE INSERT ON `specifications` FOR EACH ROW BEGIN
    UPDATE phone_variants p
    SET p.stock = p.stock + NEW.stock
    WHERE p.idphone_variants= NEW.phone_variant_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `specifications_BEFORE_UPDATE` BEFORE UPDATE ON `specifications` FOR EACH ROW BEGIN
    IF OLD.phone_variant_id = NEW.phone_variant_id THEN
        -- Update stock when the same phone_variant_id is updated
        UPDATE phone_variants p
        SET p.stock = p.stock + NEW.stock - OLD.stock
        WHERE p.idphone_variants = OLD.phone_variant_id;
    ELSE
        -- Handle phone_variant_id change: remove OLD.stock from the old variant and add NEW.stock to the new variant
        UPDATE phone_variants p
        SET p.stock = p.stock - OLD.stock
        WHERE p.idphone_variants = OLD.phone_variant_id;

        UPDATE phone_variants p
        SET p.stock = p.stock + NEW.stock
        WHERE p.idphone_variants = NEW.phone_variant_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `specifications_BEFORE_DELETE` BEFORE DELETE ON `specifications` FOR EACH ROW BEGIN
    UPDATE phone_variants p
    SET p.stock = p.stock - OLD.stock
    WHERE p.idphone_variants= OLD.phone_variant_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'phoneshop4'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `update_promotion_state` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `update_promotion_state` ON SCHEDULE EVERY 1 DAY STARTS '2024-12-11 23:43:22' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE promotions
    SET status = 'Expired'
    WHERE end_date < CURDATE() AND status = 'Active';
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `update_promotion_state_start` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `update_promotion_state_start` ON SCHEDULE EVERY 1 DAY STARTS '2024-12-11 23:51:10' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    UPDATE promotions
    SET status = 'Expired'
    WHERE start_date> CURDATE();
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'phoneshop4'
--
/*!50003 DROP PROCEDURE IF EXISTS `insertProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertProduct`(
    IN name VARCHAR(50),
    IN description VARCHAR(150),
    IN price DECIMAL(10, 2),
    IN stock INT,
    IN name_category VARCHAR(50),
    IN name_brand VARCHAR(50),
    IN release_date DATE,
    IN screen_size VARCHAR(50),
    IN processor VARCHAR(50),
    IN ram VARCHAR(50),
    IN storage INT,
    IN battery INT,
    IN camera VARCHAR(50)
)
BEGIN
    DECLARE Category_id INT DEFAULT NULL;
    DECLARE Brand_id INT DEFAULT NULL;
    DECLARE last_id INT;

    -- Get category ID
    SELECT category_id INTO Category_id
    FROM categories 
    WHERE category_name = name_category
    LIMIT 1;

    -- Check if category was found
    IF Category_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Category not found';
    END IF;

    -- Get brand ID
    SELECT brand_id INTO Brand_id
    FROM brands 
    WHERE brand_name = name_brand
    LIMIT 1;

    -- Check if brand was found
    IF Brand_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Brand not found';
    END IF;

    -- Insert new phone record
    INSERT INTO phones (name, description, price, stock, category_id, brand_id, release_date)
    VALUES (name, description, price, stock, Category_id, Brand_id, release_date);

    -- Get the last inserted ID for the phone
    SET last_id = LAST_INSERT_ID();

    -- Insert specifications record for the phone
    INSERT INTO specifications (phone_id, screen_size, processor, ram, storage, battery, camera)
    VALUES (last_id, screen_size, processor, ram, storage, battery, camera);

    -- Display the category_id and brand_id
    SELECT Category_id AS category_id, Brand_id AS brand_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_procedure`(
    IN name VARCHAR(50),
    IN description VARCHAR(150),
    IN price FLOAT,
    IN stock INT,
    IN category_name VARCHAR(50),
    IN brand_name VARCHAR(50),
    IN release_date DATE
)
BEGIN
    DECLARE category_id INT;
    DECLARE brand_id INT;

    -- Get category ID
    SELECT category_id INTO category_id
    FROM categories
    WHERE name = category_name
    LIMIT 1;

    -- Get brand ID
    SELECT brand_id INTO brand_id
    FROM brands
    WHERE name = brand_name
    LIMIT 1;

    -- Insert new phone record
    INSERT INTO phones (name, description, price, stock, category_id, brand_id, release_date)
    VALUES (name, description, price, stock, category_id, brand_id, release_date);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test`()
BEGIN
  DECLARE sum_balance_due_var DECIMAL(9, 2);

  -- Calculate the sum of the balance due for a specific vendor
  SELECT SUM(invoice_total - payment_total - credit_total)
  INTO sum_balance_due_var
  FROM invoices 
  WHERE vendor_id = 95;

  -- Optionally display or use the calculated value
  SELECT sum_balance_due_var AS total_balance_due;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-27 10:46:07
