import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CategoryList } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { BanknoteArrowDown, CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { AddCategory } from './add-category';

function formatDate(date: Date | undefined) {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !isNaN(date.getTime());
}

function toLocalDate(date: Date | undefined) {
    if (!date) {
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

interface TransactionPageProps {
    categories: CategoryList[];
    user_id: string;
    transaction_methods: string[];

    [key: string]: unknown;
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function InputExpense() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(date);
    const [value, setValue] = useState(formatDate(date));

    const { categories, user_id, transaction_methods } =
        usePage<TransactionPageProps>().props;

    const { data, setData, post } = useForm({
        category_id: '',
        transaction_date: '',
        transaction_amount: '',
        transaction_type: 'expense',
        transaction_method: '',
        transaction_note: '',
    });

    useEffect(() => {
        if (data.transaction_date) return;

        const today = new Date();
        setData('transaction_date', toLocalDate(today));
    }, [data.transaction_date, setData]);

    function submitTransaction(e: React.FormEvent) {
        e.preventDefault();

        post(route('transaction.create'));
    }

    return (
        <div className="w-full rounded-xl border p-5">
            <FieldGroup>
                <div className="flex items-center justify-between max-sm:flex-col">
                    <div className="flex gap-4">
                        <BanknoteArrowDown />
                        <FieldLegend>Input Your Expense</FieldLegend>
                    </div>
                    <div className="flex gap-4">
                        <AddCategory type="expense" />
                    </div>
                </div>
                <FieldDescription>
                    Ensure to fill all field to track your expense precisely!
                </FieldDescription>
                <form onSubmit={submitTransaction}>
                    {/* Hidden Type Input */}
                    <input
                        type="hidden"
                        name="transaction_type"
                        value={data.transaction_type}
                    />

                    <FieldSet>
                        <FieldGroup>
                            <div className="flex gap-4">
                                {/* Date Input */}
                                <Field>
                                    <FieldLabel htmlFor="expense-date">
                                        Date
                                    </FieldLabel>

                                    <div className="relative flex gap-2">
                                        {/* Date Input Button */}
                                        <Input
                                            id="date"
                                            name="transaction_date"
                                            value={value}
                                            className="bg-background pr-10"
                                            onChange={(e) => {
                                                const date = new Date(
                                                    e.target.value,
                                                );
                                                setValue(e.target.value);
                                                if (isValidDate(date)) {
                                                    setDate(date);
                                                    setMonth(date);

                                                    setData(
                                                        'transaction_date',
                                                        toLocalDate(date),
                                                    );
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                    setOpen(true);
                                                }
                                            }}
                                            required
                                        />

                                        {/* Date Input Pop-up */}
                                        <Popover
                                            open={open}
                                            onOpenChange={setOpen}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date-picker"
                                                    variant="ghost"
                                                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                                >
                                                    <CalendarIcon className="size-3.5" />
                                                    <span className="sr-only">
                                                        Select date
                                                    </span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="end"
                                                alignOffset={-8}
                                                sideOffset={10}
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    month={month}
                                                    onMonthChange={setMonth}
                                                    onSelect={(date) => {
                                                        setDate(date);
                                                        setValue(
                                                            formatDate(date),
                                                        );
                                                        setData(
                                                            'transaction_date',
                                                            toLocalDate(date),
                                                        );
                                                        setOpen(false);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </Field>

                                {/* Amount Input */}
                                <Field>
                                    <FieldLabel htmlFor="expense-amount">
                                        Amount
                                    </FieldLabel>
                                    <Input
                                        id="expense-amount"
                                        value={data.transaction_amount}
                                        type="number"
                                        placeholder="Input amount"
                                        name="transaction_amount"
                                        onChange={(e) =>
                                            setData(
                                                'transaction_amount',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </Field>
                            </div>
                            <div className="flex gap-4">
                                {/* Category Input */}
                                <Field>
                                    <FieldLabel htmlFor="expense-category">
                                        Category
                                    </FieldLabel>
                                    <Select
                                        defaultValue=""
                                        name="category_id"
                                        value={data.category_id}
                                        onValueChange={(e) =>
                                            setData('category_id', e)
                                        }
                                    >
                                        <SelectTrigger id="expense-category">
                                            <SelectValue placeholder="Choose category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories
                                                .filter(
                                                    (category) =>
                                                        category.category_type ===
                                                            'expense' &&
                                                        (category.user_id ===
                                                            null ||
                                                            category.user_id ===
                                                                user_id),
                                                )
                                                .map((category) => (
                                                    <SelectItem
                                                        key={
                                                            category.category_id
                                                        }
                                                        value={
                                                            category.category_id
                                                        }
                                                    >
                                                        {category.category_name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {/* <FieldDescription>Enter your 16-digit card number</FieldDescription> */}
                                </Field>

                                {/* Method Input */}
                                <Field>
                                    <FieldLabel htmlFor="expense-method">
                                        Expense Method
                                    </FieldLabel>
                                    <Select
                                        defaultValue=""
                                        name="transaction_method"
                                        value={data.transaction_method}
                                        onValueChange={(e) =>
                                            setData('transaction_method', e)
                                        }
                                    >
                                        <SelectTrigger id="expense-method">
                                            <SelectValue placeholder="Choose method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {transaction_methods.map(
                                                (method) => (
                                                    <SelectItem
                                                        key={method}
                                                        value={method}
                                                    >
                                                        {capitalize(method)}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {/* <FieldDescription>Enter your 16-digit card number</FieldDescription> */}
                                </Field>
                            </div>

                            {/* Note Input */}
                            <Field>
                                <FieldLabel htmlFor="expense-note">
                                    Note
                                </FieldLabel>
                                <Textarea
                                    id="expense-note"
                                    name="transaction_note"
                                    value={data.transaction_note}
                                    onChange={(e) =>
                                        setData(
                                            'transaction_note',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Add any additional note by detail, because there are no 'Expense Name'"
                                />
                            </Field>
                        </FieldGroup>

                        <FieldSeparator />

                        <Button
                            type="submit"
                            className="w-fit cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 text-base"
                        >
                            Add Expense
                        </Button>
                    </FieldSet>
                </form>
            </FieldGroup>
        </div>
    );
}
