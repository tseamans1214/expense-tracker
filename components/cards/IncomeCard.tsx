"use client"
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteIncome } from "@/lib/actions/income.actions";
import React, { useState, useEffect } from 'react';

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

    const [size, setSize] = useState(getVariableBasedOnSize(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setSize(getVariableBasedOnSize(window.innerWidth));
        };
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <article className="card">
            <div className="card_col g-text">{source}</div>
            <div className="card_col g-text max-sm:hidden">{description}</div>
            <div className="card_col g-text">${amount}</div>
            <div className="card_col">
                <Button variant="destructive" size="full"  onClick={async() =>{
                    await deleteIncome(id, pathname);
                        router.refresh();
                    }
                    }>
                    Delete
                </Button>
            </div>
            
        </article>
    );
};

// Helper function to determine the variable value based on window width
const getVariableBasedOnSize = (width : number) => {
    if (width > 1200) {
    return 'large';
    } else if (width > 600) {
    return 'medium';
    } else {
    return 'small';
    }
};

export default IncomeCard;