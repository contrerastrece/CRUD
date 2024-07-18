import { LuBadgeDollarSign } from "react-icons/lu";
import { useState, useEffect } from "react";

export const ModalForm = ({ modalRef, handleClick, initialValues }) => {
  const [formData, setFormData] = useState({ nombre: "", precio: "" });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        nombre: initialValues.nombre || "",
        precio: initialValues.precio || "",
      });
    } else {
      setFormData({ nombre: "", precio: "" });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (initialValues) {
      handleClick("update", { id: initialValues.id, ...formData });
    } else {
      handleClick("create", formData);
    }
  };

  const handleCancel = () => {
    setFormData({ nombre: "", precio: "" });
    handleClick("cancel", formData);
  };

  return (
    <dialog className="modal modal-bottom md:modal-middle" ref={modalRef}>
      <div className="modal-box">
        <h2 className="font-bold text-xl">
          {initialValues ? "Editar Producto" : "Nuevo Producto"}
        </h2>
        <form onSubmit={handleSave}>
          <div className="flex gap-2">
            {/* Input Nombre */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Nombre</span>
              </div>
              <input
                type="text"
                placeholder="Product A"
                className="input input-bordered w-full max-w-xs rounded"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
              />
            </label>

            {/* Input Precio */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Precio</span>
              </div>
              <div className="input input-bordered rounded flex items-center gap-2">
                <LuBadgeDollarSign size={20} />
                <input
                  type="number"
                  className="grow"
                  placeholder="00.00"
                  name="precio"
                  // required
                  min={0.01}
                  step={0.01}
                  value={formData.precio}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
          <div className="items-center flex flex-col gap-4 justify-center">
            <div className="modal-action w-full">
              <button
                type="button"
                className="btn btn-block btn-error rounded btn-outline text-error-content hover:text-white"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-block rounded btn-success text-success-content"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
