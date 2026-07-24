import { SupplierAddressRequest } from "./supplier.address.request";

export interface SupplierRequest {
    name: string;
    document: string;
    phone: string;
    supplierCategoryId: number;
    addressRequests: SupplierAddressRequest[];
}