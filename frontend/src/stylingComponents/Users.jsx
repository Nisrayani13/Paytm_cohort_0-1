import { useEffect, useState } from "react";
import { User } from "./User";
import axios from "axios";
export function Users({myId}) {
  // const users=[{
  //     _id:1,
  //     firstName:"User",
  //     lastName:"1"
  // },{
  //     _id:2,
  //     firstName:"User",
  //     lastName:"2"
  // }]
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/bulk?filter=" + filter
        );
        setUsers(response.data);
      } catch (error) {
        console.log(`Failed to fetch users, Error: ${error.message}`);
      }
    };
    fetchUsers();
  }, [filter]);


  return (
    <div>
      <div className="px-5 font-bold text-xl pb-4 mb-1.5">Users</div>
      <div className="px-5">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded border-slate-200"
          onChange={(event) => {
            setFilter(event.target.value)
          }}
        ></input>
      </div>
      {users.map((user) => {
        if(user._id!==myId){
          return (
            <User
              key={user._id}
              id={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
            ></User>
          );
        }
      })}
    </div>
  );
}
