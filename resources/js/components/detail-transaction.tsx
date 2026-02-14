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
// import { capitalize, toIDR } from '@/lib/utils';
import { Transaction } from '@/types';

interface DetalTransactionProps {
    transaction: Transaction;

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
                    <div className="flex flex-col gap-3">
                        <div>
                            <AlertDialogDescription className="font-semibold text-black">
                                Date:
                            </AlertDialogDescription>
                            <AlertDialogDescription className="text-base text-black">
                                {transaction.transaction_date}
                            </AlertDialogDescription>
                        </div>
                        <div>
                            <AlertDialogDescription className="font-semibold text-black">
                                Total Amount:
                            </AlertDialogDescription>
                            <AlertDialogDescription className="text-base text-black">
                                {toIDR(transaction.transaction_amount)}
                            </AlertDialogDescription>
                        </div>
                        <div>
                            <AlertDialogDescription className="font-semibold text-black">
                                Category:
                            </AlertDialogDescription>
                            <AlertDialogDescription className="text-base text-black">
                                {transaction.category?.category_name}
                            </AlertDialogDescription>
                        </div>
                        <div>
                            <AlertDialogDescription className="font-semibold text-black">
                                Method:
                            </AlertDialogDescription>
                            <AlertDialogDescription className="text-base text-black">
                                {capitalize(transaction.transaction_method)}
                            </AlertDialogDescription>
                        </div>
                        <div>
                            <AlertDialogDescription className="font-semibold text-black">
                                Note:
                            </AlertDialogDescription>
                            <AlertDialogDescription className="text-base text-black">
                                {transaction.transaction_note}
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
