import RecurringPaymentCard from "@/components/cards/RecurringPaymentCard";
import AddRecurringPayment from "@/components/forms/AddRecurringPayment";
import { fetchUserRecurringPayments, fetchTotalUserRecurringPayments } from "@/lib/actions/recurring-payment.actions";
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

            <AddRecurringPayment userId={userIdString} />
            <h1 className="head-text2 text-center mt-6">{userInfo.name}'s Recurring Payments</h1>
            <section className="card-table">
                <article className="card border-b-2 border-black">
                    <div className="card_col card_col_title">Source</div>
                    <div className="card_col card_col_title">Description</div>
                    <div className="card_col card_col_title">Amount</div>
                    <div className="card_col_s card_col_title">Delete Recurring Payment</div>
                </article>
                {userRecurringPayments.length === 0 ? (
                <p className="no-result">No Recurring Payments found</p>
                ) : (
                <>
                    {userRecurringPayments.map((recurringPayment) => (
                    <RecurringPaymentCard
                        key={recurringPayment._id + ""}
                        id={recurringPayment._id + ""}
                        amount={recurringPayment.amount + ""}
                        source={recurringPayment.source}
                        description={recurringPayment.description}
                    />
                    ))}
                </>
                )}
                <article className="card border-t-2 border-black">
                    <div className="card_col card_col_title">#: {userRecurringPayments.length}</div>
                    <div className="card_col card_col_title">Total:</div>
                    <div className="card_col card_col_title">-${userTotalRecurringPayment}</div>
                    <div className="card_col_s card_col_title"></div>
                </article>
            </section>
        </>
    )
}

export default Page;