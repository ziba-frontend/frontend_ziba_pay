import React from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

type User = {
   name: string;
   email: string;
};

type Transaction = {
   id: string;
   userId: string;
   recipientId: string;
   amount: number;
   currency: string;
   status: string;
   type: string;
   createdAt: string;
   user: User;
   recipient: User;
};

type TransactionDetailsModalProps = {
    transaction: Transaction | null;
    onClose: () => void;
};

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
    transaction,
    onClose,
}) => {
    if (!transaction) {
        return null;
    }

    const createdAtDate = transaction.createdAt ? new Date(transaction.createdAt) : null;
    const formattedCreatedAt =
        createdAtDate && !isNaN(createdAtDate.getTime())
            ? format(createdAtDate, "PPpp")
            : "Invalid Date";

    return (
        <Dialog open={Boolean(transaction)} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Transaction Details Panel</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="mb-2 text-[#979797]">Transaction ID</p>
                        <div className="p-3 border border-black w-full">
                            {transaction.id}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-[#979797]">User ID</p>
                        <div className="p-3 border border-black w-full">
                            {transaction.userId}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-[#979797]">Recipient ID</p>
                        <div className="p-3 border border-black w-full">
                            {transaction.recipientId}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-[#979797]">Amount</p>
                        <div className="p-3 border border-black w-full">
                            {transaction.amount} {transaction.currency}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-[#979797]">Status</p>
                        <div className="p-3 border border-black w-full">
                            {transaction.status}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-[#979797]">Transaction Type</p>
                        <div className="p-3 border border-black w-full">
                            {transaction.type}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <small>Transaction Date: {formattedCreatedAt}</small>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionDetailsModal;
