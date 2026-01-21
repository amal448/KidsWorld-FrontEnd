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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    const [specs, setSpecs] = useState<{ key: string, value: string }[]>([]);

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
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // We need to construct a new FormData to ensure we only send what's needed
        // and handle file inputs correctly if they are empty
        const submissionData = new FormData();

        submissionData.append('name', formData.get('name') as string);
        submissionData.append('description', formData.get('description') as string);
        submissionData.append('price', formData.get('price') as string);
        submissionData.append('category', formData.get('category') as string);

        // Handle Specifications
        const specsObject = specs.reduce((acc, curr) => {
            if (curr.key.trim() && curr.value.trim()) {
                acc[curr.key.trim()] = curr.value.trim();
            }
            return acc;
        }, {} as Record<string, string>);
        submissionData.append('specifications', JSON.stringify(specsObject));

        // Handle Images
        const imageInput = form.querySelector('#images') as HTMLInputElement;
        if (imageInput?.files?.length) {
            Array.from(imageInput.files).forEach((file) => {
                submissionData.append('images', file);
            });
        }

        // Handle Video
        const videoInput = form.querySelector('#heroVideo') as HTMLInputElement;
        if (videoInput?.files?.length) {
            submissionData.append('heroVideo', videoInput.files[0]);
        }

        // If editing and no new images/video selected, the backend should handle retaining old ones
        // typically logic: if images param is present, replace; if not, keep.
        // But for formData, if we don't append 'images', it might not verify 'required' if strictly checked.
        // Assuming backend handles partial updates for files gracefully or we're just adding now.

        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, submissionData);
                toast.success("Product updated successfully");
            } else {
                await productService.createProduct(submissionData);
                toast.success("Product created successfully");
            }
            setIsSheetOpen(false);
            loadData();
        } catch (error) {
            toast.error("Failed to save product");
            console.error(error);
        }
    };

    const openCreate = () => {
        setEditingProduct(null);
        setSpecs([]);
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
                            <TableHead className='font-bold text-slate-700 font-display text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-slate-500">No products found.</TableCell>
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
                                    {prod.category && typeof prod.category === 'object' ? prod.category.name :
                                        categories.find(c => c._id === prod.category)?.name || 'Unknown'}
                                </TableCell>
                                <TableCell>₹{prod.price}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-slate-100 hover:bg-slate-200 border-0'
                                        onClick={() => {
                                            setEditingProduct(prod);
                                            // Convert specifications object to array
                                            if (prod.specifications && typeof prod.specifications === 'object') {
                                                const specArray = Object.entries(prod.specifications).map(([key, value]) => ({
                                                    key,
                                                    value: String(value)
                                                }));
                                                setSpecs(specArray);
                                            } else {
                                                setSpecs([]);
                                            }
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
                    <SheetHeader className="px-6 pt-6 pb-2">
                        <SheetTitle>{editingProduct ? 'Edit Product' : 'New Product'}</SheetTitle>
                        <SheetDescription>
                            {editingProduct ? 'Update the product details below.' : 'Fill in the information to create a new product.'}
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid gap-6 px-6 pb-6 pt-4">
                        <div className="space-y-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={editingProduct?.name || ''}
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={editingProduct?.description || ''}
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label>Specifications</Label>
                            <div className="space-y-2">
                                {specs.map((spec, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="Key (e.g. Color)"
                                            value={spec.key}
                                            onChange={(e) => {
                                                const newSpecs = [...specs];
                                                newSpecs[index].key = e.target.value;
                                                setSpecs(newSpecs);
                                            }}
                                            className="flex-1"
                                        />
                                        <Input
                                            placeholder="Value (e.g. Red)"
                                            value={spec.value}
                                            onChange={(e) => {
                                                const newSpecs = [...specs];
                                                newSpecs[index].value = e.target.value;
                                                setSpecs(newSpecs);
                                            }}
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                                const newSpecs = specs.filter((_, i) => i !== index);
                                                setSpecs(newSpecs);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSpecs([...specs, { key: '', value: '' }])}
                                    className="w-full mt-2 border-dashed text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                >
                                    <Plus className="h-3 w-3 mr-1" /> Add Specification
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label htmlFor="price">Price (₹)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={editingProduct?.price || ''}
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="category">Category</Label>
                                <Select name="category" defaultValue={editingProduct?.category && typeof editingProduct?.category === 'object' ? editingProduct.category._id : editingProduct?.category || ''}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => (
                                            <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="images">Product Images (Max 5)</Label>
                            <Input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                accept="image/*"
                                className="cursor-pointer"
                            />
                            <p className="text-xs text-slate-400">Select up to 5 images.</p>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="heroVideo">Hero Video (Optional)</Label>
                            <Input
                                id="heroVideo"
                                name="heroVideo"
                                type="file"
                                accept="video/*"
                                className="cursor-pointer"
                            />
                        </div>

                        <Button type="submit" className="mt-4 w-full h-11 text-base">{editingProduct ? 'Update Product' : 'Create Product'}</Button>
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
        </div >
    );
}
