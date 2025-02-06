export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      {
        name: "firstName",
        title: "First Name",
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "Discount",
        title: "Discount",
        type: "number",
      },
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "zipCode",
        title: "Zip Code",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [{ type: "reference", to: { type: "product" } }],
      },
      {
        name: "total",
        title: "Total ",
        type: "number",
      },
      {
        name: "status",
        title: "order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Completed", value: "completed" },
            { title: "Cancelled", value: "cancelled" },
          ],
          layout: "radio",
        },
        initialValue: "peding",
      },
    ],
  };
  