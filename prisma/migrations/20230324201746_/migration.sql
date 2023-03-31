-- AlterTable
CREATE SEQUENCE item_itemid_seq;
ALTER TABLE "Item" ALTER COLUMN "itemID" SET DEFAULT nextval('item_itemid_seq');
ALTER SEQUENCE item_itemid_seq OWNED BY "Item"."itemID";
