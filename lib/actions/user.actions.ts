"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import User from "../models/user.model";

import { connectToDB } from "../mongoose";
import Income from "../models/income.model";

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });

  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

// setup interface Params which is for updateUser function
//  Allows use of an object as parameter to avoid
//  mistakes of entering the incorrect order of parameters
interface Params {
    userId: string;
    username: string;
    name: string;
    image: string;
    path: string;
  }

export async function updateUser({
  userId,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId }, // Finds one user with given id
      { // Updates given properties
        username: username.toLowerCase(),
        name,
        image,
        onboarded: true,
      },
      { upsert: true } // Means function will update an existing user if they exist, or insert a new one
    );

    // Revalidate data asscociated with the specfied path.
    //  Updates the cached data without waiting for the revalidation period to expire
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

// export async function fetchUserIncomes(userId: string) {
//   try {
//     connectToDB();

//     // Find all threads authored by the user with the given userId
//     const incomes = await User.findOne({ id: userId }).populate({
//       path: "incomes",
//       model: Income,
//       populate: [
//         {
//           path: "community",
//           model: Community,
//           select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
//         },
//         {
//           path: "children",
//           model: Thread,
//           populate: {
//             path: "author",
//             model: User,
//             select: "name image id", // Select the "name" and "_id" fields from the "User" model
//           },
//         },
//       ],
//     });
//     return incomes;
//   } catch (error) {
//     console.error("Error fetching user threads:", error);
//     throw error;
//   }
// }

