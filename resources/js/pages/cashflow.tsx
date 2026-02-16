import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
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
import { capitalize, formatDate, toIDR } from '@/lib/utils';
import { cashflow } from '@/routes';
import { BreadcrumbItem, Transaction } from '@/types';
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
    transactions: {
        data: Transaction[];
        links: {
            first: string;
            last: string;
            next: string;
            prev: string;
        };
        meta: {
            links: {
                active: boolean;
                label: string;
                url: string;
            }[];
        };
    };

    [key: string]: unknown;
}

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
                    <TableRow>
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
                    {transactions.data.map((transaction) => (
                        <TableRow
                            className="text-center"
                            key={transaction.transaction_id}
                        >
                            <TableCell className="border-r font-medium">
                                {formatDate(
                                    new Date(transaction.transaction_date),
                                )}
                            </TableCell>
                            <TableCell className="flex justify-center border-r">
                                {transaction.transaction_type === 'income' ? (
                                    <p className="h-fit w-fit rounded-sm bg-gradient-to-br from-green-500 to-green-600 p-1.5 text-center text-white">
                                        {capitalize(
                                            transaction.transaction_type,
                                        )}
                                    </p>
                                ) : (
                                    <p className="h-fit w-fit rounded-sm bg-gradient-to-br from-red-500 to-red-600 p-1.5 text-center text-white">
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

            {/* Pagination */}
            {transactions.meta.links.length > 3 && (
                <Pagination className="m-4">
                    <PaginationContent>
                        {transactions.meta.links.map((page) => {
                            if (page.label === 'pagination.previous') {
                                if (page.url != null) {
                                    return (
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={page.url}
                                            />
                                        </PaginationItem>
                                    );
                                }
                            } else if (page.label === 'pagination.next') {
                                if (page.url != null) {
                                    return (
                                        <PaginationItem>
                                            <PaginationNext href={page.url} />
                                        </PaginationItem>
                                    );
                                }
                            } else {
                                return (
                                    <PaginationItem className="">
                                        <PaginationLink
                                            href={page.url}
                                            isActive={page.active}
                                        >
                                            {page.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }
                        })}
                    </PaginationContent>
                </Pagination>
            )}

            <Button className="m-4 w-fit cursor-pointer self-end">
                <a href={route('export-cashflow', filters)} target="_blank">
                    Export to PDF
                </a>
            </Button>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
