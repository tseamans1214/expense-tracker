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
            <h1 className="head-text2 text-center mt-6">{userInfo.name}'s Income</h1>
            <section className="card-table">
                <article className="card border-b-2 border-black">
                    <div className="card_col card_col_title">Source</div>
                    <div className="card_col card_col_title">Description</div>
                    <div className="card_col card_col_title">Amount</div>
                    <div className="card_col_s card_col_title">Delete Income</div>
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
                <article className="card border-t-2 border-black">
                    <div className="card_col card_col_title">#: {userIncomes.length}</div>
                    <div className="card_col card_col_title">Total:</div>
                    <div className="card_col card_col_title">${userTotalIncome}</div>
                    <div className="card_col_s card_col_title"></div>
                </article>
            </section>
        </>
    )
}

export default Page;