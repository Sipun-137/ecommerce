export const navOptions = [
  {
    id: "home",
    label: "home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingmen",
    label: "men",
    path: "/product/listing/men",
  },
  {
    id: "listingwomen",
    label: "women",
    path: "/product/listing/women",
  },
  {
    id: "listingkids",
    label: "kids",
    path: "/product/listing/kids",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "manage all product",
    path: "/admin-view/all-product",
  },
  {
    id: "adminNewProduct",
    label: "add new Product",
    path: "/admin-view/add-product",
  },
];

export const styles = {
  button:
    "mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white",
};

export const registrationFormcontrol = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "admin",
      },
      {
        id: "customer",
        label: "customer",
      },
    ],
  },
];

export const LoginFormcontrol = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];
