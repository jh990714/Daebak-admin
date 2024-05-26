import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
export const OrderManagementSystem = () => {
  const [orders, setOrders] = useState([
    { id: 1, item: "Item 1", quantity: 2, status: "Processing" },
    { id: 2, item: "Item 2", quantity: 1, status: "Shipped" },
  ]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({ item: "", quantity: "", status: "" });

  const handleClickOpen = (order = null) => {
    if (order) {
      setSelectedOrder(order);
      setNewOrder(order);
      setEditMode(true);
    } else {
      setSelectedOrder(null);
      setNewOrder({ item: "", quantity: "", status: "" });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleSaveOrder = () => {
    if (editMode) {
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id ? { ...newOrder, id: order.id } : order
        )
      );
    } else {
      setOrders([...orders, { id: orders.length + 1, ...newOrder }]);
    }
    handleClose();
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "item", headerName: "Item", width: 150, editable: true },
    { field: "quantity", headerName: "Quantity", width: 150, editable: true },
    { field: "status", headerName: "Status", width: 150, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleClickOpen(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteOrder(params.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box>
        <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
          Add Order
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? "Edit Order" : "Add New Order"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="item"
              label="Item"
              type="text"
              fullWidth
              value={newOrder.item}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              value={newOrder.quantity}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="status"
              label="Status"
              type="text"
              fullWidth
              value={newOrder.status}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveOrder} color="primary">
              {editMode ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};
