'use client';

import { useState, useEffect } from 'react';
import { categoryService } from '@/services/categoryService';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<any>(null); // null = new mode, obj = edit mode
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getCategories();
            // Data might be array directly depending on service
            setCategories(Array.isArray(data) ? data : data.categories || []);
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await categoryService.deleteCategory(deleteId);
            toast.success("Category deleted successfully");
            loadCategories();
        } catch (error) {
            toast.error("Failed to delete category");
        } finally {
            setDeleteId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const submissionData = new FormData();

        submissionData.append('name', formData.get('name') as string);
        submissionData.append('description', formData.get('description') as string);

        const imageInput = form.querySelector('#image') as HTMLInputElement;
        if (imageInput?.files?.length) {
            submissionData.append('image', imageInput.files[0]);
        }

        try {
            if (editingCategory) {
                await categoryService.updateCategory(editingCategory._id, submissionData);
                toast.success("Category updated successfully");
            } else {
                await categoryService.createCategory(submissionData);
                toast.success("Category created successfully");
            }
            setIsSheetOpen(false);
            loadCategories();
        } catch (error) {
            toast.error("Failed to save category");
            console.error(error);
        }
    };

    const openCreate = () => {
        setEditingCategory(null);
        setIsSheetOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black text-slate-900">Categories</h1>
                <Button onClick={openCreate} className="bg-primary hover:bg-secondary">
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold text-slate-700 font-display'>Name</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Description (Optional)</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center text-slate-500">No categories found.</TableCell>
                            </TableRow>
                        ) : categories.map((cat) => (
                            <TableRow key={cat._id}>
                                <TableCell className="font-medium">{cat.name}</TableCell>
                                <TableCell>{cat.description || '-'}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-slate-100 hover:bg-slate-200 border-0'
                                        onClick={() => {
                                            setEditingCategory(cat);
                                            setIsSheetOpen(true);
                                        }}
                                    >
                                        <Edit className="h-4 w-4 text-slate-600" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-red-50 hover:bg-red-100 border-0'
                                        onClick={() => setDeleteId(cat._id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Create/Edit Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent>
                    <SheetHeader className="px-6 pt-6 pb-2">
                        <SheetTitle>{editingCategory ? 'Edit Category' : 'New Category'}</SheetTitle>
                        <SheetDescription>
                            {editingCategory ? 'Update category details and image.' : 'Create a new category for your products.'}
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid gap-6 px-6 pb-6 pt-4">
                        <div className="space-y-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={editingCategory?.name || ''}
                                required
                                placeholder="e.g. Toys"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={editingCategory?.description || ''}
                                className="min-h-[100px]"
                                placeholder="Optional description..."
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="image">Category Image</Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                            />
                        </div>
                        <Button type="submit" className="mt-4 w-full h-11 text-base">{editingCategory ? 'Update Category' : 'Create Category'}</Button>
                    </form>
                </SheetContent>
            </Sheet>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this category.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
