import { SupplierAddressResponse } from "./supplier.address.response";
import { SupplierCategoryResponse } from "./supplier.category.response";

export interface SupplierResponse {
    name: string;
    document: string;
    phone: string;
    active: boolean;
    category: SupplierCategoryResponse;
    addressRequests: SupplierAddressResponse[];
}