import { XIcon } from 'lucide-react';

type AddressFormData = {
    label: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
};

type AddressFormProps = {
    resetForm: () => void;
    handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
    form: AddressFormData;
    setForm: React.Dispatch<React.SetStateAction<AddressFormData>>;
    editingId?: string | number | null;
};

const AddressForm = ({
    resetForm,
    handleSubmit,
    form,
    setForm,
    editingId,
}: AddressFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    console.log(form);
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-50" />
            {/* form container */}
            <div
                onClick={resetForm}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-6 w-full max-w-lg animate-fade-in "
                >
                    {/* form Header */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-app-green">
                            {editingId ? 'Edit Address' : 'Add New Address'}
                        </h2>
                        <button
                            type="button"
                            className="p-2 hover:bg-app-cream rounded-lg"
                            onClick={resetForm}
                        >
                            <XIcon className="size-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor=""
                                className="block text-sm font-medium text-app-green mb-1.5"
                            >
                                Label
                            </label>
                            <input
                                type="text"
                                name="label"
                                id="label"
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                                required
                                value={form.label}
                                onChange={handleChange}
                                placeholder="Home, Work, etc."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor=""
                                className="block text-sm font-medium text-app-green mb-1.5"
                            >
                                Street Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                onChange={handleChange}
                                value={form.address}
                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                                required
                                placeholder="Home, Work, etc."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-app-green mb-1.5"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    onChange={handleChange}
                                    value={form.city}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="state"
                                    className="block text-sm font-medium text-app-green mb-1.5"
                                >
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    onChange={handleChange}
                                    value={form.state}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="zip"
                                    className="block text-sm font-medium text-app-green mb-1.5"
                                >
                                    ZIP Code
                                </label>
                                <input
                                    type="text"
                                    name="zip"
                                    id="zip"
                                    onChange={handleChange}
                                    value={form.zip}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none"
                                    required
                                />
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={form.isDefault}
                                        onChange={handleChange}
                                    />
                                    <span className="text-sm text-app-text">
                                        Set as default
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full py-3 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light transition-colors"
                    >
                        {editingId ? 'Update Address' : 'Save Address'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddressForm;
