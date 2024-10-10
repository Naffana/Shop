import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/apiSlice";
import { useEffect } from "react";
import ProductCart from "./ProductCard";

function SingleProduct() {
  const { id } = useParams();
  const navigat = useNavigate();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigat("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  return <>{!data ? <>Loading...</> : <ProductCart {...data} />}</>;
}

export default SingleProduct;
