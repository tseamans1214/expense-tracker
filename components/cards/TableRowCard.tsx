"use client"
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteIncome } from "@/lib/actions/income.actions";
import React, { useState, useEffect } from 'react';

interface Props {
    id: string;
    cols: string[];
    textColor: string;
    deleteMethod: (id: string, pathname: string) => Promise<void>;
}

const TableRowCard = ({id, cols, textColor, deleteMethod } : Props) => {
    const router = useRouter();
    const pathname = usePathname();

    return ( 
        <article className="card">
            <>
                {cols.map((col) => (
                    <div className={`card_col ${textColor}`}>{col}</div>
                ))}
            </>
            <div className="card_col">
                <Button variant="destructive" size="full"  onClick={async() =>{
                    await deleteMethod(id, pathname);
                        router.refresh();
                    }
                    }>
                    Delete
                </Button>
            </div>
            
        </article>
    );
};

export default TableRowCard;