import axios from "axios";
import { PaginatedResponse, Category } from "@/types/product";

const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

const PRODUCT_LIST_FIELDS =
  "id,title,price,thumbnail,category,description,rating,stock";

export const fetchProducts = async ({
  limit = 10,
  skip = 0,
  sortBy = "",
  order = "",
}: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
}): Promise<PaginatedResponse> => {
  const params: any = {
    limit,
    skip,
    select: PRODUCT_LIST_FIELDS,
  };

  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  const res = await api.get("/", { params });
  console.log(res.data);
  return res.data;
};

export const searchProducts = async ({
  q,
  limit,
  skip,
  sortBy,
  order,
}: {
  q: string;
  limit: number;
  skip: number;
  sortBy?: string;
  order?: string;
}): Promise<PaginatedResponse> => {
  const params: any = {
    q,
    limit,
    skip,
    select: PRODUCT_LIST_FIELDS,
  };

  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  const res = await api.get("/search", { params });
  return res.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};

export const fetchByCategory = async ({
  category,
  limit,
  skip,
  sortBy,
  order,
}: {
  category: string;
  limit: number;
  skip: number;
  sortBy?: string;
  order?: string;
}): Promise<PaginatedResponse> => {
  const params: any = {
    limit,
    skip,
    select: PRODUCT_LIST_FIELDS,
  };

  if (sortBy) params.sortBy = sortBy;
  if (order) params.order = order;

  const res = await api.get(`/category/${category}`, { params });
  return res.data;
};
