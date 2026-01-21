import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const checkoutSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    paymentMethod: z.enum(['COD', 'Card']),
});

type ValidationResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };

/**
 * Validates data against a Zod schema.
 */
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> => {
    const result = schema.safeParse(data);
    if (!result.success) {
        return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, data: result.data };
};
