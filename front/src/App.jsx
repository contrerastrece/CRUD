import { useEffect, useRef, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { Toaster, toast } from "sonner";
import { ModalForm } from "./components/ModalForm";
import { TableProducts } from "./components/TableProducts";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "./helpers/actionsCrud";
import { validateForm } from "./helpers/validateForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const modalRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (action, data) => {
    console.log({ action, data });

    if (action === "btn_new") {
      modalRef.current.showModal();
      setProductSelected(null);
    } else if (action === "btn_edit") {
      modalRef.current.showModal();
      setProductSelected(data);
    } else if (action === "create") {
      const errors = validateForm(data);
      if (errors.isOk) {
        await createProduct(data);
        fetchData();
        modalRef.current.close();
      } else {
        Object.values(errors.response).forEach((error) => toast.error(error));
      }
    } else if (action === "update") {
      const errors = validateForm(data);
      if (errors.isOk) {
        await editProduct(data);
        fetchData();
        modalRef.current.close();
      } else {
        Object.values(errors.response).forEach((error) => toast.error(error));
      }
    } else if (action === "delete") {
      await deleteProduct(data.id);
      fetchData();
    } else if (action === "cancel") {
      setProductSelected(data);
      modalRef.current.close();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" max-w-lg mx-auto ">
      <div className=" flex gap-4 justify-between items-center my-4">
        <h2 className="text-3xl">Lista de productos</h2>
        <button
          className="btn btn-neutral btn-sm rounded "
          onClick={() => handleClick("btn_new", null)}
        >
          <span className=" flex gap-2 items-center justify-center">
            <GoPlusCircle size={15} /> Nuevo
          </span>
        </button>
      </div>

      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <TableProducts products={products} handleClick={handleClick} />
      )}

      <ModalForm
        modalRef={modalRef}
        handleClick={handleClick}
        initialValues={productSelected}
      />

      <Toaster richColors expand={true} />
    </div>
  );
}

export default App;
