import axios from "axios";
import { Product, Application, CreateApplication } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const NESTO_CANDIDATE = process.env.NEXT_PUBLIC_NESTO_CANDIDATE!;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Nesto-Candidat": NESTO_CANDIDATE,
  },
  timeout: 25000,
});

// Get Mortgage Products
export const getMortgageProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

// Create Application
export const createApplication = async (data: CreateApplication): Promise<Application> => {
  const response = await api.post("/applications", data);
  return response.data;
};

// Fetch all applications
export const getApplications = async (): Promise<Application[]> => {
  const response = await api.get<Application[]>("/applications");
  return response.data;
};

// Get Application by ID
export const getApplication = async (id: string): Promise<Application> => {
  const { data } = await api.get<Application>(`/applications/${id}`);
  return data;
};

// Update Application
export const updateApplication = async (id: string, payload: Partial<Application>): Promise<Application> => {
  const { data } = await api.put<Application>(`/applications/${id}`, payload);
  return data;
};
