
import { Shell } from "@/components/shells/shell";
import UserScreenComponent from "./screens/UsersPageScreen";

const UserPage = async() => {
  return (
    <Shell variant={"sidebar"}>
      
         <UserScreenComponent/>
  
      
    </Shell>
  );
};

export default UserPage;
