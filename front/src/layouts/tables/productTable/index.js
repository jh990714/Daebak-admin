import { useSelector } from "react-redux";
import { AllProductTable } from "./allProductTable";
import { RecommendedProductTable } from "./recommendedProductTable";
import { DealProductTable } from "./dealProductTable";

function ProductTable() {
  const { status } = useSelector((state) => state.products);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DealProductTable />
      <RecommendedProductTable />
      <AllProductTable />
    </>
  );
}
export default ProductTable;
