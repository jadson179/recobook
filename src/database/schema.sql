DROP DATABASE IF EXISTS core;
CREATE DATABASE core;
USE core;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY  , 
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `photo` VARCHAR(255) NULL,
  `bio` VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS `elos` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` TEXT NULL,
  `qtd_likes` INT NULL DEFAULT 0,
  `qtd_comments` INT NULL DEFAULT 0,
  `category` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `id_user` INT NOT NULL,
   FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `content` TEXT NULL,
  `id_elo` INT NOT NULL,
  `id_user` INT NOT NULL,
  FOREIGN KEY (`id_elo`) REFERENCES `elos` (`id`),
  FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `likes` (
  `id` INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `id_elo` INT NOT NULL,
  `id_user` INT NOT NULL,
   FOREIGN KEY (`id_elo`) REFERENCES `elos` (`id`),
   FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `images` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `url` VARCHAR(255) NULL,
  `id_elo` INT NOT NULL,
   FOREIGN KEY (`id_elo`) REFERENCES `elos` (`id`)
);

CREATE TABLE IF NOT EXISTS `videos` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `url` VARCHAR(255) NULL,
  `id_elo` INT NOT NULL,
   FOREIGN KEY (`id_elo`) REFERENCES `elos` (`id`)
);
