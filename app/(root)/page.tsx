import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
      <h1>Expense Tracker</h1>
    </div>
    
  );
}
