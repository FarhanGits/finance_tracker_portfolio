import { InputExpense } from '@/components/input-expense';
import { InputIncome } from '@/components/input-income';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard, trackCashflow } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Track Cashflows',
        href: trackCashflow().url,
    },
];

export default function TrackCashflow() {
    const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income');

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
                                        ? 'border-blue-600 font-bold text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Expenses
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div> */}
                {activeTab === 'income' && <InputIncome />}
                {activeTab === 'expenses' && <InputExpense />}

                <div className="relative h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <p>Your Last Five Transactions</p>
                </div>
            </div>
        </AppLayout>
    );
}
