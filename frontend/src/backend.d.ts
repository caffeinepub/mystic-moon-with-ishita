import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    productType: ProductType;
    imageUrl: string;
    price: bigint;
    isTrending: boolean;
}
export interface TarotService {
    id: bigint;
    isUrgent: boolean;
    name: string;
    description: string;
    category: ServiceCategory;
    price: bigint;
    isVoiceNote: boolean;
}
export type ProductId = string;
export enum ProductType {
    pendulum = "pendulum",
    bracelet = "bracelet",
    crystal = "crystal"
}
export enum ServiceCategory {
    careerMoneyLife = "careerMoneyLife",
    premiumExclusive = "premiumExclusive",
    miniReading = "miniReading",
    deepDetailed = "deepDetailed",
    loveRelationship = "loveRelationship"
}
export interface backendInterface {
    addProduct(id: ProductId, name: string, description: string, imageUrl: string, productType: ProductType, isTrending: boolean): Promise<void>;
    addTarotService(name: string, description: string, price: bigint, category: ServiceCategory, isVoiceNote: boolean, isUrgent: boolean): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    deleteTarotService(id: bigint): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTarotServices(): Promise<Array<TarotService>>;
    getProduct(id: ProductId): Promise<Product>;
    getProductsByCategory(category: ProductType): Promise<Array<Product>>;
    getProductsByType(productType: ProductType): Promise<Array<Product>>;
    getTarotService(id: bigint): Promise<TarotService>;
    getTarotServiceCatalog(): Promise<{
        careerMoneyLife: Array<TarotService>;
        premiumExclusive: Array<TarotService>;
        miniReadings: Array<TarotService>;
        deepDetailed: Array<TarotService>;
        loveRelationship: Array<TarotService>;
    }>;
    getTarotServicesByCategory(category: ServiceCategory): Promise<Array<TarotService>>;
    getTrendingProducts(): Promise<Array<Product>>;
    updateProduct(id: ProductId, name: string, description: string, imageUrl: string, productType: ProductType, price: bigint, isTrending: boolean): Promise<void>;
    updateTarotService(id: bigint, name: string, description: string, price: bigint, category: ServiceCategory, isVoiceNote: boolean, isUrgent: boolean): Promise<void>;
}
