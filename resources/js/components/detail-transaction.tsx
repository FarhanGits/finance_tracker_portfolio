import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { capitalize, toIDR } from '@/lib/utils';
import { TransactionList } from '@/types';

interface DetalTransactionProps {
    transaction: TransactionList;

    [key: string]: unknown;
}

export function DetailTransaction({ transaction }: DetalTransactionProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">See Detail</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {transaction.transaction_type === 'income' ? (
                        <AlertDialogTitle>Income Detail</AlertDialogTitle>
                    ) : (
                        <AlertDialogTitle>Expense Detail</AlertDialogTitle>
                    )}
                    <AlertDialogDescription
                        className="flex flex-col gap-3 text-black"
                        key={transaction.transaction_id}
                    >
                        <div>
                            <p className="font-semibold">Date:</p>
                            <p className="text-base">
                                {transaction.transaction_date}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">Total Amount:</p>
                            <p className="text-base">
                                {toIDR(transaction.transaction_amount)}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">Category:</p>
                            <p className="text-base">
                                {transaction.category?.category_name}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">Method:</p>
                            <p className="text-base">
                                {capitalize(transaction.transaction_method)}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">Note:</p>
                            <p className="text-base">
                                {transaction.transaction_note}
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
