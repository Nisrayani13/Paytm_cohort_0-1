import { User } from "./User";
export function Users() {
    const users=[{
        _id:1,
        firstName:"User",
        lastName:"1"
    },{
        _id:2,
        firstName:"User",
        lastName:"2"
    }]
  return (
    <div>
      <div className="px-5 font-bold text-xl pb-4 mb-1.5">Users</div>
      <div className="px-5">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded border-slate-200"
        ></input>
      </div>
      {users.map((user)=>{
        return <User key={user._id} firstName={user.firstName} lastName={user.lastName}></User>
      })}
    </div>
  );
}
