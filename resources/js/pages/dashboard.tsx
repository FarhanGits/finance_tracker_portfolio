import { Field, FieldLabel } from '@/components/ui/field';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { formatPeriod, toIDR } from '@/lib/utils';
import { dashboard } from '@/routes';
import {
    Budget,
    CategoryList,
    TransactionList,
    type BreadcrumbItem,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DollarSign, Info, TrendingDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    transaction_period: string;
    budgets: Budget[];
    transactions: TransactionList[];
    categories: CategoryList[];
    [key: string]: unknown;
}

export default function Dashboard() {
    const { transaction_period, transactions, categories } =
        usePage<DashboardProps>().props;

    // =========================================================================
    // FOR BANNER REPORT USAGE =================================================
    // =========================================================================
    let income_total = 0;
    let expense_total = 0;
    transactions.map((transaction) =>
        transaction.category?.category_type === 'income'
            ? (income_total += transaction.transaction_amount)
            : (expense_total += transaction.transaction_amount),
    );
    const defisit = income_total - expense_total;
    // =========================================================================

    // =========================================================================
    // FOR BUDGET REPORT USAGE =================================================
    // =========================================================================
    const budgeting = [];

    function budgetWarning(percentage: number) {
        let message,
            color = '';
        if (percentage > 100) {
            message = "Stop, you're overspent!!";
            color = 'text-red-700';
        } else if (percentage == 100) {
            message = 'Stop, you have meet your limit!!';
            color = 'text-red-700';
        } else if (percentage >= 90) {
            message = "Caution, you're almost meet your limit!!";
            color = 'text-red-500';
        } else if (percentage >= 70) {
            message = "Warning, you're spending is going too high!";
            color = 'text-yellow-700';
        } else if (percentage >= 50) {
            message = "Warning, you're half way to go!";
            color = 'text-yellow-700';
        } else if (percentage < 50) {
            message = 'Good, always check your spending 😊';
            color = 'text-green-700';
        }
        const response = { message, color };
        return response;
    }

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        if (category.category_type === 'expense') {
            const category_name = category.category_name;

            const budgets = category.budgets ?? [];
            let limit = 0;
            for (let j = 0; j < budgets.length; j++) {
                limit = budgets[j].budget_amount;

                const transactions = category.transactions ?? [];
                let spent = 0;
                for (let k = 0; k < transactions.length; k++) {
                    spent += transactions[k].transaction_amount;
                }

                const precentage = (spent / limit) * 100;

                budgeting.push({
                    category: category_name,
                    limit: limit,
                    spent: spent,
                    precentage: precentage,
                    message: budgetWarning(precentage),
                });
            }
        }
    }
    console.log(budgeting);
    // =========================================================================

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | FinTrackr" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Banner Report */}
                <div className="flex items-center gap-1.5">
                    <Info />
                    <h1 className="text-xl font-semibold">
                        {formatPeriod(transaction_period)} Report
                    </h1>
                </div>
                <div className="grid auto-rows-min gap-4 max-sm:flex max-sm:flex-col md:grid-cols-3">
                    {/* INCOME */}
                    <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-green-500 to-green-600 p-5 text-white dark:border-sidebar-border">
                        <div className="flex w-full items-center justify-between">
                            <DollarSign size={60} />
                            <p className="rounded-full bg-white/30 px-3 py-1 text-base">
                                Income
                            </p>
                        </div>
                        <p className="text-lg">{toIDR(income_total)}</p>
                        <p className="text-xl">Total Income</p>
                    </div>

                    {/* EXPENSE */}
                    <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-red-500 to-red-600 p-5 text-white dark:border-sidebar-border">
                        <div className="flex w-full items-center justify-between">
                            <TrendingDown size={60} />
                            <p className="rounded-full bg-white/30 px-3 py-1 text-base">
                                Expenses
                            </p>
                        </div>
                        <p className="text-lg">{toIDR(expense_total)}</p>
                        <p className="text-xl">Total Expenses</p>
                    </div>

                    {/* RECAP */}
                    {defisit >= 0 && (
                        <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-green-500 to-green-600 p-5 text-white dark:border-sidebar-border">
                            <div className="flex w-full items-center justify-between">
                                <DollarSign size={60} />
                                <p className="h-fit rounded-xl bg-white/30 px-2 text-base">
                                    Recap
                                </p>
                            </div>
                            <p className="text-lg">{toIDR(defisit)}</p>
                            <p className="text-xl">Total Defisit</p>
                        </div>
                    )}
                    {defisit < 0 && (
                        <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-red-500 to-red-600 p-5 text-white dark:border-sidebar-border">
                            <div className="flex w-full items-center justify-between">
                                <DollarSign size={60} />
                                <p className="h-fit rounded-xl bg-white/30 px-2 text-base">
                                    Recap
                                </p>
                            </div>
                            <p className="text-lg">{toIDR(defisit)}</p>
                            <p className="text-xl">Total Defisit</p>
                        </div>
                    )}
                </div>

                {/* Budget Breakdown */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <p className="p-5 text-center text-xl font-bold">
                        Budget Breakdown
                    </p>
                    <div className="flex justify-around p-5">
                        {budgeting.map((budget) => (
                            <Field className="w-full max-w-sm">
                                <FieldLabel htmlFor="category-progress">
                                    <span>
                                        {budget.category} ({toIDR(budget.spent)}
                                        /{toIDR(budget.limit)})
                                    </span>
                                    <span className="ml-auto">
                                        {budget.precentage}%
                                    </span>
                                </FieldLabel>
                                <Progress
                                    value={budget.precentage}
                                    id="category-progress"
                                />
                                <span
                                    className={`text-sm ${budget.message.color}`}
                                >
                                    {budget.message.message}
                                </span>
                            </Field>
                        ))}
                    </div>
                </div>

                {/* Cashflow Quick Report */}
                <div className="flex gap-3">
                    {/* Highest Category for Expenses */}
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-5 md:min-h-min dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <p className="text-lg font-medium">
                            Top Spending Categories
                        </p>
                        <p className="text-sm italic">
                            ⓘ No expenses this month yet
                        </p>
                    </div>
                    {/* Highest Category for Income */}
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-5 md:min-h-min dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <p className="text-lg font-medium">
                            Top Income Sources
                        </p>
                        <p className="text-sm italic">
                            ⓘ No income this month yet
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
