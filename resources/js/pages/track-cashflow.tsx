import { DetailTransaction } from '@/components/detail-transaction';
import { InputExpense } from '@/components/input-expense';
import { InputIncome } from '@/components/input-income';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatDate, toIDR } from '@/lib/utils';
import { cashflow, trackCashflow } from '@/routes';
import { BreadcrumbItem, Transaction } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Track Cashflows',
        href: trackCashflow().url,
    },
];

interface TransactionPageProps {
    transactions: Transaction[];

    [key: string]: unknown;
}

// // For Pagination Purpose
// interface PaginationLink {
//     url: string | null;
//     label: string;
//     active: boolean;
// }
// interface Paginated<T> {
//     transactions: T[];
//     links: PaginationLink[];

//     [key: string]: unknown;
// }

export default function TrackCashflow() {
    const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income');

    // Ambil data tanpa pagination
    const { transactions } = usePage<TransactionPageProps>().props;

    // // Ambil data dengan pagination
    // const { props } = usePage<{ data: Paginated<Transaction> }>();
    // const { transactions, links } = props.data;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Track Your Cashflows | FinTrackr" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Nav */}
                <div className="border-b">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav className="flex justify-around">
                            {/* Income Nav */}
                            <button
                                onClick={() => setActiveTab('income')}
                                className={`border-b-2 px-1 pb-4 transition-colors ${
                                    activeTab === 'income'
                                        ? 'border-green-600 font-bold text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Income
                            </button>
                            {/* Expense Nav */}
                            <button
                                onClick={() => setActiveTab('expenses')}
                                className={`border-b-2 px-1 pb-4 transition-colors ${
                                    activeTab === 'expenses'
                                        ? 'border-red-600 font-bold text-red-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Expenses
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'income' && <InputIncome />}
                {activeTab === 'expenses' && <InputExpense />}

                <div className="relative h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <p className="m-5 text-center text-xl font-bold">
                        Your Last Transactions
                    </p>
                    {transactions.length === 0 && (
                        <p className="text-center text-sm italic">
                            No transactions yet
                        </p>
                    )}
                    {transactions.length > 0 && (
                        <>
                            <div className="m-5 flex justify-end">
                                <Link
                                    href={cashflow().url}
                                    className="rounded-sm border border-black p-1.5 text-sm hover:bg-black hover:text-white"
                                >
                                    View All Transaction
                                </Link>
                            </div>
                            <Table className="border-t border-b">
                                <TableCaption>
                                    Your last transaction lists
                                </TableCaption>
                                <TableHeader>
                                    <TableRow className="">
                                        <TableHead className="text-center font-black">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-center font-black">
                                            Category
                                        </TableHead>
                                        <TableHead className="text-center font-black">
                                            Amount
                                        </TableHead>
                                        <TableHead className="text-center font-black">
                                            Detail
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow
                                            className="text-center"
                                            key={transaction.transaction_id}
                                        >
                                            <TableCell className="font-medium">
                                                <p>
                                                    {formatDate(
                                                        new Date(
                                                            transaction.transaction_date,
                                                        ),
                                                    )}
                                                </p>
                                                <p className="text-sm italic">
                                                    {transaction.created_at
                                                        .split('T')[1]
                                                        .slice(0, -8)}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    transaction.category
                                                        ?.category_name
                                                }
                                            </TableCell>
                                            <TableCell className="flex justify-center">
                                                {transaction.transaction_type ===
                                                'income' ? (
                                                    <p className="h-fit w-fit rounded-sm bg-gradient-to-br from-green-500 to-green-600 p-1.5 text-center text-white">
                                                        +{' '}
                                                        {toIDR(
                                                            transaction.transaction_amount,
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p className="h-fit w-fit rounded-sm bg-gradient-to-br from-red-500 to-red-600 p-1.5 text-center text-white">
                                                        -{' '}
                                                        {toIDR(
                                                            transaction.transaction_amount,
                                                        )}
                                                    </p>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <DetailTransaction
                                                    transaction={transaction}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination, RUWET 🤦 */}
                            {/* <div className="flex gap-2">
                                {links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.visit(link.url)
                                        }
                                        className={`border px-3 py-1 ${
                                            link.active
                                                ? 'bg-black text-white'
                                                : ''
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div> */}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
