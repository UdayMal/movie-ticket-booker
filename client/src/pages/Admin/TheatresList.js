import React, { useEffect, useState } from "react";
import { GetAllTheatres, UpdateTheatre } from "../../apicalls/theatres";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";

function TheatresList() {
  const [theatres, setTheatres] = useState([]); // ✅ Fix 1: Correct state initialization
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatres();
      dispatch(HideLoading());

      console.log("API Response:", response); // 🔍 Debugging

      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Error fetching theatres");
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Error updating theatre status");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, record) => (record.owner ? record.owner.name : "N/A"), // ✅ Fix 2: Handle undefined owner
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text) => (text ? "Approved" : "Pending / Blocked"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <span className="underline" onClick={() => handleStatusChange(record)}>
            {record.isActive ? "Block" : "Approve"}
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={theatres} rowKey="_id" /> {/* ✅ Fix 3: Add rowKey */}
    </div>
  );
}

export default TheatresList;
