import { useSelector } from "react-redux";
import { ProductAllTable } from "./productAllTable";
import { ProductRecommendedTable } from "./productRecommendedTable";
import { ProductDealTable } from "./productDealTable";

function ProductTable() {
  return (
    <>
      <ProductDealTable />
      <ProductRecommendedTable />
      <ProductAllTable />
    </>
  );
}
export default ProductTable;
