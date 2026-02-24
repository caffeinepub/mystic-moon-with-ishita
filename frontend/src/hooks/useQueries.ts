import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, TarotService, ProductType, ServiceCategory, Appointment } from '../backend';

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

export function useGetAllTarotServices() {
  const { actor, isFetching } = useActor();

  return useQuery<TarotService[]>({
    queryKey: ['tarot-services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTarotServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTarotServiceCatalog() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['tarot-services-catalog'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTarotServiceCatalog();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTarotServicesByCategory(category: ServiceCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<TarotService[]>({
    queryKey: ['tarot-services', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTarotServicesByCategory(category);
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

export function useAddTarotService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      description: string;
      price: bigint;
      category: ServiceCategory;
      isVoiceNote: boolean;
      isUrgent: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addTarotService(
        params.name,
        params.description,
        params.price,
        params.category,
        params.isVoiceNote,
        params.isUrgent
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarot-services'] });
      queryClient.invalidateQueries({ queryKey: ['tarot-services-catalog'] });
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

export function useUpdateTarotService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      name: string;
      description: string;
      price: bigint;
      category: ServiceCategory;
      isVoiceNote: boolean;
      isUrgent: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateTarotService(
        params.id,
        params.name,
        params.description,
        params.price,
        params.category,
        params.isVoiceNote,
        params.isUrgent
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarot-services'] });
      queryClient.invalidateQueries({ queryKey: ['tarot-services-catalog'] });
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

export function useDeleteTarotService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteTarotService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarot-services'] });
      queryClient.invalidateQueries({ queryKey: ['tarot-services-catalog'] });
    },
  });
}

export function useCreateAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      fullName: string;
      dateOfBirth: string;
      phone: string;
      email: string;
      problemDescription: string;
      selectedService: string;
      selectedServicePrice: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createAppointment(
        params.fullName,
        params.dateOfBirth,
        params.phone,
        params.email,
        params.problemDescription,
        params.selectedService,
        params.selectedServicePrice
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useGetAppointments() {
  const { actor, isFetching } = useActor();

  return useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}
