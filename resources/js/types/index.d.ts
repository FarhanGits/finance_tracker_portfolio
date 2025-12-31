import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

// For Transaction Purpose
export interface CategoryList {
    category_id: string;
    user_id: string;
    category_name: string;
    category_type: 'income' | 'expense';
}

export interface TransactionList {
    transaction_id: string;
    transaction_date: string;
    transaction_amount: number;
    transaction_type: string;
    category_name: string;
    transaction_note: string;
}