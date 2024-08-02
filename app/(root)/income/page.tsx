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
            <section className="mt-9 flex flex-col gap-10">
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
            </section>
            <h2 className="text-white">Total Income ${userTotalIncome}</h2>
        </>
    )
}

export default Page;