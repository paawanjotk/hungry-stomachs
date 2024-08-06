import { config } from "dotenv";
config();
import mongoose from "mongoose";
import CategoriesModel from "./models/categories.models.js";
import seedFile from "./seed.json" assert { type: "json" };
import ProductModel from "./models/products.models.js";

const main = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Connected to DB");
  });
  console.log("Seeding categories");
  for (const category of seedFile.categories) {
    console.log(`Seeding category ${category.name}`);
    const existingCategory = await CategoriesModel.findOne({
      name: category.name,
    });
    if (existingCategory) {
      console.log(`Category ${category.name} already exists`);
      continue;
    }
    await CategoriesModel.createCategory(category);
  }
  for (const product of seedFile.products) {
    console.log(`Seeding product ${product.name}`);
    const existingProduct = await ProductModel.findOne({
      name: product.name,
    });

    if (existingProduct) {
      console.log(`Product ${product.name} already exists`);
      continue;
    }
    const existingCategory = await CategoriesModel.findOne({
      name: product.categoryname,
    });
    if (!existingCategory) {
      console.log(`Category ${product.categoryname} not found`);
      continue;
    }
    await ProductModel.createProduct({
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      description: product.description,
      category: existingCategory._id,
    });
  }
  process.exit(0);
};

main();
