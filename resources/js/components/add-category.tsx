import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { SquarePlus } from 'lucide-react';
import React from 'react';
import { route } from 'ziggy-js';
import { Input } from './ui/input';

interface TransactionTypeProps {
    type: string;
}

export function AddCategory({ type }: TransactionTypeProps) {
    const { data, setData, post } = useForm({
        category_name: '',
        category_type: type,
    });

    function submitCategory(e: React.FormEvent) {
        e.preventDefault();

        post(route('category.create'));
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="cursor-pointer hover:bg-black hover:text-white"
                >
                    <SquarePlus /> Add{' '}
                    {type.charAt(0).toUpperCase() + type.slice(1)} Category
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Add new category for {type}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Please note, this is to add a category for{' '}
                        <strong>{type}</strong>. If you want to add for another
                        type, please change the type first!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={submitCategory} className="flex flex-col gap-5">
                    <input
                        type="hidden"
                        name="category_type"
                        value={data.category_type}
                    />

                    <Input
                        id="category_name"
                        type="text"
                        name="category_name"
                        value={data.category_name}
                        onChange={(e) =>
                            setData('category_name', e.target.value)
                        }
                        placeholder="Add new category"
                        required
                    />
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogCancel
                            type="submit"
                            className="cursor-pointer bg-black text-white"
                        >
                            Create
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
