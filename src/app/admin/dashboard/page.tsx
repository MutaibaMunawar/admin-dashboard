"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import ProtectedRoute from "@/app/components/protected";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  total: number;
  zipCode: string;
  discount: number;
  orderData: string;
  status: string | null;
  cartItems: {
    productName: string;
    image: string;
  }[];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "order"]{
            _id,
            firstName,
            lastName,
            email,
            phone,
            city,
            address,
            total,
            zipCode,
            discount,
            orderData,
            status,
            cartItems[] ->{
            productName,
            image}
            }`
      )
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders", error));
  }, []);

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      await client.delete(orderId);
      Swal.fire("Deleted!", "Order has been deleted.", "success");
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      Swal.fire("Error!", "Something went wrong deleting the order.", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      Swal.fire("Success!", `Order status updated to ${newStatus}.`, "success");
    } catch (error) {
      Swal.fire("Error!", "Something went wrong updating the order status.", "error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6 bg-gray-100 min-h-screen">
        <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
          <div className="flex space-x-4">
            {["All", "pending", "success", "dispatch"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-all border ${
                  filter === status
                    ? "bg-white text-red-600 font-bold border-red-600"
                    : "text-gray-700 border-transparent hover:border-gray-400"
                }`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">ID</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Address</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => filter === "All" || order.status === filter)
                .map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedOrderId(order._id === selectedOrderId ? null : order._id)}
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">{order._id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">{order.address}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {new Date(order.orderData).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">${order.total}</td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={order.status || ""}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="p-2 border rounded-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="success">Success</option>
                          <option value="dispatch">Dispatch</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(order._id);
                          }}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {selectedOrderId === order._id && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Details</h3>
                          <p className="text-sm text-gray-700">Phone: <strong>{order.phone}</strong></p>
                          <p className="text-sm text-gray-700">Email: <strong>{order.email}</strong></p>
                          <p className="text-sm text-gray-700">City: <strong>{order.city}</strong></p>
                          <ul className="mt-2 space-y-2">
                            {order.cartItems.map((item, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <span>{item.productName}</span>
                                {item.image && (
                                  <Image
                                    src={urlFor(item.image).url()}
                                    alt={item.productName}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}
