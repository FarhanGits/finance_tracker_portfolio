import { formatPeriod, toIDR } from '@/lib/utils';
import { Budget, Category } from '@/types';
import { useForm } from '@inertiajs/react';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { Pencil } from 'lucide-react';
import { route } from 'ziggy-js';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

interface EditBudget {
    budget: Budget;
    budget_period: string;
    categories: Category[];
    user_id: string;
}

export default function EditBudgeting({
    budget,
    budget_period,
    categories,
    user_id,
}: EditBudget) {
    const { data, setData, patch } = useForm({
        category_id: '',
        budget_amount: '',
    });

    function editBudget(e: React.FormEvent) {
        e.preventDefault();

        patch(route('budgeting.edit', budget.budget_id));
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer rounded-md border bg-yellow-500 p-1.5 text-white">
                    <Pencil />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Updating budget for {budget.category?.category_name}{' '}
                        category in {formatPeriod(budget_period)} period
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {budget.category?.category_name}:{' '}
                        {toIDR(budget.budget_amount)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={editBudget} className="flex flex-col gap-3">
                    <Input
                        id="budget_amount"
                        type="number"
                        name="budget_amount"
                        value={data.budget_amount}
                        onChange={(e) =>
                            setData('budget_amount', e.target.value)
                        }
                        placeholder="Edit budget amount"
                    />
                    <Select
                        defaultValue=""
                        name="category_id"
                        value={data.category_id}
                        onValueChange={(e) => setData('category_id', e)}
                    >
                        <SelectTrigger id="income-category">
                            <SelectValue placeholder="Choose category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories
                                .filter(
                                    (category) =>
                                        category.category_type === 'expense' &&
                                        (category.user_id === null ||
                                            category.user_id === user_id),
                                )
                                .map((category) => (
                                    <SelectItem
                                        key={category.category_id}
                                        value={category.category_id}
                                    >
                                        {category.category_name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Edit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
