import { Button } from '@/components/ui/button';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { formatPeriod, toIDR } from '@/lib/utils';
import { budgeting } from '@/routes';
import { BreadcrumbItem, Budget, CategoryList } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowUpRight, CalendarFold } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Budget Setting',
        href: budgeting().url,
    },
];

interface BudgetProps {
    budgets: Budget[];
    categories: CategoryList[];
    user_id: string;
    budget_period: string;
    errors: string;
    [key: string]: unknown;
}

export default function Budgeting() {
    const { budgets, categories, user_id, budget_period, errors } =
        usePage<BudgetProps>().props;
    const { data, setData, post } = useForm({
        budget_amount: '',
        category_id: '',
    });

    console.log(errors);

    function setBudget(e: React.FormEvent) {
        e.preventDefault();
        post(route('budgeting.create'));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Budgeting" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="mb-4 text-center text-2xl font-bold">
                    Set your budgeting plan this month
                </h1>
                {/* {errors && <p>{errors}</p>} */}
                <div className="flex w-full flex-col gap-5 rounded-xl border p-5">
                    <div className="flex items-center gap-1">
                        <CalendarFold />
                        <h1 className="font-semibold">
                            {formatPeriod(budget_period)}
                        </h1>
                    </div>
                    <form onSubmit={setBudget}>
                        <FieldSet>
                            <FieldGroup className="flex flex-row">
                                {/* Amount */}
                                <Field>
                                    <FieldLabel htmlFor="budget_amount">
                                        Budget Amount
                                    </FieldLabel>
                                    <Input
                                        id="budget_amount"
                                        type="number"
                                        value={data.budget_amount}
                                        placeholder="Input amount"
                                        name="budget_amount"
                                        onChange={(e) =>
                                            setData(
                                                'budget_amount',
                                                e.target.value,
                                            )
                                        }
                                    ></Input>
                                </Field>

                                {/* Category */}
                                <Field>
                                    <FieldLabel htmlFor="budget_category">
                                        Category
                                    </FieldLabel>
                                    <Select
                                        defaultValue=""
                                        name="category_id"
                                        value={data.category_id}
                                        onValueChange={(e) =>
                                            setData('category_id', e)
                                        }
                                    >
                                        <SelectTrigger id="budget_category">
                                            <SelectValue placeholder="Choose category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories
                                                .filter(
                                                    (category) =>
                                                        category.category_type ===
                                                            'expense' &&
                                                        (category.user_id ===
                                                            null ||
                                                            category.user_id ===
                                                                user_id),
                                                )
                                                .map((category) => (
                                                    <SelectItem
                                                        key={
                                                            category.category_id
                                                        }
                                                        value={
                                                            category.category_id
                                                        }
                                                    >
                                                        {category.category_name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>
                            <FieldSeparator />
                            <Button
                                type="submit"
                                className="w-fit cursor-pointer self-end"
                            >
                                Set Budget
                            </Button>
                        </FieldSet>
                    </form>
                </div>

                <div className="w-full rounded-xl border p-5">
                    <h1 className="mb-4 text-center text-xl font-semibold">
                        Budgeting for {formatPeriod(budget_period)} Period
                    </h1>
                    {budgets.length === 0 && (
                        <p className="text-center text-sm italic">
                            ⓘ No budgets setting this month yet
                        </p>
                    )}
                    {budgets.length > 0 && (
                        <div className="flex flex-col justify-center gap-3">
                            {budgets.map((budget) => (
                                <Link
                                    key={budget.budget_id}
                                    href={'#'}
                                    className="flex w-3/4 justify-between self-center rounded-xl border p-3"
                                >
                                    <p className="text-black">
                                        {budget.category?.category_name}
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <p>{toIDR(budget.budget_amount)}</p>
                                        <ArrowUpRight />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
