import TableRowCard from "@/components/cards/TableRowCard";
import AddPayment from "@/components/forms/AddPayment";
import { createRecurringPayment, fetchUserRecurringPayments, fetchTotalUserRecurringPayments, deleteRecurringPayment } from "@/lib/actions/recurring-payment.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const userIdString = userInfo._id + "";
    const userRecurringPayments = await fetchUserRecurringPayments(userIdString);
    const userTotalRecurringPayment = await fetchTotalUserRecurringPayments(userInfo._id);

    return (
        <>
            <h1 className="head-text">Add Recurring Payments</h1>

            <AddPayment userId={userIdString} createMethod={createRecurringPayment} />
            <h1 className="head-text2 text-center mt-6">{userInfo.name}'s Recurring Payments</h1>
            <section className="card-table">
                <article className="card border-b-2 border-black">
                    <div className="card_col card_col_title">Source</div>
                    <div className="card_col card_col_title">Amount</div>
                    <div className="card_col card_col_title">Remove</div>
                </article>
                {userRecurringPayments.length === 0 ? (
                <p className="no-result">No Recurring Payments found</p>
                ) : (
                <>
                    {userRecurringPayments.map((recurringPayment) => (
                        <TableRowCard
                        key={recurringPayment._id + ""}
                        id={recurringPayment._id + ""}
                        cols={[recurringPayment.source + "", "-$" + recurringPayment.amount]}
                        textColor="r-text"
                        deleteMethod={deleteRecurringPayment}
                        />
                    ))}
                </>
                )}
                <article className="card border-t-2 border-black">
                    <div className="card_col card_col_title"># {userRecurringPayments.length}</div>
                    <div className="card_col card_col_title">-${userTotalRecurringPayment}</div>
                    <div className="card_col card_col_title"></div>
                </article>
            </section>
        </>
    )
}

export default Page;