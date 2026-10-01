import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

interface Props { products: Product[]; priorityCount?: number; columns?: 3 | 4; editorial?: boolean }

export default function ProductGrid({ products, priorityCount = 0, columns = 4, editorial = false }: Props) {
  const cols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 ${cols}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} wide={editorial && columns === 3 && i === 0} />
      ))}
    </div>
  );
}
