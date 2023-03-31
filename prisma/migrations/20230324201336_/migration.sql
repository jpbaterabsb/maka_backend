-- AlterTable
CREATE SEQUENCE sale_id_seq;
ALTER TABLE "Sale" ALTER COLUMN "id" SET DEFAULT nextval('sale_id_seq');
ALTER SEQUENCE sale_id_seq OWNED BY "Sale"."id";
