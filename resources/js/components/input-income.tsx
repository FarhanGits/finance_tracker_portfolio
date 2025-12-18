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
import { BanknoteArrowUp, CalendarIcon } from 'lucide-react';
import { useState } from 'react';
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

export function InputIncome() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(date);
    const [value, setValue] = useState(formatDate(date));

    return (
        <div className="w-full rounded-xl border p-5">
            <form method="POST" action={''}>
                <input type="hidden" name="type" value={'income'} />
                <FieldGroup>
                    <FieldSet>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                                <BanknoteArrowUp />
                                <FieldLegend>Input Your Income</FieldLegend>
                            </div>
                            <div className="flex gap-4">
                                <AddCategory type="income" />
                            </div>
                        </div>
                        <FieldDescription>
                            Ensure to fill all field to track your income
                            precisely!
                        </FieldDescription>
                        <FieldGroup>
                            <div className="flex gap-4">
                                <Field>
                                    <FieldLabel htmlFor="income-date">
                                        Date
                                    </FieldLabel>
                                    {/* Date Input */}
                                    <div className="relative flex gap-2">
                                        {/* Date Input Button */}
                                        <Input
                                            id="date"
                                            value={value}
                                            placeholder="June 01, 2025"
                                            className="border-green-600 bg-background pr-10"
                                            onChange={(e) => {
                                                const date = new Date(
                                                    e.target.value,
                                                );
                                                setValue(e.target.value);
                                                if (isValidDate(date)) {
                                                    setDate(date);
                                                    setMonth(date);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'ArrowDown') {
                                                    e.preventDefault();
                                                    setOpen(true);
                                                }
                                            }}
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
                                                        setOpen(false);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="income-amount">
                                        Amount
                                    </FieldLabel>
                                    <Input
                                        id="income-amount"
                                        type="number"
                                        placeholder="Input income amount"
                                        name="transaction_amount"
                                        className="border-green-600"
                                        required
                                    />
                                </Field>
                            </div>
                            <div className="flex gap-4">
                                <Field>
                                    <FieldLabel htmlFor="income-category">
                                        Category
                                    </FieldLabel>
                                    <Select defaultValue="">
                                        <SelectTrigger
                                            id="income-category"
                                            className="border-green-600"
                                        >
                                            <SelectValue placeholder="Choose income category" />
                                        </SelectTrigger>
                                        <SelectContent className="border-green-600">
                                            <SelectItem value="category_111">
                                                Category 1
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {/* <FieldDescription>Enter your 16-digit card number</FieldDescription> */}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="income-method">
                                        Income Method
                                    </FieldLabel>
                                    <Select defaultValue="">
                                        <SelectTrigger
                                            id="income-method"
                                            className="border-green-600"
                                        >
                                            <SelectValue placeholder="Choose income method" />
                                        </SelectTrigger>
                                        <SelectContent className="border-green-600">
                                            <SelectItem value="method_111">
                                                Method 1
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {/* <FieldDescription>Enter your 16-digit card number</FieldDescription> */}
                                </Field>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="income-note">
                                    Note
                                </FieldLabel>
                                <Textarea
                                    id="income-note"
                                    placeholder="Add any additional note by detail, because there are no 'Income Name'"
                                    className="resize-none border-green-600"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <Button
                        type="submit"
                        className="w-fit cursor-pointer bg-gradient-to-br from-green-500 to-green-600 text-base hover:bg-green-700"
                    >
                        Add Income
                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
}
