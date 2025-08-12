export interface ResposePaginateProducts {
    currentPage: number;
    totalPages:  number;
    products:    Product[];
}

export interface Product {
    id:              string;
    title:           string;
    price:           number;
    description:     string;
    slug:            string;
    stock:           number;
    sizes:           string[];
    gender:          string;
    tags:            string[];
    images:          string[];
    user:            User;
    productCategory: ProductCategory;
}

export interface ProductCategory {
    id:   string;
    name: string;
}

export interface User {
    id:            string;
    email:         string;
    image:         string;
    fullName:      string;
    isActive:      boolean;
    emailVerified: boolean;
    role:          string;
}
