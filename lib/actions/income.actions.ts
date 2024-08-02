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
      console.log("Income created: " + source + " Amount: " + amount);
  
      // Update User model by pushing thread created into their threads array
      await User.findByIdAndUpdate(userId, {
        $push: { incomes: createdIncome._id },
      });

      // Make changes immediate on site
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create Income: ${error.message}`);
    }
  }

export async function fetchUserIncomes(userId: string) {
  connectToDB();

  // Create a query fetch all the incomes of a given user
  const incomeQuery = Income.find({ userId: { $in: userId } })

  // Excecute the query
  const incomes = await incomeQuery.exec();

  return incomes;
}

export async function fetchTotalUserIncome(userId: string) {
  connectToDB();

  // Create a query fetch all the incomes of a given user
  const incomeQuery = Income.find({ userId: { $in: userId } })

  // Excecute the query
  const incomes = await incomeQuery.exec();

  let totalIncome = 0;
  for (let i=0; i<incomes.length; i++) {
    totalIncome += Number(incomes[i].amount);
  }

  return totalIncome;
}

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    connectToDB();
    //await Income.deleteOne({ id: { $in: id } })
    await Income.findByIdAndDelete(id);


  }
  catch (error: any) {
    throw new Error(`Failed to delete Income: ${error.message}`);
  }
}