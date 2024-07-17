"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import User from "../models/user.model";
import Income from "../models/income.model";

import { connectToDB } from "../mongoose";


interface Params {
    userId: string,
    amount: number,
    source: string,
    description: string,
    path: string,
}
  
export async function createIncome({ userId, amount, source, description, path }: Params
  ) {
    try {
      connectToDB();
  
      const createdIncome = await Income.create({
        userId,
        amount,
        source,
        description,
      });
  
      // Update User model by pushing thread created into their threads array
      await User.findByIdAndUpdate(userId, {
        $push: { threads: createdIncome._id },
      });

      // Make changes immediate on site
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create Income: ${error.message}`);
    }
  }