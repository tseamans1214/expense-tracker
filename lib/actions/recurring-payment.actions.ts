"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import RecurringPayment from "../models/recurring-payment.model";

import { connectToDB } from "../mongoose";


interface Params {
    userId: string,
    amount: number,
    source: string,
    description: string,
    path: string,
}
  
export async function createRecurringPayment({ userId, amount, source, description, path }: Params
  ) {
    try {
      connectToDB();
  
      const createdRecurringPayment = await RecurringPayment.create({
        userId,
        amount,
        source,
        description,
      });

      // Make changes immediate on site
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create Recurring Payment: ${error.message}`);
    }
  }

export async function fetchUserRecurringPayments(userId: string) {
  connectToDB();

  // Create a query fetch all the Recurring Payments of a given user
  const recurringPaymentQuery = RecurringPayment.find({ userId: { $in: userId } })

  // Excecute the query
  const recurringPayments = await recurringPaymentQuery.exec();

  return recurringPayments;
}

export async function fetchTotalUserRecurringPayments(userId: string) {
  connectToDB();

  // Create a query fetch all the Recurring Payments of a given user
  const recurringPaymentQuery = RecurringPayment.find({ userId: { $in: userId } })

  // Excecute the query
  const recurringPayments = await recurringPaymentQuery.exec();

  let totalRecurringPayments = 0;
  for (let i=0; i<recurringPayments.length; i++) {
    totalRecurringPayments += Number(recurringPayments[i].amount);
  }

  return totalRecurringPayments;
}

export async function deleteRecurringPayment(id: string, path: string): Promise<void> {
  try {
    connectToDB();
    await RecurringPayment.findByIdAndDelete(id);


  }
  catch (error: any) {
    throw new Error(`Failed to delete Recurring Payment: ${error.message}`);
  }
}