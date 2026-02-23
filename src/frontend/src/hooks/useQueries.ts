import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Service, ProductType } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByType(productType: ProductType) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', productType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByType(productType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTrendingProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'trending'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrendingProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      productType: ProductType;
      isTrending: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addProduct(
        params.id,
        params.name,
        params.description,
        params.imageUrl,
        params.productType,
        params.isTrending
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useAddService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { name: string; description: string; price: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addService(params.name, params.description, params.price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      productType: ProductType;
      price: bigint;
      isTrending: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateProduct(
        params.id,
        params.name,
        params.description,
        params.imageUrl,
        params.productType,
        params.price,
        params.isTrending
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
