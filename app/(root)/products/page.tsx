"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./products.module.css";

const ProductsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    if (res?.data?.products) {
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className={styles.gridContainer}>
        {products.slice(0, 10).map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.productImage}
              />
            </div>
            <span className={styles.productTitle}>{item.title}</span>
          </div>
        ))}
      </div>
      <div className={styles.paginatorWrapper}>
          <span>⬅️</span>
          {[...Array(products.length / 10)
            .fill(0)
            .map((_, i) => {
              return <span key={i}>{i + 1}</span>;
            })]}
          <span></span>
          <span>➡️</span>
        </div>
    </>
  );
};

export default ProductsPage;
