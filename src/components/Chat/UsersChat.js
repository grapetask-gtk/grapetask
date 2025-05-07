// import React from 'react';
// import search from '../../assets/searchbar.webp'
// import ReadChat from './ReadChat';
// import UnRead from './UnRead';

// const UsersChat = () => {

//     return (
//         <>
//             <div className='bh-white h-100 p-3 rounded-3' style={{boxShadow:' 0px -2px 10px 0px #00000014'}}>
//                 <div className="container-fluid ">
//                     <div className="row allgigs-field">

//                         <div className=" col-12 px-0">
<<<<<<< HEAD
//                             <div className="input-group p-2 h-100 poppins">
//                                 <span className="input-group-text pt-0 pb-0" id="basic-addon1"><img src={search} width={16} alt="" /></span>
=======
//                             <div class="input-group p-2 h-100 poppins">
//                                 <span class="input-group-text pt-0 pb-0" id="basic-addon1"><img src={search} width={16} alt="" /></span>
>>>>>>> d918fe2 (cahnges by abdul qavi)
//                                 <input type="text" className="form-control p-0 font-12" id="floatingInputGroup1" placeholder="Search" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>

//         </>
//     );
// }

// export default UsersChat;
import React, { useEffect, useState } from "react";
import search from "../../assets/searchbar.webp";
import ReadChat from "./ReadChat";
import UnRead from "./UnRead";

const UsersChat = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [searchQuery, setSearchQuery] = useState(""); // State for search functionality

  // Fetch user data (replace with your API call or Redux action)
  useEffect(() => {
    // Example: Fetch users from an API
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.example.com/users"); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data); // Set the fetched users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div
        className="bh-white h-100 p-3 rounded-3"
        style={{ boxShadow: "0px -2px 10px 0px #00000014" }}
      >
        <div className="container-fluid">
          <div className="row allgigs-field">
            {/* Search Bar */}
            <div className="col-12 px-0">
              <div className="input-group p-2 h-100 poppins">
                <span className="input-group-text pt-0 pb-0" id="basic-addon1">
                  <img src={search} width={16} alt="" />
                </span>
                <input
                  type="text"
                  className="form-control p-0 font-12"
                  id="floatingInputGroup1"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
              </div>
            </div>

            {/* Display Users */}
            <div className="col-12 mt-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center mb-3 p-2 rounded-3"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <img
                      src={user.profileImage} // Replace with the actual field for the user's profile image
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h6 className="mb-0 font-14">{user.name}</h6>
                      <p className="mb-0 font-12 text-muted">
                        {user.status}
                      </p>{" "}
                      {/* Example: Online/Offline status */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center font-14 text-muted">
                  No users found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersChat;
