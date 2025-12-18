import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';

interface TransactionTypeProps {
    type: string;
}

export function AddCategory({ type }: TransactionTypeProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="cursor-pointer hover:border-0 hover:bg-black hover:text-white"
                >
                    <SquarePlus /> Add{' '}
                    {type.charAt(0).toUpperCase() + type.slice(1)} Category
                </Button>
            </AlertDialogTrigger>
            <form action="" method="post">
                <input type="hidden" name="transaction_type" value={type} />

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Add new category for {type}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <button type="submit">
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </form>
        </AlertDialog>
    );
}
