import { logOut } from "../_actions/log-out";
import { Button } from "./ui/button";

export default function LogOut() {
  async function handleLogOut() {
    await logOut();
  }

  return (
    <>
      <Button variant="outline" size="lg" onClick={handleLogOut}>
        Sair
      </Button>
    </>
  );
}
