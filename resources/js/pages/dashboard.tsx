import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DollarSign, TrendingDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard | FinTrackr" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-green-500 to-green-600 p-5 text-white dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className="flex w-full items-center justify-between">
                            <DollarSign size={60} />
                            <p className="rounded-full bg-white/30 px-3 py-1 text-base">
                                Income
                            </p>
                        </div>
                        <p className="text-lg">IDR 100.000</p>
                        <p className="text-xl">Total Income</p>
                    </div>
                    <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-red-500 to-red-600 p-5 text-white dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className="flex w-full items-center justify-between">
                            <TrendingDown size={60} />
                            <p className="rounded-full bg-white/30 px-3 py-1 text-base">
                                Expenses
                            </p>
                        </div>
                        <p className="text-lg">IDR 100.000</p>
                        <p className="text-xl">Total Expenses</p>
                    </div>
                    <div className="relative flex aspect-video flex-col gap-3 overflow-hidden rounded-xl border p-5 dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className="flex w-full items-center justify-between">
                            <DollarSign size={60} />
                            <p className="h-fit rounded-xl bg-blue-700 px-2 text-base text-white">
                                Defisit
                            </p>
                        </div>
                        <p className="text-lg">IDR 100.000</p>
                        <p className="text-xl">Total Income</p>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <p>Budget Breakdown</p>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
