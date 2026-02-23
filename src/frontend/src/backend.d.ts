import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export interface Service {
    id: ServiceId;
    name: string;
    description: string;
    price: bigint;
}
export type ProductId = string;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    productType: ProductType;
    imageUrl: string;
    price: bigint;
    isTrending: boolean;
}
export enum ProductType {
    pendulum = "pendulum",
    bracelet = "bracelet",
    crystal = "crystal"
}
export interface backendInterface {
    addProduct(id: ProductId, name: string, description: string, imageUrl: string, productType: ProductType, isTrending: boolean): Promise<void>;
    addService(name: string, description: string, price: bigint): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    deleteService(id: ServiceId): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllServices(): Promise<Array<Service>>;
    getProduct(id: ProductId): Promise<Product>;
    getProductsByCategory(category: ProductType): Promise<Array<Product>>;
    getProductsByType(productType: ProductType): Promise<Array<Product>>;
    getService(id: ServiceId): Promise<Service>;
    getTrendingProducts(): Promise<Array<Product>>;
    updateProduct(id: ProductId, name: string, description: string, imageUrl: string, productType: ProductType, price: bigint, isTrending: boolean): Promise<void>;
    updateService(id: ServiceId, name: string, description: string, price: bigint): Promise<void>;
}
