import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toIDR(amount: number){
    return amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });
}

export function formatPeriod(period: string) {
    const [month_str, year_str] = period.split('-');
    const year = parseInt(year_str);
    const month_idx = parseInt(month_str) - 1;
    const month = new Date(year, month_idx).toLocaleDateString('en-US', {
        month: 'long',
    });
    const final_period = month + ' ' + year;
    return final_period;
}

export function formatDate(date: Date | undefined) {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function budgetWarning(percentage: number) {
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

// // old budget report looping
// for (let i = 0; i < categories.length; i++) {
//     const category = categories[i];
//     if (category.category_type === 'expense') {
//         const category_name = category.category_name;

//         const budgets = category.budgets ?? [];
//         let limit = 0;
//         for (let j = 0; j < budgets.length; j++) {
//             limit = budgets[j].budget_amount;

//             const transactions = category.transactions ?? [];
//             let spent = 0;
//             for (let k = 0; k < transactions.length; k++) {
//                 spent += transactions[k].transaction_amount;
//             }

//             const precentage = (spent / limit) * 100;

//             budgeting.push({
//                 category: category_name,
//                 limit: limit,
//                 spent: spent,
//                 precentage: precentage,
//                 message: budgetWarning(precentage),
//             });
//         }
//     }
// }