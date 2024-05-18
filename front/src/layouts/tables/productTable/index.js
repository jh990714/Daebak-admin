import { useSelector } from "react-redux";
import { ProductAllTable } from "./productAllTable";
import { ProductRecommendedTable } from "./productRecommendedTable";
import { ProductDealTable } from "./productDealTable";

function ProductTable() {
  const { status } = useSelector((state) => state.products);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProductDealTable />
      <ProductRecommendedTable />
      <ProductAllTable />
    </>
  );
}
export default ProductTable;
