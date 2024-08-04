import { UserButton } from "@clerk/nextjs";

import { fetchUser } from "../../lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs/server';
import { fetchTotalUserIncome } from "@/lib/actions/income.actions";
import { fetchTotalUserRecurringPayments } from "@/lib/actions/recurring-payment.actions";
import { New_Tegomin } from "next/font/google";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const userIncome = await fetchTotalUserIncome(userInfo._id);
  const userTotalRecurringPayment = await fetchTotalUserRecurringPayments(userInfo._id);
  const netIncome = Number(userIncome) - Number(userTotalRecurringPayment);
  let incomeString = ""
  if (netIncome < 0) {
    incomeString = "-$" + Math.abs(netIncome);
  } else {
    incomeString = "$" + netIncome;
  }

  return (
    <div>
      <h1 className="head-text text-left">Expense Tracker Home</h1>
      <h2 className="head-text text-left">Welcome {userInfo.name}!</h2>
      <h2 className="head-text text-left">Total Monthy Income: {incomeString}!</h2>
    </div>
    
  );
}
