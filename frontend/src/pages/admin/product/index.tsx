import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "../../../utils/router";
import { Column } from "react-table";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TableHOC from "../../../components/admin/TableHOC";
import { Skeleton } from "../../../components/loader";
import { useAllProductsQuery } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import ProtectedRoute from "../../../components/protected-route";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!, {
    skip: !user?._id || user?.role !== "admin",
  });

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err?.data?.message || "Failed to load products");
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: (
            <img
              src={i.photos?.[0]?.url || "/products/bundle_4.png"}
              alt={i.name}
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&auto=format&fit=crop&q=60";
              }}
            />
          ),
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <ProtectedRoute
      isAuthenticated={true}
      adminOnly={true}
      admin={user?.role === "admin"}
      redirect="/"
    >
      <div className="admin-container">
        <AdminSidebar />
        <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
        <Link to="/admin/product/new" className="create-product-btn">
          <FaPlus />
        </Link>
      </div>
    </ProtectedRoute>
  );
};

export default Products;
