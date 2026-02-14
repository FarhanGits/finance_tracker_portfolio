import { Field, FieldLabel } from '@/components/ui/field';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { budgetWarning, formatPeriod, toIDR } from '@/lib/utils';
import { dashboard } from '@/routes';
import {
    BudgetReport,
    TopExpense,
    TopIncome,
    Transaction,
    type BreadcrumbItem,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    BanknoteArrowDown,
    BanknoteArrowUp,
    Info,
    TrendingDown,
    TrendingUp,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    transaction_period: string;
    transactions: Transaction[];
    budget_report: BudgetReport[];
    top_expense_categories: TopExpense[];
    top_income_categories: TopIncome[];
    [key: string]: unknown;
}

export default function Dashboard() {
    const {
        transaction_period,
        transactions,
        budget_report,
        top_expense_categories,
        top_income_categories,
    } = usePage<DashboardProps>().props;
    console.log(transaction_period);

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

    let limit_amount = 0;
    budget_report.map((report) => (limit_amount += report.limit));

    // =========================================================================
    // FOR EXPENSE & INCOME REPORT USAGE =======================================
    // =========================================================================
    let top_expense_amount = 0;
    top_expense_categories.map(
        (expense) => (top_expense_amount += expense.total_amount),
    );

    let top_income_amount = 0;
    top_income_categories.map(
        (income) => (top_income_amount += income.total_amount),
    );
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
                            <BanknoteArrowUp size={60} />
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
                            <BanknoteArrowDown size={60} />
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
                                <TrendingUp size={60} />
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
                                <TrendingDown size={60} />
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
                    <p className="p-5 text-xl font-bold">Budget Breakdown</p>
                    <div className="flex justify-around">
                        {limit_amount <= 0 ? (
                            <p className="text-sm italic">
                                ⓘ No budget setting this month yet
                            </p>
                        ) : (
                            budget_report.map(
                                (budget) =>
                                    budget.limit != 0 && (
                                        <Field
                                            className="w-full max-w-sm"
                                            key={budget.expense_category}
                                        >
                                            <FieldLabel htmlFor="category-progress">
                                                <span>
                                                    {budget.expense_category} (
                                                    {toIDR(budget.spent)}/
                                                    {toIDR(budget.limit)})
                                                </span>
                                                <span className="ml-auto">
                                                    {budget.percentage.toFixed(
                                                        2,
                                                    )}
                                                    %
                                                </span>
                                            </FieldLabel>
                                            <Progress
                                                value={budget.percentage}
                                                id="category-progress"
                                            />
                                            <span
                                                className={`text-sm ${budgetWarning(budget.percentage).color}`}
                                            >
                                                {
                                                    budgetWarning(
                                                        budget.percentage,
                                                    ).message
                                                }
                                            </span>
                                        </Field>
                                    ),
                            )
                        )}
                    </div>
                </div>

                {/* Cashflow Quick Report */}
                <div className="flex gap-3">
                    {/* Highest Category for Expenses */}
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-5 md:min-h-min dark:border-sidebar-border">
                        <p className="text-lg font-medium">
                            Top Spending Categories
                        </p>
                        {top_expense_amount <= 0 ? (
                            <>
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                <p className="text-sm italic">
                                    ⓘ No expenses this month yet
                                </p>
                            </>
                        ) : (
                            top_expense_categories.map(
                                (top_expense) =>
                                    top_expense.total_amount > 0 && (
                                        <p key={top_expense.category}>
                                            {top_expense.category}:{' '}
                                            {toIDR(top_expense.total_amount)}
                                        </p>
                                    ),
                            )
                        )}
                    </div>
                    {/* Highest Category for Income */}
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-5 md:min-h-min dark:border-sidebar-border">
                        <p className="text-lg font-medium">
                            Top Income Sources
                        </p>
                        {top_income_amount <= 0 ? (
                            <>
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                <p className="text-sm italic">
                                    ⓘ No income this month yet
                                </p>
                            </>
                        ) : (
                            top_income_categories.map(
                                (top_income) =>
                                    top_income.total_amount > 0 && (
                                        <p key={top_income.category}>
                                            {top_income.category}:{' '}
                                            {toIDR(top_income.total_amount)}
                                        </p>
                                    ),
                            )
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
