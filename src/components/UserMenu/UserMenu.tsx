import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ShoppingCart } from "..";
import { ShoppingCartButton, UserMenuElement } from "./UserMenu.style";
import ShoppingCartIcon from "../../assets/shoppingCart.svg";
// import OrderContext from "../../context/OrderContext";

export const UserMenu = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = sessionStorage.getItem("userToken");

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <UserMenuElement>
      {!token ? (
        <>
          <Button size="small" onClick={() => {}}>
            Cadastre-se
          </Button>
          <Button size="small" inverse onClick={handleLogin}>
            Login
          </Button>
        </>
      ) : (
        <>
          <span>Meus pedidos</span>
          <span>Lipe</span>
          <span onClick={handleLogout}>Sair</span>
        </>
      )}
      <ShoppingCartButton onClick={handleOpen}>
        <img src={ShoppingCartIcon} alt="" />
      </ShoppingCartButton>
      <ShoppingCart
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </UserMenuElement>
  );
};
