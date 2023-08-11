-- Database Operations
DROP DATABASE IF EXISTS Zoo;
CREATE DATABASE Zoo;
USE Zoo;

-- Table Creation

CREATE TABLE konto
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    kontostand DOUBLE NOT NULL
);

CREATE TABLE kassa
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    kassastand DOUBLE NOT NULL,
    konto_id   INT,
    FOREIGN KEY (konto_id) REFERENCES konto (id)
);

CREATE TABLE shop
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    fläche   INT NOT NULL,
    konto_id INT,
    FOREIGN KEY (konto_id) REFERENCES konto (id)
);

CREATE TABLE product
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    preis     DOUBLE       NOT NULL,
    name      VARCHAR(255) NOT NULL,
    zeitpunkt TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    bestand   INT          NOT NULL,
    kassa_id  INT,
    FOREIGN KEY (kassa_id) REFERENCES kassa (id),
    shop_id   INT,
    FOREIGN KEY (shop_id) REFERENCES shop (id)
);

CREATE TABLE mitarbeiter
(
    id                INT PRIMARY KEY AUTO_INCREMENT,
    position          VARCHAR(255) NOT NULL,
    mitarbeiter_alter INT          NOT NULL,
    name              VARCHAR(255) NOT NULL,
    shop_id           INT,
    FOREIGN KEY (shop_id) REFERENCES shop (id),
    kassa_id          INT,
    FOREIGN KEY (kassa_id) REFERENCES kassa (id)
);

CREATE TABLE gehege
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    volumen        INT          NOT NULL,
    standort       VARCHAR(255) NOT NULL,
    gehegeart      VARCHAR(255) NOT NULL,
    mitarbeiter_id INT,
    FOREIGN KEY (mitarbeiter_id) REFERENCES mitarbeiter (id)
);

CREATE TABLE tiere
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    gattung   VARCHAR(255) NOT NULL,
    nahrung   VARCHAR(255) NOT NULL,
    gehege_id INT,
    FOREIGN KEY (gehege_id) REFERENCES gehege (id)
);

-- Ticket Table
CREATE TABLE tickets
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    preis     DOUBLE    NOT NULL,
    zeitpunkt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Zoo.tickets
    ADD type VARCHAR(255);

ALTER TABLE tickets MODIFY type ENUM('Kinder', 'Erwachsener', 'Senioren');
UPDATE Zoo.tickets
SET type = 'Kinder'
WHERE preis = 20;
UPDATE Zoo.tickets
SET type = 'Erwachsener'
WHERE preis = 25;
UPDATE Zoo.tickets
SET type = 'Senioren'
WHERE preis = 22;

ALTER TABLE Zoo.tickets
    ADD CONSTRAINT CHK_TicketType CHECK (type IN ('Kinder', 'Erwachsener', 'Senioren'));

CREATE INDEX idx_verkaufsdatum ON Zoo.tickets (verkaufsdatum);

-- User Operations
DROP USER IF EXISTS 'zoo_user'@'Zoo';
CREATE USER 'zoo_user'@'Zoo' IDENTIFIED BY 'password';
GRANT INSERT, SELECT ON Zoo.* TO 'zoo_user'@'Zoo';

-- Data Insertions
-- Add initial values for konto, kassa, shop
INSERT INTO konto(kontostand)
VALUES (5000);
INSERT INTO kassa(kassastand, konto_id)
VALUES (200, 1),
       (250, 1);
INSERT INTO shop(fläche, konto_id)
VALUES (150, 1),
       (300, 1);

-- Add products
INSERT INTO product(preis, name, bestand, kassa_id, shop_id)
VALUES (10.50, 'Bier', 50, 1, 1),
       (15.50, 'T-Shirt', 30, 2, 2),
       (5.50, 'Wasser', 100, 1, NULL),
       (25.50, 'Hut', 20, 2, 2);

-- Add Mitarbeiter
INSERT INTO mitarbeiter(position, mitarbeiter_alter, name, shop_id, kassa_id)
VALUES ('Tierpfleger', 28, 'Hans', NULL, NULL),
       ('Tierpfleger', 32, 'Maria', NULL, NULL),
       ('Kassierer', 40, 'Greta', NULL, 1),
       ('Shop Manager', 45, 'Peter', 1, NULL),
       ('Kassierer', 30, 'Tom', NULL, 2);

-- Add Gehege
INSERT INTO gehege(volumen, standort, gehegeart, mitarbeiter_id)
VALUES (300, 'Norden', 'Freigehege', 1),
       (200, 'Süden', 'Aquarium', 2),
       (400, 'Westen', 'Vogelhaus', NULL);

-- Add Tiere
INSERT INTO tiere(gattung, nahrung, gehege_id)
VALUES ('Löwe', 'Fleisch', 1),
       ('Fisch', 'Algen', 2),
       ('Adler', 'Fisch', 3),
       ('Pinguin', 'Fisch', 2),
       ('Giraffe', 'Blätter', 1);

-- Add Tickets
INSERT INTO tickets(preis, type) VALUES (20, 'Kinder');
INSERT INTO tickets(preis, type) VALUES (25, 'Erwachsener');
INSERT INTO tickets(preis, type) VALUES (22, 'Senioren');
INSERT INTO Zoo.tickets (type, preis, verkaufsdatum) VALUES (@type, @preis, @verkaufsdatum);
SELECT CONCAT(preis, ' €') AS formatted_price FROM Zoo.tickets;