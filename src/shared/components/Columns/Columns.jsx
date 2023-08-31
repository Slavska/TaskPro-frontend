import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import AddCard from "../Modal/AddCard/AddCard";
import { Modal } from "../Modal/Modal";
import EditColumn from "../Modal/EditColumn/EditColumn";

const Columns = () => {
  const { dashboardId } = useParams();
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isColumnModalOpen, setColumnModalOpen] = useState(false);

  const apiDashboard = async () => {
    if (dashboardId) {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(
        `https://taskpro-backend-c73a.onrender.com/api/column/${dashboardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setColumns(data);
    }
  };

  useEffect(() => {
    apiDashboard();
  }, [dashboardId]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleColumnModalOpen = () => {
    setColumnModalOpen(true);
  };

  const handleColumnModalClose = () => {
    setColumnModalOpen(false);
  };

  const deleteColumn = async (columnId) => {
    const token = localStorage.getItem("accessToken");
    await axios.delete(
      `https://taskpro-backend-c73a.onrender.com/api/column/${dashboardId}/${columnId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    apiDashboard();
  };

  return (
    <>
      <ul>
        {columns.map((column) => (
          <>
            <li key={column._id}>
              <div>{column.title}</div>
              <button onClick={handleColumnModalOpen}>Edit</button>
              {isColumnModalOpen && (
              <Modal onClose={handleColumnModalClose}>
                <EditColumn onCloseModal={handleColumnModalClose} />
              </Modal>
            )}
              <button onClick={() => deleteColumn(column._id)}>Delete</button>
              <Card id={column._id} />
            </li>
            <button onClick={handleModalOpen}>Add another card</button>
            {isModalOpen && (
              <Modal onClose={handleModalClose}>
                <AddCard onCloseModal={handleModalClose} />
              </Modal>
            )}
          </>
        ))}
      </ul>
    </>
  );
};

export default Columns;
