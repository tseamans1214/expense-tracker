"use client"
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteRecurringPayment } from "@/lib/actions/recurring-payment.actions";

interface Props {
    id: string;
    amount: string;
    source: string;
    description: string;
}

const RecurringPaymentCard = ({id, amount, source, description } : Props) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <article className="card">
            <div className="card_col r-text">{source}</div>
            <div className="card_col r-text max-sm:hidden">{description}</div>
            <div className="card_col r-text">-${amount}</div>
            <div className="card_col">
                <Button variant="destructive" size="full" onClick={async() =>{
                    await deleteRecurringPayment(id, pathname);
                        router.refresh();
                    }
                    }>
                    Delete
                </Button>
            </div>
            
        </article>
    );
};

export default RecurringPaymentCard;