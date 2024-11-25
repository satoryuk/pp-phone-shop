import {
  offer,
  order,
  product,
  dashboard,
  revanue,
  addToCart,
  profile,
  pending,
  delivery,
  add,
  addGreen,
  phone,
  category,
  stock,
} from "../Assets";

export const nav_bar = [
  { img: dashboard, label: "DashBoard", path: "" },
  { img: order, label: "Order", path: "order" },
  { img: product, label: "Product", path: "product" },
  { img: addGreen, label: "Add Product", path: "addProduct" },
  { img: offer, label: "Offer", path: "offer" },
];
export const inventory_title = [
  { title: "Total Product" },
  { title: "Categories" },
  { title: "Total Items" },
  { title: "Out Of Stock" },
];
export const ProductCategory = [
  { label: "All" },
  { label: "All" },
  { label: "All" },
  { label: "All" },
];
export const ProductSort = [
  { label: "Newest" },
  { label: "Newest" },
  { label: "Newest" },
  { label: "Newest" },
];
export const Inventory_items = [
  {
    id: "1",
    code: "001",
    name: "product1",
    category: "phone",
    brand: "iphone",
    inventory: "10",
    price: "1000",
  },
  {
    id: "2",
    code: "002",
    name: "product2",
    category: "phone",
    brand: "iphone",
    inventory: "10",
    price: "1000",
  },
  {
    id: "3",
    code: "003",
    name: "product3",
    category: "phone",
    brand: "iphone",
    inventory: "10",
    price: "1000",
  },
  {
    id: "4",
    code: "004",
    name: "product4",
    category: "phone",
    brand: "iphone",
    inventory: "10",
    price: "1000",
  },
  {
    id: "5",
    code: "005",
    name: "product5",
    category: "phone",
    brand: "iphone",
    inventory: "10",
    price: "1000",
  },
];
export const dashBoradMain_item = [
  { img: revanue },
  { img: addToCart },
  { img: profile },
];
export const tableHead = [
  "ID",
  "Product Name",
  "Category",
  "Inventory",
  "Price",
];
export const tableInfor = [
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
  {
    id: "1",
    productCode: "001",
    productName: "phone",
    category: "phone",
    inventory: "11",
    price: 100,
  },
];

export const order_header = [
  { img: addToCart, title: "Order", quantity: 32 },
  { img: pending, title: "Pending", quantity: 32 },
  { img: delivery, title: "Delivery", quantity: 32 },
];
export const offer_header = [
  { label: "Product ID" },
  { label: "Product Name" },
  { label: "Discount" },
  { label: "Start" },
  { label: "End" },
];
export const productHeader = [
  { img: phone },
  { img: category },
  { img: stock }
]
