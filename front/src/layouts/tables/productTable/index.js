import { useSelector } from "react-redux";
import { ProductAllTable } from "./productAllTable";
import { ProductRecommendedTable } from "./productRecommendedTable";

function ProductTable() {
  return (
    <>
      <ProductRecommendedTable />
      <ProductAllTable />
    </>
  );
}
export default ProductTable;
