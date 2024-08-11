"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import OneTimePayment from "../models/one-time-payment.model";
import { connectToDB } from "../mongoose";


interface Params {
    userId: string,
    amount: number,
    source: string,
    date: string,
    path: string,
}
  
export async function createOneTimePayment({ userId, amount, source, date, path }: Params
  ) {
    try {
      connectToDB();
      //const paymentDate = new Date(date);
  
      const createdPayment = await OneTimePayment.create({
        userId,
        amount,
        source,
        date,
      });
      console.log("Payment created: " + source + " Amount: " + amount);

      // Make changes immediate on site
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create Payment: ${error.message}`);
    }
  }

export async function fetchUserOneTimePayments(userId: string) {
  connectToDB();

  // Create a query fetch all the incomes of a given user
  const paymentQuery = OneTimePayment.find({ userId: { $in: userId } })

  // Excecute the query
  const payments = await paymentQuery.exec();

  return payments;
}

export async function fetchTotalUserOneTimePayment(userId: string) {
  connectToDB();

  // Create a query fetch all the incomes of a given user
  const paymentQuery = OneTimePayment.find({ userId: { $in: userId } })

  // Excecute the query
  const payments = await paymentQuery.exec();

  let totalPayment = 0;
  let currrentDate = new Date();
  for (let i=0; i<payments.length; i++) {
    let paymentDate = new Date(payments[i].date);
    if (currrentDate.getMonth() == paymentDate.getMonth() && currrentDate.getFullYear() == paymentDate.getFullYear()) {
      totalPayment += Number(payments[i].amount);
    }
  }

  return totalPayment;
}

export async function deleteOneTimePayment(id: string, path: string): Promise<void> {
  try {
    connectToDB();
    await OneTimePayment.findByIdAndDelete(id);


  }
  catch (error: any) {
    throw new Error(`Failed to delete Payment: ${error.message}`);
  }
}