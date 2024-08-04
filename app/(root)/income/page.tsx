import IncomeCard from "@/components/cards/IncomeCard";
import AddIncome from "@/components/forms/AddIncome";
import { fetchUserIncomes, fetchTotalUserIncome } from "@/lib/actions/income.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const userIdString = userInfo._id + "";
    const userIncomes = await fetchUserIncomes(userIdString);
    const userTotalIncome = await fetchTotalUserIncome(userInfo._id);

    return (
        <>
            <h1 className="head-text">Add Income</h1>

            <AddIncome userId={userIdString} />
            <h1 className="head-text">{userInfo.name}'s Income</h1>
            <section className="income-table">
                <article className="income-card font-bold border-b-2 border-black">
                    <div className="income-card_col">Source</div>
                    <div className="income-card_col">Description</div>
                    <div className="income-card_col">Amount</div>
                    <div className="income-card_col_s">Delete Income</div>
                </article>
                {userIncomes.length === 0 ? (
                <p className="no-result">No Income found</p>
                ) : (
                <>
                    {userIncomes.map((income) => (
                    <IncomeCard
                        key={income._id + ""}
                        id={income._id + ""}
                        userId={income.userId + ""}
                        amount={income.amount + ""}
                        source={income.source}
                        description={income.description}
                    />
                    ))}
                </>
                )}
                <article className="income-card font-bold border-t-2 border-black">
                    <div className="income-card_col">Total Income</div>
                    <div className="income-card_col"></div>
                    <div className="income-card_col">${userTotalIncome}</div>
                    <div className="income-card_col_s"></div>
                </article>
            </section>
        </>
    )
}

export default Page;