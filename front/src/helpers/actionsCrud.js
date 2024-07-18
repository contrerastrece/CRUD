import { toast } from "sonner";

let response;
const url = "http://localhost:5053/api/Product";


export const getAllProducts = async () => {
  try {
    const response = await fetch(`${url}/Lista`);
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createProduct = async (data) => {
  try {
    response = await fetch(`${url}/Guardar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      toast.success(responseData.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    response = await fetch(`${url}/Eliminar/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const responseData = await response.json();
      toast.warning(responseData.message);
    } else {
      const errorData = await response.json();
      toast.error(errorData.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const editProduct = async (data) => {
  console.log(data,'🚩')
  try {
    const response = await fetch(`${url}/Editar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      toast.success(responseData.message);
    } else {
      const errorData = await response.json();
      toast.error(errorData.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
