import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
// import React from 'react';

function App() {
  return (
    <div className="App">
      Altschool final semester exam
      <h1>My Project React App with a mysql database</h1>
      <p>Welcome :)</p>

      <h2>Start editing to see some magic happen!</h2>

      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/data')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default App;
export default App;
