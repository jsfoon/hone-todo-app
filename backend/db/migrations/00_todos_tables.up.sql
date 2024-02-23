-- -------------------------------------------------------------
-- TablePlus 5.8.4(532)
--
-- https://tableplus.com/
--
-- Database: todo
-- Generation Time: 2024-02-23 15:22:36.6260
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."todos";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS todos_id_seq;

-- Table Definition
CREATE TABLE "public"."todos" (
    "id" int4 NOT NULL DEFAULT nextval('todos_id_seq'::regclass),
    "title" text NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."todos" ("id", "title") VALUES
(1, 'test'),
(2, 'asd'),
(3, 'asddd');
