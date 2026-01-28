import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
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
    const { transaction_period, budgets, transactions, categories } =
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
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <p>Budget Breakdown</p>
                    <p>Dari budget:</p>
                    {budgets.map(
                        (budget) =>
                            budget.category?.category_type === 'expense' && (
                                <div key={budget.budget_id}>
                                    <p>
                                        {budget.user?.user_name},{' '}
                                        {budget.budget_amount},{' '}
                                        {budget.category?.category_name},{' '}
                                        {budget.category?.category_type}
                                    </p>
                                </div>
                            ),
                    )}
                    <p>Dari transaction:</p>
                    {transactions.map(
                        (transaction) =>
                            transaction.category?.category_type ===
                                'expense' && (
                                <div key={transaction.transaction_id}>
                                    <p>
                                        {transaction.user?.user_name},{' '}
                                        {transaction.transaction_amount},{' '}
                                        {transaction.category?.category_name},{' '}
                                        {transaction.category?.category_type}
                                    </p>
                                </div>
                            ),
                    )}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
