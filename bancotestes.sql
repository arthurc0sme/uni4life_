-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema social
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema social
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `social` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `social` ;

-- -----------------------------------------------------
-- Table `social`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `coverPic` VARCHAR(200) NULL DEFAULT NULL,
  `profilePic` VARCHAR(200) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `website` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NULL DEFAULT NULL,
  `img` VARCHAR(45) NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(200) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `commentuserId_idx` (`userId` ASC) VISIBLE,
  INDEX `commentedpostId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `commentedpostId`
    FOREIGN KEY (`postId`)
    REFERENCES `social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `commentuserId`
    FOREIGN KEY (`userId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social`.`likes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` INT NOT NULL,
  `postid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `likeUserid_idx` (`userid` ASC) VISIBLE,
  INDEX `likePosterIdd_idx` (`postid` ASC) VISIBLE,
  CONSTRAINT `likePosterIdd`
    FOREIGN KEY (`postid`)
    REFERENCES `social`.`posts` (`id`),
  CONSTRAINT `likeUserid`
    FOREIGN KEY (`userid`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `social`.`relationships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `social`.`relationships` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `followeruserId` INT NOT NULL,
  `followeduserId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `followerUser_idx` (`followeruserId` ASC) VISIBLE,
  INDEX `followedUser_idx` (`followeduserId` ASC) VISIBLE,
  CONSTRAINT `followedUser`
    FOREIGN KEY (`followeduserId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `followerUser`
    FOREIGN KEY (`followeruserId`)
    REFERENCES `social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
