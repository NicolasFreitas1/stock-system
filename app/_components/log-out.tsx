import { logOut } from "../_actions/log-out";
import { Button } from "./ui/button";

export default function LogOut() {
  async function handleLogOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  }

  return (
    <>
      <Button variant="outline" size="lg" onClick={handleLogOut}>
        Sair
      </Button>
    </>
  );
}
