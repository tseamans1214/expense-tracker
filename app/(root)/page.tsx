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
  let textColor = "g-text"
  if (netIncome < 0) {
    incomeString = "-$" + Math.abs(netIncome);
    textColor = "r-text";
  } else {
    incomeString = "$" + netIncome;
    textColor = "g-text";
  }

  return (
    <div>
      <h2 className="head-text text-left">Welcome {userInfo.name}!</h2>
      <table className="income_table my-5">
        <tr>
          <th colspan="2" className="text-heading2-bold">Monthly Finances</th>
        </tr>
        <tr>
          <th>Source</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Income</td>
          <td className="g-text">${userIncome}</td>
        </tr>
        <tr>
          <td>Recurring Payments</td>
          <td className="r-text">-${userTotalRecurringPayment}</td>
        </tr>
        <tr>
          <td className="font-bold">Net Income</td>
          <td className={textColor}>{incomeString}</td>
        </tr>
      </table>
    </div>
    
  );
}
