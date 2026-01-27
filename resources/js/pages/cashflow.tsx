import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { capitalize, toIDR } from '@/lib/utils';
import { cashflow } from '@/routes';
import { BreadcrumbItem, TransactionList } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cashflow History',
        href: cashflow().url,
    },
];

interface TransactionProps {
    transactions: TransactionList[];

    [key: string]: unknown;
}

// type TransactionPropss = {
//     transactions: {
//         data: TransactionList[];
//         links: any[];
//         meta: any;
//     }
// }

export default function CashFlow() {
    const { transactions } = usePage<TransactionProps>().props;

    const [filters, setFilters] = useState({ timeframe: 'mtd' });

    const handleFilterChange = () => {
        router.get(
            route('cashflow'),
            { timeframe: filters.timeframe },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cashflow History | FinTrackr" />
            <div className="flex h-fit flex-col gap-4 overflow-x-auto p-4">
                <h1 className="text-center text-2xl font-bold">
                    Your Cashflow History
                </h1>
                <div className="flex items-center justify-end">
                    {/* Search Bar */}
                    {/* <div className="flex w-full max-w-sm items-center gap-2">
                        <Input type="email" placeholder="Search (dummy)" />
                        <Button type="submit" variant="outline">
                            Search
                        </Button>
                    </div> */}

                    {/* Other Filter */}
                    <div className="flex items-center gap-5">
                        {/* Timeframe */}
                        <Select
                            value={filters.timeframe}
                            onValueChange={(value) =>
                                setFilters({ timeframe: value })
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="TimeFrame" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mtd">
                                    Month-to-Date
                                </SelectItem>
                                <SelectItem value="30d">30 Days</SelectItem>
                                <SelectItem value="ytd">
                                    Year-to-Date
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            onClick={handleFilterChange}
                            className="w-fit cursor-pointer"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="border-t border-b">
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="border-r text-center">
                            Date
                        </TableHead>
                        <TableHead className="border-r text-center">
                            Type
                        </TableHead>
                        <TableHead className="border-r text-center">
                            Category
                        </TableHead>
                        <TableHead className="border-r text-center">
                            Amount
                        </TableHead>
                        <TableHead className="border-r text-center">
                            Note
                        </TableHead>
                        <TableHead className="text-center">Delete?</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow
                            className="text-center"
                            key={transaction.transaction_id}
                        >
                            <TableCell className="border-r font-medium">
                                {transaction.transaction_date}
                            </TableCell>
                            <TableCell className="flex justify-center border-r">
                                {transaction.transaction_type === 'income' ? (
                                    <p className="h-fit w-fit rounded-sm bg-gradient-to-br from-green-500 to-green-600 p-1.5 text-center text-white">
                                        {capitalize(
                                            transaction.transaction_type,
                                        )}
                                    </p>
                                ) : (
                                    <p className="h-fit w-fit rounded-sm bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 text-center text-white">
                                        {capitalize(
                                            transaction.transaction_type,
                                        )}
                                    </p>
                                )}
                            </TableCell>
                            <TableCell className="border-r">
                                {transaction.category?.category_name}
                            </TableCell>
                            <TableCell className="border-r">
                                {toIDR(transaction.transaction_amount)}
                            </TableCell>
                            <TableCell className="w-fit border-r">
                                Show Note
                            </TableCell>
                            <TableCell>
                                <form action="">Delete</form>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <p className="m-4 self-center"> ... ... Pagination ... ... </p>
            <Button className="m-4 w-fit cursor-pointer self-end">
                <a href={route('export-cashflow', filters)} target="_blank">
                    Export to PDF
                </a>
            </Button>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
