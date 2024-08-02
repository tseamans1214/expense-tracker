import AddIncome from "@/components/forms/AddIncome";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const userIdString = userInfo._id + "";

    return (
        <>
            <h1 className="head-text">Add Income</h1>

            <AddIncome userId={userIdString} />
        </>
    )
}

export default Page;