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

export const adminAddProductFormControl = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "name",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter Description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter Price",
    label: "Price",
    componentType: "input",
  },

  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "men",
      },
      {
        id: "women",
        label: "women",
      },
      {
        id: "kids",
        label: "kids",
      },
    ],
  },
  {
    id: "onsale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "deliveryinfo",
    type: "text",
    placeholder: "Enter Delivery Info",
    label: "delivery info",
    componentType: "input",
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price drop",
    componentType: "input",
  },
];

export const availableSizes = [
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
  {
    id: "xl",
    label: "XL",
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyD26QBIYB-qYp2P6gVAfGxFXcRe5jXgyDg",
  authDomain: "ecommerce-2023-15d7f.firebaseapp.com",
  projectId: "ecommerce-2023-15d7f",
  storageBucket: "ecommerce-2023-15d7f.appspot.com",
  messagingSenderId: "674882012661",
  appId: "1:674882012661:web:566330e4eaff49be178cbc",
  measurementId: "G-B3L1E52VPR",
};
export const firebaseConfig2 = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket:process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};
export const firebaseUtilsUrl = "gs://ecommerce-2023-15d7f.appspot.com";