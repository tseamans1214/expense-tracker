"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/income.actions";

interface Props {
    id: string;
    userId: string
    amount: string;
    source: string;
    description: string;
}

const IncomeCard = ({id,userId, amount, source, description } : Props) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <article className="income-card">
            <div className="income-card_col">{source}</div>
            <div className="income-card_col">{description}</div>
            <div className="income-card_col">${amount}</div>
            <div className="income-card_col_s">
                <Button className="text-white bg-red-600" onClick={async() =>{
                    await deleteThread(id, pathname);
                        router.refresh();
                    }
                    }>
                    Delete
                </Button>
            </div>
            
        </article>
    );
};

export default IncomeCard;