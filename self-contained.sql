CREATE DATABASE  IF NOT EXISTS `supermarket_online` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarket_online`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket_online
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `total_price` int NOT NULL DEFAULT '0',
  KEY `FK_PRODUCT_ID` (`product_id`),
  KEY `FK_CART_ID` (`cart_id`),
  CONSTRAINT `FK_CART_ID` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_PRODUCT_ID` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_CUSTOMER_ID_FOR_CARTS` (`customer_id`),
  CONSTRAINT `FK_CUSTOMER_ID_FOR_CARTS` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Dairy'),(2,'Vegetables & Fruits'),(3,'Meat & Fish'),(4,'Wine & Drinks');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id_number` int NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `city_name` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  PRIMARY KEY (`id_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (999999999,'75ffc83ad7aa2abcc1038f164e43ac7a','admin','admin','admin','2','admin street');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `final_price` int DEFAULT NULL,
  `city_for_shipment` varchar(45) DEFAULT '',
  `street_for_shipment` varchar(45) DEFAULT '',
  `date_for_shipment` date DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `four_last_digits` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_CART_ID_FOR_ORDER` (`cart_id`),
  KEY `FK_CUSTOMER_ID_FOR_ORDERS` (`customer_id`),
  CONSTRAINT `FK_CART_ID_FOR_ORDER` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_CUSTOMER_ID_FOR_ORDERS` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL,
  `image` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_CATEGORY_ID` (`category_id`),
  CONSTRAINT `FK_CATEGORY_ID` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Eggs',1,20,'https://market50.b-cdn.net/sigeti/products/%D7%AA%D7%91%D7%A0%D7%99%D7%AA-%D7%91%D7%99%D7%A6%D7%99%D7%9D-%D7%92%D7%93%D7%95%D7%9C%D7%94-XL-59283942.jpg'),(2,'Classic Cheese',1,10,'https://images1.ynet.co.il/PicServer4/2014/09/02/5562795/43678400100489640360no.jpg'),(3,'Yogurt',1,6,'https://mevgal.com/wp-content/uploads/4_AG_Yogurt%20150_FRUITS_FORE.png'),(4,'Milk',1,8,'https://assets.woolworths.com.au/images/2010/596964.jpg?impolicy=wowcdxwbjbx&w=900&h=900'),(5,'Chocolate Milk',1,12,'https://i5.walmartimages.com/asr/5e3107e9-ca85-41f4-9ee5-f028e71fc8d8_2.023ca795f624f4d161f3f7b66d132577.jpeg'),(6,'Sweet Whipping Cream',1,13,'https://www.becel.ca/-/media/Project/Upfield/Brands/Becel-CA/Becel-Canada/Assets/Products/Cream/Becel_Canada_-2022_--Cream_-500mL-EN.png?rev=39cd24a0ee2d40b48e6eb41e15ce7370&w=500'),(7,'Sour Cream',1,13,'https://images.heb.com/is/image/HEBGrocery/000314020?https://images.heb.com/is/image/HEBGrocery/000314020?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0'),(8,'Ice Coffee',1,5,'https://www.landessa.mk/images/Products/Landessa_Cup_Cappuccino_2022.png'),(9,'Gouda Cheese',1,25,'https://afaq.ps/wp-content/uploads/2019/03/mtYlT1eg.jpeg'),(10,'Parmesan Cheese',1,23,'https://chubbytshaka.com/wp-content/uploads/2020/05/parmesan-cheese-500x500-1.jpg'),(11,'Cucumbers',2,3,'https://s3-us-west-2.amazonaws.com/melingoimages/Images/22256.jpg'),(12,'Tomatos',2,3,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/1200px-Bright_red_tomato_and_cross_section02.jpg'),(13,'Carrots',2,8,'https://kiranacompare.com/wp-content/uploads/2020/11/The-lost-plot-growing-carrots-iStock-471680420.jpg'),(14,'Pears',2,7,'https://images.heb.com/is/image/HEBGrocery/000513694'),(15,'Red Peppers',2,5,'https://digitalcontent.api.tesco.com/v2/media/ghs/5ff37e5c-3eff-4623-b52e-1a1cb5aeac75/snapshotimagehandler_70930541.jpeg?h=540&w=540'),(16,'Apples',2,10,'https://domf5oio6qrcr.cloudfront.net/medialibrary/11525/0a5ae820-7051-4495-bcca-61bf02897472.jpg'),(17,'Bananas',2,8,'https://images.heb.com/is/image/HEBGrocery/000377497?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0'),(18,'Grapes',2,15,'https://media.istockphoto.com/photos/green-grape-isolated-on-white-background-picture-id489520104?k=20&m=489520104&s=170667a&w=0&h=9rCmoDASlCMw0Tqn6hhLf81tsa0ETXefD6Zr0dIU_Vk='),(19,'Pineapples',2,25,'https://organic-village.co.th/wp-content/uploads/2021/12/organic-pineapple-1200x1200.jpeg'),(20,'Watermelons',2,22,'https://cdn.shopify.com/s/files/1/0336/7167/5948/products/image-of-organic-mini-red-seedless-watermelon-fruit-29678417018924_600x600.jpg?v=1644607939'),(21,'Entrecote',3,90,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmLATSci2N93DlnvDUMasOgZaO7EhIzpVPg&usqp=CAU'),(22,'Hotdogs',3,15,'https://media.newyorker.com/photos/5f287763da874d6b00137c33/master/w_2560%2Cc_limit/Adler-HotDogs.jpg'),(23,'Mince',3,25,'https://cdnprod.mafretailproxy.com/sys-master-root/h2c/hed/12548995350558/909568_1.jpg_480Wx480H'),(24,'Roast Beef',3,50,'https://images.heb.com/is/image/HEBGrocery/003454081?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0'),(25,'Chicken Breast',3,30,'https://cdn.shopify.com/s/files/1/0274/0217/4498/products/bonelessbreast_300x.jpg?v=1588263198'),(26,'Atlantic Salmon',3,60,'https://freshandfleshy.com/wp-content/uploads/2021/06/SALMON-FISH-FILET-1KG.jpg'),(27,'Tuna Fish',3,80,'https://i.ndtvimg.com/mt/cooks/2014-11/tuna.jpg'),(28,'Tilapia Fillet',3,56,'https://thumbs.dreamstime.com/b/raw-tilapia-fillet-fish-isolated-white-background-cooking-food-fresh-fish-fillet-sliced-steak-salad-raw-tilapia-167600171.jpg'),(29,'Dennis Fish',3,67,'https://boxeh.net/wp-content/uploads/2020/01/DennisFish_rendered.jpg'),(30,'Trout',3,70,'https://img.freepik.com/free-photo/fresh-trout-isolated-white_144627-17411.jpg?w=2000'),(31,'Coca Cola',4,20,'https://static.thcdn.com/images/large/original//productimg/1600/1600/12657918-6904906038830571.jpg'),(32,'Dr. Pepper',4,20,'https://i5.walmartimages.com/asr/162f0e98-f491-4ecd-aeb6-e34163b0eccf.186924e2d0b3e7468b4638b87bb12c4f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'),(33,'Nestea',4,15,'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3725941.jpg'),(34,'Sprite',4,20,'https://images.heb.com/is/image/HEBGrocery/000145627'),(35,'Prigat',4,15,'https://prigat.co.il/wp-content/uploads/2020/01/mashkal-340x340.png'),(36,'Cabernet Wine',4,40,'https://tamarbakfar.co.il/wp-content/uploads/2020/10/xbO9xTLw.jpeg'),(37,'Beer',4,30,'https://previews.123rf.com/images/monticello/monticello1807/monticello180700384/107180444-poznan-pol-july-19-2018-bottles-of-famous-global-beer-brands-including-heineken-bud-miller-tuborg-be.jpg'),(38,'Jack Daniel\'s',4,80,'https://www.heinemann-shop.com/medias/693708-527Wx527H?context=bWFzdGVyfGltYWdlc3w1MzU5N3xpbWFnZS9qcGVnfGg2Mi9oN2QvOTY3NzM1NjMzNTEzNC82OTM3MDhfNTI3V3g1MjdIfDJjODZhNDgwYzFiZDdmMGUwN2VkZTVlOTM5MjBjYjk4NDM3NWRhM2Y3YWNiY2NmODY3YmE3ZmE4MWFiMmNkMGE&v=1650940813661'),(39,'Ouzo',4,40,'https://wine-direct.co.il/wp-content/uploads/2020/09/ouzo_12-1-600x600.jpg'),(40,'shampine',4,35,'https://lh3.googleusercontent.com/I3_GiPlHOsHIC2aD1FZuHwSyi_fbXym9ddzL670b5G14pMt3ObxgHC-tH3kXhhCIh1yBtFEXVoWpyNjUJ3gOGyqFKTw=w500-rw');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-27  8:55:55
