import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  profileImage: text("profile_image"),
  accountType: text("account_type").default("Basic"),
  createdAt: text("created_at"),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  location: text("location").notNull(),
  beds: integer("beds"),
  baths: integer("baths"),
  sqft: integer("sqft"),
  propertyType: text("property_type").notNull(),
  listingType: text("listing_type").notNull(), // Sale or Rent
  featured: boolean("featured").default(false),
  status: text("status").default("Active"), // Active, Pending, Sold
  images: text("images").array(),
  createdAt: text("created_at"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  priceStart: text("price_start").notNull(),
  developer: text("developer"),
  status: text("status").notNull(), // New Launch, Popular, Coming Soon
  images: text("images").array(),
  features: jsonb("features"),
  createdAt: text("created_at"),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  propertyId: integer("property_id"),
  projectId: integer("project_id"),
  createdAt: text("created_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true,
  profileImage: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;

export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
