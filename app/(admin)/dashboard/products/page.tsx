'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
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
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const [prodData, catData] = await Promise.all([
                productService.getProducts({}),
                categoryService.getCategories()
            ]);
            setProducts(prodData);
            setCategories(Array.isArray(catData) ? catData : catData.categories || []);
        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await productService.deleteProduct(deleteId);
            toast.success("Product deleted successfully");
            loadData();
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
            setDeleteId(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        // Clean data: convert numbers
        const data: any = Object.fromEntries(formData);
        data.price = parseFloat(data.price);
        data.stock = parseInt(data.stock);
        // Convert comma-separated string to array
        if (data.images && typeof data.images === 'string') {
            data.images = data.images.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
        } else {
            data.images = [];
        }

        // Handle checklist or boolean if any (e.g. featured)

        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, data);
                toast.success("Product updated successfully");
            } else {
                await productService.createProduct(data);
                toast.success("Product created successfully");
            }
            setIsSheetOpen(false);
            loadData();
        } catch (error) {
            toast.error("Failed to save product");
        }
    };

    const openCreate = () => {
        setEditingProduct(null);
        setIsSheetOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black text-slate-900">Products</h1>
                <Button onClick={openCreate} className="bg-primary hover:bg-secondary">
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold text-slate-700 font-display w-16'>Image</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Name</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Category</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Price</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Stock</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-500">No products found.</TableCell>
                            </TableRow>
                        ) : products.map((prod) => (
                            <TableRow key={prod._id}>
                                <TableCell>
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 relative overflow-hidden">
                                        {prod.images && Array.isArray(prod.images) && prod.images.length > 0 && typeof prod.images[0] === 'string' && prod.images[0].trim() !== '' ? (
                                            <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Img</div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{prod.name}</TableCell>
                                <TableCell className="text-slate-500">
                                    {/* Try to find category name or just show ID/string if populated */}
                                    {typeof prod.category === 'object' ? prod.category.name :
                                        categories.find(c => c._id === prod.category)?.name || 'Unknown'}
                                </TableCell>
                                <TableCell>₹{prod.price}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${prod.stock > 0 ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                                        {prod.stock}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-slate-100 hover:bg-slate-200 border-0'
                                        onClick={() => {
                                            setEditingProduct(prod);
                                            setIsSheetOpen(true);
                                        }}
                                    >
                                        <Edit className="h-4 w-4 text-slate-600" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-red-50 hover:bg-red-100 border-0'
                                        onClick={() => setDeleteId(prod._id)}
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
                <SheetContent className="overflow-y-auto sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>{editingProduct ? 'Edit Product' : 'New Product'}</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <input
                                name="name"
                                defaultValue={editingProduct?.name || ''}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                defaultValue={editingProduct?.description || ''}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background min-h-[80px]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price (₹)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingProduct?.price || ''}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Stock</label>
                                <input
                                    name="stock"
                                    type="number"
                                    defaultValue={editingProduct?.stock || ''}
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="category"
                                defaultValue={typeof editingProduct?.category === 'object' ? editingProduct.category._id : editingProduct?.category || ''}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL (Comma separated for multiple)</label>
                            {/* Simple text input for now, ideally an upload button */}
                            <input
                                name="images"
                                defaultValue={editingProduct?.images?.join(',') || ''}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                placeholder="https://..."
                            />
                            <p className="text-xs text-slate-400">Enter image URLs separated by commas.</p>
                        </div>

                        <Button type="submit" className="mt-4">{editingProduct ? 'Update' : 'Create'}</Button>
                    </form>
                </SheetContent>
            </Sheet>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this product.
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
