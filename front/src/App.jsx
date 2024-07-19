import { useEffect, useRef, useState, useCallback } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const modalRef = useRef(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSave = async (action, data) => {
    const errors = validateForm(data);
    if (errors.isOk) {
      if (action === "create") {
        await createProduct(data);
      } else {
        await editProduct(data);
      }
      fetchData();
      setProductSelected(null);
      setIsModalOpen(false); 
    } else {
      Object.values(errors.response).forEach((error) => toast.error(error));
    }
  };

  const handleClick = async (action, data) => {
    switch (action) {
      case "btn_new":
        setProductSelected(null);
        setIsModalOpen(true);
        break;
      case "btn_edit":
        setProductSelected(data);
        setIsModalOpen(true);
        break;
      case "create":
        await handleSave("create", data);
        break;
      case "update":
        await handleSave("update", data);
        break;
      case "delete":
        await deleteProduct(data);
        fetchData();
        break;
      case "cancel":
        setIsModalOpen(false); 
        setProductSelected(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isModalOpen) {
      setProductSelected(null); 
    }
  }, [isModalOpen]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex gap-4 justify-between items-center my-4">
        <h2 className="text-3xl">Lista de productos</h2>
        <button
          className="btn btn-neutral btn-sm rounded"
          onClick={() => handleClick("btn_new")}
        >
          <span className="flex gap-2 items-center justify-center">
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
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />

      <Toaster richColors expand={true} />
    </div>
  );
}

export default App;
