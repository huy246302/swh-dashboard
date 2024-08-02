// src/interfaces/blog.ts

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  img?: string;
  authors?: {
    name: string;
  };
  categories?: {
    name: string;
  };
  sub_categories?: {
    name: string;
  };
}

export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: number; // Ensure 'id' is a number
  name: string;
}

export interface SubCategory {
  id: number; // Ensure 'id' is a number
  name: string;
  category_id: number; // Ensure 'category_id' is a number
}

export interface Tag {
  id: string;
  name: string;
}
