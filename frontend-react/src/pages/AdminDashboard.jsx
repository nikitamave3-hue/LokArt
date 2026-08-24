import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./admin.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";


function AdminDashboard() {


  // ==========================
  // States
  // ==========================

  const [stats, setStats] = useState({

    users: 0,
    products: 0,
    artists: 0,
    orders: 0,
    revenue: 0

  });



  const [users,setUsers] = useState([]);

  const [products,setProducts] = useState([]);

  const [orders,setOrders] = useState([]);



  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");





  // ==========================
  // Fetch Dashboard Data
  // ==========================


  const fetchDashboard = async()=>{


    try{


      setLoading(true);



      const [

        usersRes,

        productsRes,

        ordersRes,

        artistsRes


      ] = await Promise.all([


        API.get("/users"),

        API.get("/products"),

        API.get("/orders"),

        API.get("/artists")


      ]);




      const usersData = usersRes.data.users || [];

      const productsData = productsRes.data || [];

      const ordersData = ordersRes.data || [];

      const artistsData = artistsRes.data || [];




      setUsers(usersData);

      setProducts(productsData);

      setOrders(ordersData);





      const revenue = ordersData.reduce(

        (total,item)=>

        total + (item.amount || 0),

        0

      );





      setStats({


        users: usersData.length,


        products: productsData.length,


        artists: artistsData.length,


        orders: ordersData.length,


        revenue: revenue


      });




      setError("");



    }


    catch(error){


      console.log(error);


      setError(

        "Dashboard data load nahi ho paya"

      );


    }



    finally{


      setLoading(false);


    }



  };





  useEffect(()=>{


    fetchDashboard();


  },[]);
// ==========================
// Chart Data
// ==========================


const chartData = [

  {
    name: "Users",
    value: stats.users
  },

  {
    name: "Products",
    value: stats.products
  },

  {
    name: "Artists",
    value: stats.artists
  },

  {
    name: "Orders",
    value: stats.orders
  }

];





const orderData = [

  {
    name: "Orders",
    count: stats.orders
  },

  {
    name: "Products",
    count: stats.products
  },

  {
    name: "Users",
    count: stats.users
  }

];





const colors = [

  "#ff7a00",

  "#8b4513",

  "#008000",

  "#0066ff"

];





// ==========================
// Return JSX
// ==========================


return (

<div className="admin-dashboard">



{/* Header */}

<div className="admin-header">


<h1>
LokArt Admin Dashboard
</h1>



<button

className="refresh-btn"

onClick={fetchDashboard}

>

Refresh

</button>



</div>





{

loading ?


<h2>
Loading Dashboard...
</h2>



:

<>


{/* Stats Cards */}


<div className="stats-container">



<div className="stat-card">

<h3>
Total Users
</h3>

<p>
{stats.users}
</p>

</div>





<div className="stat-card">

<h3>
Total Products
</h3>

<p>
{stats.products}
</p>

</div>





<div className="stat-card">

<h3>
Total Artists
</h3>

<p>
{stats.artists}
</p>

</div>





<div className="stat-card">

<h3>
Total Orders
</h3>

<p>
{stats.orders}
</p>

</div>





<div className="stat-card">

<h3>
Revenue
</h3>


<p>

₹ {stats.revenue}

</p>


</div>



</div>





{/* Charts Section Start */}


<div className="charts-box">


<div className="chart-card">


<h2>
Platform Overview
</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={chartData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

chartData.map((item,index)=>(


<Cell

key={index}

fill={colors[index]}

/>


))


}



</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>



</div>
{/* Second Chart */}

<div className="chart-card">


<h2>
Analytics
</h2>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={orderData}>


<CartesianGrid 

strokeDasharray="3 3"

/>



<XAxis 

dataKey="name"

/>



<YAxis />



<Tooltip />



<Bar

dataKey="count"

/>



</BarChart>


</ResponsiveContainer>



</div>


</div>





{/* Users Table */}


<div className="table-box">


<h2>
Latest Users
</h2>




<table>


<thead>


<tr>

<th>
Name
</th>


<th>
Email
</th>


</tr>


</thead>




<tbody>


{


users.slice(0,5).map((user)=>(


<tr key={user._id}>


<td>

{user.name}

</td>



<td>

{user.email}

</td>



</tr>



))


}



</tbody>


</table>



</div>





{/* Products Table */}


<div className="table-box">


<h2>
Latest Products
</h2>



<table>


<thead>


<tr>


<th>
Product
</th>


<th>
Price
</th>


</tr>


</thead>




<tbody>



{


products.slice(0,5).map((product)=>(



<tr key={product._id}>


<td>

{
product.title || product.name
}

</td>



<td>

₹ {product.price}

</td>



</tr>



))


}



</tbody>


</table>



</div>




{/* Orders Table */}


<div className="table-box">


<h2>
Latest Orders
</h2>




<table>


<thead>


<tr>


<th>
Order ID
</th>


<th>
Status
</th>


</tr>


</thead>




<tbody>



{


orders.slice(0,5).map((order)=>(



<tr key={order._id}>


<td>

{

order._id ?

order._id.slice(0,8)

:

"NA"

}

</td>




<td>

{

order.status || "Pending"

}

</td>



</tr>



))


}



</tbody>


</table>



</div>





</>


}





{

error &&


<p className="error">

{error}

</p>


}



</div>


);



}



export default AdminDashboard;