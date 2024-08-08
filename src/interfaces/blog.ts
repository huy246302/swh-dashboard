export interface Author {
  author_id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  blog_id: string;
  title: string;
  content: string;
  created_at: string;
  img?: string;
  authors?: { name: string };
  categories?: { name: string };
  sub_categories?: { name: string };
  tags?: { name: string };
}


export interface Category {
  category_id: string;
  name: string;
}

export interface SubCategory {
  sub_category_id: string;
  name: string;
  category_id: string;
}

export interface Tag {
  tag_id: string;
  name: string;
}
