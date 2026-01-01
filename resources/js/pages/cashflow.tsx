import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { cashflow } from '@/routes';
import { BreadcrumbItem, TransactionList } from '@/types';
import { Head, usePage } from '@inertiajs/react';

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

export default function CashFlow() {
    const { transactions } = usePage<TransactionProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cashflow History | FinTrackr" />
            <div className="flex h-fit flex-col gap-4 overflow-x-auto p-4">
                <h1 className="text-center text-2xl font-bold">
                    Your Cashflow History
                </h1>
                <div className="flex items-center justify-between">
                    {/* Search Bar */}
                    <div className="flex w-full max-w-sm items-center gap-2">
                        <Input type="email" placeholder="Search (dummy)" />
                        <Button type="submit" variant="outline">
                            Search
                        </Button>
                    </div>

                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="TimeFrame" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table className="border-t border-b">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Delete?</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow>
                            <TableCell className="font-medium">
                                {transaction.transaction_date}
                            </TableCell>
                            <TableCell>
                                {transaction.transaction_type}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </AppLayout>
    );
}
