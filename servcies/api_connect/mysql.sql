USE `cmsfs`;

CREATE TABLE IF NOT EXISTS `connect_jdbc` (
  `name` VARCHAR(20) NOT NULL,
  `kind` VARCHAR(20) NOT NULL,
  `ip` VARCHAR(45) NOT NULL,
  `port` INT NOT NULL,
  `protocol` VARCHAR(45) NOT NULL,
  `service` VARCHAR(45) NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `connect_ssh` (
  `name` INT NOT NULL,
  `ip` VARCHAR(45) NOT NULL,
  `port` INT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  `private_key` TEXT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB;


