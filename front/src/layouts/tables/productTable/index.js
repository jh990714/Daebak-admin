import { useSelector } from "react-redux";
import { ProductAllTable } from "./productAllTable";
import { ProductRecommendedTable } from "./productRecommendedTable";
import { ProductBestTable } from "./productBestTable";

function ProductTable() {
  return (
    <>
      <ProductBestTable />
      <ProductRecommendedTable />
      <ProductAllTable />
    </>
  );
}
export default ProductTable;
