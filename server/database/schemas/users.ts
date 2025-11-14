import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

 
 export const users = mysqlTable('users', {
    id: int().primaryKey().autoincrement(),
    username:varchar({length:255}).notNull(),
    email:varchar({length:255}).notNull().unique(),
    password:varchar({length:255}).notNull().unique(),
    createdAt:timestamp().defaultNow().notNull(),
    updatedAt : timestamp().$default(() => new Date()).$onUpdate(() => new Date()).notNull(),
 });