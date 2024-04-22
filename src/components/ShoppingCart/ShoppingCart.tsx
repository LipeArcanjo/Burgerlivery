import { useContext } from "react";
import OrderContext from "../../context/OrderContext";
import { ShoppingCartElement } from "./ShoppingCart.style";
import { priceFormat } from "../../helpers/priceFormat";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const {
    hamburgerOrder,
    appettizerOrder,
    beveregeOrder,
    comboOrder,
    dessertsOrder,
    order,
    setOrder
  } = useContext(OrderContext);

  const handleRemoveItem = (index, category) => {
    const updateOrder = () => {
      switch (category) {
        case "hamburger":
          order.hamburger.splice(index, 1);
          break;
        case "appettizer":
          order.appettizer.splice(index, 1);
          break;
        case "beverege":
          order.beverege.splice(index, 1);
          break;
        case "combo":
          order.combo.splice(index, 1);
          break;
        case "dessert":
          order.dessert.splice(index, 1);
          break;
        default:
          break;
      }
    };

    updateOrder();

    // Recalcular o valor total após a remoção do item
    const subtotal = [
      ...getPrices(order.hamburger),
      ...getPrices(order.appettizer),
      ...getPrices(order.beverege),
      ...getPrices(order.combo),
      ...getPrices(order.dessert),
    ];
    const totalValue = sumValues(subtotal);

    setOrder({ ...order, totalValue });
  };

  // Não consegui importar essas const :(
  const sumValues = (arrayValues) => {
    return arrayValues.reduce(
      (acumulador, valorAtual) => acumulador + Number(valorAtual),
      0
    );
  };

  const getPrices = (values) => {
    const result = values.map((item) => item.value);
    return result;
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <ShoppingCartElement open={isOpen}>
      {/* Botão pra fechar o carrinho */}
      <Button size="small" onClick={onClose}>Fechar Carrinho</Button>

      <h1>Carrinho de compras</h1>
      {/* HAMBURGUERS */}
      {(hamburgerOrder.length > 0) ?
        <div>
          <p className="category"> Hamburguers: </p>
          {hamburgerOrder.map((hamburger, index) => (
            <div className="itens">
              <p key={index}>
                {hamburger.name} {priceFormat(hamburger.value)}
              </p>
              <Button variant="danger" size="small" onClick={() => handleRemoveItem(index, "hamburger")}>Remover item</Button>
            </div>
          ))}
        </div>
        :
        null
      }
      {/* COMBOS */}
      {comboOrder.length > 0 ?
        <div>
          <p className="category"> Combos: </p>
          {comboOrder.map((combo, index) => (
            <div className="itens">
              <p key={index}>
                {"COMBO " + combo.name} {priceFormat(combo.value)}
              </p>
              <Button variant="danger" size="small" onClick={() => handleRemoveItem(index, "combo")}>Remover item</Button>
            </div>
          ))}
        </div>
        :
        null
      }

      {/* ENTRADINHAS */}
      {appettizerOrder.length > 0 ?
        <div>
          <p className="category"> Entradas: </p>
          {appettizerOrder.map((appettizer, index) => (
            <div className="itens">
              <p key={index}>
                {appettizer.name} - {appettizer.size}{" "}
                {priceFormat(appettizer.value)}
              </p>
              <Button variant="danger" size="small" onClick={() => handleRemoveItem(index, "appettizer")}>Remover item</Button>
            </div>
          ))}
        </div>
        :
        null
      }

      {/* BEBIDAS */}
      {beveregeOrder.length > 0 ?
        <div>
          <p className="category"> Bebidas: </p>
          {beveregeOrder.map((beverege, index) => (
            <div className="itens">
              <p key={index}>
                {beverege.name} {priceFormat(beverege.value)}
              </p>
              <Button variant="danger" size="small" onClick={() => handleRemoveItem(index, "beverege")}>Remover item</Button>
            </div>
          ))}
        </div>
        :
        null
      }

      {/* SOBREMESA */}
      {dessertsOrder.length > 0 ?
        <div>
          <p className="category"> Sobremesas: </p>
          {dessertsOrder.map((dessert, index) => (
            <div className="itens">
              <p key={index}>
                {dessert.name} {priceFormat(dessert.value)}
              </p>
              <Button variant="danger" size="small" onClick={() => handleRemoveItem(index, "dessert")}>Remover item</Button>
            </div>
          ))}
        </div>
        :
        null
      }

      {order.totalValue > 0 ?
        <div id="checkout">
          <p>Total: {priceFormat(order.totalValue)}</p>
          <Button variant="info" size="small" onClick={handleClick}>Finalizar pedido</Button>
        </div>
        :
        <span> O carrinho está vazio... Experimente adicionar algo &#128521;! </span>
      }

    </ShoppingCartElement>
  );
};