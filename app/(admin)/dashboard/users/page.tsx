'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/services/userService';
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
import { Edit, Trash2 } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<any>(null); // For Sheet
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data.users || data); // Adjust based on API structure
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await userService.deleteUser(deleteId);
            toast.success("User deleted successfully");
            loadUsers();
        } catch (error) {
            toast.error("Failed to delete user");
        } finally {
            setDeleteId(null);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await userService.updateUser(editingUser._id, data);
            toast.success("User updated successfully");
            setIsSheetOpen(false);
            loadUsers();
        } catch (error) {
            toast.error("Failed to update user");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-black text-slate-900">Users</h1>
                <Button onClick={loadUsers} variant="outline">Refresh</Button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold text-slate-700 font-display'>Name</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Email</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display'>Role</TableHead>
                            <TableHead className='font-bold text-slate-700 font-display text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell>
                            </TableRow>
                        ) : users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 ring-purple-600/20' : 'bg-green-50 text-green-700 ring-green-600/20'}`}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-slate-100 hover:bg-slate-200 border-0'
                                        onClick={() => {
                                            setEditingUser(user);
                                            setIsSheetOpen(true);
                                        }}
                                    >
                                        <Edit className="h-4 w-4 text-slate-600" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className='rounded-xl bg-red-50 hover:bg-red-100 border-0'
                                        onClick={() => setDeleteId(user._id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit User Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit User</SheetTitle>
                    </SheetHeader>
                    {editingUser && (
                        <form onSubmit={handleUpdate} className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input name="name" defaultValue={editingUser.name} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input name="email" defaultValue={editingUser.email} disabled className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background opacity-50 cursor-not-allowed" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <select name="role" defaultValue={editingUser.role} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <Button type="submit" className="mt-4">Save Changes</Button>
                        </form>
                    )}
                </SheetContent>
            </Sheet>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account.
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
