import { Suspense } from "react";
import ProductDetails from "./ProductDetails";

export default function ProductPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />
      </Suspense>
    </>
  );
}
