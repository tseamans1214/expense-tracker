import { UserButton } from "@clerk/nextjs";

import { fetchUser } from "../../lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  return (
    <div>
      <h1 className="head-text text-left">Expense Tracker Home</h1>
      <h2 className="head-text text-left">Welcome {userInfo.name}!</h2> 
    </div>
    
  );
}
