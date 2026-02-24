import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface Appointment {
    status: string;
    dateOfBirth: string;
    createdAt: bigint;
    selectedServicePrice: bigint;
    fullName: string;
    email: string;
    selectedService: string;
    problemDescription: string;
    phone: string;
}
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    productType: ProductType;
    imageUrl: string;
    price: bigint;
    isTrending: boolean;
}
export interface UserProfile {
    name: string;
}
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(id: ProductId, name: string, description: string, imageUrl: string, productType: ProductType, isTrending: boolean): Promise<void>;
    addTarotService(name: string, description: string, price: bigint, category: ServiceCategory, isVoiceNote: boolean, isUrgent: boolean): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAppointment(fullName: string, dateOfBirth: string, phone: string, email: string, problemDescription: string, selectedService: string, selectedServicePrice: bigint): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    deleteTarotService(id: bigint): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllTarotServices(): Promise<Array<TarotService>>;
    getAppointments(): Promise<Array<Appointment>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
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
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(id: ProductId, name: string, description: string, imageUrl: string, productType: ProductType, price: bigint, isTrending: boolean): Promise<void>;
    updateTarotService(id: bigint, name: string, description: string, price: bigint, category: ServiceCategory, isVoiceNote: boolean, isUrgent: boolean): Promise<void>;
}
