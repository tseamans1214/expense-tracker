import TableRowCard from "@/components/cards/TableRowCard";
import AddOneTimePayment from "@/components/forms/AddOneTimePayment";
import { createOneTimePayment, fetchUserOneTimePayments, fetchTotalUserOneTimePayment, deleteOneTimePayment } from "@/lib/actions/one-time-payment.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const userIdString = userInfo._id + "";
    const userOneTimePayments = await fetchUserOneTimePayments(userIdString);
    const userTotalOneTimePayment = await fetchTotalUserOneTimePayment(userInfo._id);

    return (
        <>
            <h1 className="head-text">Add One Time Payments</h1>

            <AddOneTimePayment userId={userIdString} createMethod={createOneTimePayment} />
            <h1 className="head-text2 text-center mt-6">{userInfo.name}'s One-Time Payments</h1>
            <section className="card-table">
                <article className="card border-b-2 border-black">
                    <div className="card_col card_col_title">Source</div>
                    <div className="card_col card_col_title">Amount</div>
                    <div className="card_col card_col_title">Date</div>
                    <div className="card_col card_col_title">Remove</div>
                </article>
                {userOneTimePayments.length === 0 ? (
                <p className="no-result">No One Time Payments found</p>
                ) : (
                <>
                    {userOneTimePayments.map((oneTimePayment) => (
                        <TableRowCard
                        key={oneTimePayment._id + ""}
                        id={oneTimePayment._id + ""}
                        cols={[oneTimePayment.source + "", "-$" + oneTimePayment.amount, oneTimePayment.date]}
                        textColor="r-text"
                        deleteMethod={deleteOneTimePayment}
                        />
                    ))}
                </>
                )}
                <article className="card border-t-2 border-black">
                    <div className="card_col card_col_title"># {userOneTimePayments.length}</div>
                    <div className="card_col card_col_title">-${userTotalOneTimePayment}</div>
                    <div className="card_col card_col_title"></div>
                    <div className="card_col card_col_title"></div>
                </article>
            </section>
        </>
    )
}

export default Page;