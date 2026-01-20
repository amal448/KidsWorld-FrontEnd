'use client';
import { useRouter } from 'next/navigation';
import { useShop } from '../context/ShopContext';

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
    const router = useRouter();
    const { addToCart } = useShop();

    const handleAdd = () => {
        addToCart({
            ...product,
            quantity: 1
        });
        router.push('/cart');
    };

    return (
        <button
            onClick={handleAdd}
            className="flex-1 btn-primary py-4 text-lg"
        >
            Add to Cart
        </button>
    );
}