import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "./redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

const Home = () => {
  let [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.maX = max);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  const columnSize = keyword ? 4 : 3

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title="Buy Best Product Online" />

      <div className="container">
        <div className="row">
        {keyword && 
        <div className="col-6 col-md-3 mt-5">

        <Filters/>

        </div>
         }
          <div className={keyword? "col-6 col-sm-9 " :  "col-12 col-sm-6 col-md-12"}>
            <h1 id="products_heading" className="text-secondary">
              {keyword
                ? `${data?.products?.length} Product Found With Keyword: ${keyword}`
                : "Latest Products"}
            </h1>

            <section id="products" className="mt-5">
              <div className="row">
                {isLoading ? (
                  <p>Loading products...</p>
                ) : (
                  data?.products?.map((product) => (
                    <ProductItem key={product._id} product={product}  columnSize={columnSize}/>
                  ))
                )}
              </div>
            </section>

            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
