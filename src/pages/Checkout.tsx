import { useNavigate } from 'react-router';
import { env } from '../config/env';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { dummyAddressData } from '../assets/assets';
import type { Address } from '../types';
import { CheckIcon, CreditCardIcon, MapIcon, MapPinIcon } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const currency = env.currency || '$';

    const { items, cartTotal } = useCart();
    const { user } = { user: { addresses: dummyAddressData } };

    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState<Address>({
        _id: '',
        label: 'Home',
        address: '',
        city: '',
        state: '',
        zip: '',
        isDefault: false,
        lat: 0,
        lng: 0,
    });

    const [paymentMethod, setPaymentMethod] = useState('card');

    const deliveryFee = cartTotal > 20 ? 0 : 100;
    const tax = cartTotal * 0.08;
    const total = cartTotal + deliveryFee + tax;

    const steps: { key: string; lable: string; icon: typeof MapPinIcon }[] = [
        { key: 'address', lable: 'Address', icon: MapIcon },
        { key: 'payment', lable: 'Payment', icon: CreditCardIcon },
        { key: 'address', lable: 'Address', icon: CheckIcon },
    ];

    const handlePlaceOrder = async () => {
        setLoading(true);
        navigate('/orders');
    };

    // Populate address from user's default address

    useEffect(() => {
        if (user?.addresses?.length) {
            const defaultAddr =
                user.addresses.find((a) => a.isDefault) || user.addresses[0];
            setAddress({
                _id: defaultAddr?._id,
                label: defaultAddr?.label,
                address: defaultAddr?.address,
                city: defaultAddr?.city,
                state: defaultAddr?.state,
                zip: '',
                isDefault: false,
                lat: 0,
                lng: 0,
            });
        }
    }, []);

    return <div>Checkout</div>;
};

export default Checkout;
