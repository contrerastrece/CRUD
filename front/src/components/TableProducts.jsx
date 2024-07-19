import { IoTrashBinOutline } from "react-icons/io5";
import { SlPencil } from "react-icons/sl";
import { formatearMoneda } from "../helpers/convertCurrency";

export const TableProducts = ({ products, handleClick }) => {
  return (
    <div className="overflow-x-auto h-96">
      <table className="table table-pin-rows">
        {/* head */}
        <thead className="bg-slate-500">
          <tr className="bg-slate-500 text-white">
            <th>id</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products?.length === 0 ? (
            <tr className="text-center border">
              <td colSpan={4} className="text-center">
                No hay productos 🚩
              </td>
            </tr>
          ) : (
            products?.map((p) => (
              <tr className="hover" key={p.id}>
                <th>{p.id}</th>
                <td>{p.nombre}</td>
                <td>{formatearMoneda(p.precio)}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-error btn-outline text-error-content rounded hover:text-white group"
                    onClick={() => handleClick("delete", p.id)}
                  >
                    <span className="group-hover:text-white flex gap-2">
                      Eliminar
                      <IoTrashBinOutline />
                    </span>
                  </button>
                  <button
                    className="btn btn-xs btn-warning text-warning-content rounded flex gap-2 items-center"
                    onClick={() => handleClick("btn_edit", p)}
                  >
                    Editar
                    <SlPencil />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
