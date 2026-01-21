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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
                <SheetContent className="w-full sm:max-w-md p-0">
                    {editingUser && (
                        <div className="h-full flex flex-col">
                            {/* Profile Header */}
                            <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col items-center text-center">
                                <Avatar className="h-24 w-24 mb-4 ring-4 ring-white shadow-sm">
                                    <AvatarImage src={editingUser.avatar} />
                                    <AvatarFallback className="text-2xl bg-slate-200 text-slate-500 font-bold">
                                        {editingUser.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-bold text-slate-900">{editingUser.name}</h2>
                                <p className="text-slate-500 text-sm mb-3">{editingUser.email}</p>
                                <div className="flex gap-2 justify-center">
                                    <Badge variant="outline" className="bg-white text-slate-600 border-slate-200 px-3 capitalize">
                                        {editingUser.provider || 'email'}
                                    </Badge>
                                    {editingUser.isVerified && (
                                        <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 px-3">
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <form onSubmit={handleUpdate} className="grid gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" name="name" defaultValue={editingUser.name} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <Label htmlFor="role">Role</Label>
                                            <Select name="role" defaultValue={editingUser.role}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label>Wallet</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                                                <Input
                                                    value={editingUser.walletBalance || 0}
                                                    disabled
                                                    className="pl-7 bg-slate-50 opacity-100 text-slate-600"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label>User ID</Label>
                                        <div className="relative">
                                            <Input value={editingUser._id} disabled className="font-mono text-xs bg-slate-50 text-slate-500" />
                                        </div>
                                    </div>

                                    {editingUser.googleId && (
                                        <div className="space-y-3">
                                            <Label>Google ID</Label>
                                            <Input value={editingUser.googleId} disabled className="font-mono text-xs bg-slate-50 text-slate-500" />
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <Button type="submit" className="w-full h-11 text-base font-semibold">Save Changes</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
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
