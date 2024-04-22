import { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/OrderContext";
import { priceFormat } from "../../helpers/priceFormat";
import { Button } from "../../components/Button/Button";
import { CategorysList, CheckoutOrder } from "./Checkout.style";
import { Layout } from "../../components/Layout/Layout";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";



export default function Checkout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setIsDrawerOpen(true);
  };

  const getPaymentOptions = async () => {
    const url = "http://localhost:8000/payment/options";
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPaymentOptions(data);
    } catch (error) {
      console.error("Erro ao obter opções de pagamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaymentOptions();
  }, []);

  const handlePaymentSelection = (event) => {
    const selectedOption = event.target.value;
    setSelectedPayment(selectedOption);
  };

  const {
    hamburgerOrder,
    appettizerOrder,
    beveregeOrder,
    comboOrder,
    dessertsOrder,
    order
  } = useContext(OrderContext);

  const handleFinalizeOrder = () => {
    if (hamburgerOrder.length > 0) {
      console.log("_________________________________");
      console.log("Hamburguers:");
      hamburgerOrder.forEach((hamburger) => {
        console.log(hamburger.name, priceFormat(hamburger.value))
      });
    }
    if (comboOrder.length > 0) {
      console.log("_________________________________");
      console.log("Combos:");
      comboOrder.forEach((combo) => {
        console.log(combo.name, priceFormat(combo.value));
      });
    }
    if (appettizerOrder.length > 0) {
      console.log("_________________________________");
      console.log("Entradas:");
      appettizerOrder.forEach((appettizer) => {
        console.log(appettizer.name, priceFormat(appettizer.value));
      });
    }
    if (beveregeOrder.length > 0) {
      console.log("_________________________________");
      console.log("Bebidas:");
      beveregeOrder.forEach((beverege) => {
        console.log(beverege.name, priceFormat(beverege.value));
      });
    }
    if (dessertsOrder.length > 0) {
      console.log("_________________________________");
      console.log("Sobremesas:");
      dessertsOrder.forEach((dessert) => {
        console.log(dessert.name, priceFormat(dessert.value));
      });
    }
    console.log("_________________________________");
    console.log("Valor Total:", priceFormat(order.totalValue));
    console.log("_________________________________");
    if (selectedPayment) {
      const selectedPaymentOption = paymentOptions.find(option => option.id === selectedPayment);
      if (selectedPaymentOption) {
        console.log("Opção de pagamento:", selectedPaymentOption.text);
      }
    }
  };

  return (
    <Layout>
      <CheckoutOrder>
        <h1>Checkout</h1>
        <h2>Carrinho de compras</h2>
        {/* HAMBURGUERS */}
        <CategorysList>
          {(hamburgerOrder.length > 0) && (
            <div>
              <p className="category"> Hamburguers: </p>
              {hamburgerOrder.map((hamburger, index) => (
                <div className="itens" key={index}>
                  <p>
                    {hamburger.name} {priceFormat(hamburger.value)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* COMBOS */}
          {(comboOrder.length > 0) && (
            <div>
              <p className="category"> Combos: </p>
              {comboOrder.map((combo, index) => (
                <div className="itens" key={index}>
                  <p>
                    {"COMBO " + combo.name} {priceFormat(combo.value)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ENTRADINHAS */}
          {(appettizerOrder.length > 0) && (
            <div>
              <p className="category"> Entradas: </p>
              {appettizerOrder.map((appettizer, index) => (
                <div className="itens" key={index}>
                  <p>
                    {appettizer.name} - {appettizer.size}{" "}
                    {priceFormat(appettizer.value)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* BEBIDAS */}
          {(beveregeOrder.length > 0) && (
            <div>
              <p className="category"> Bebidas: </p>
              {beveregeOrder.map((beverege, index) => (
                <div className="itens" key={index}>
                  <p>
                    {beverege.name} {priceFormat(beverege.value)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* SOBREMESA */}
          {(dessertsOrder.length > 0) && (
            <div>
              <p className="category"> Sobremesas: </p>
              {dessertsOrder.map((dessert, index) => (
                <div className="itens" key={index}>
                  <p>
                    {dessert.name} {priceFormat(dessert.value)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CategorysList>

        {/* Formas de pagamento */}
        {order.totalValue > 0 ? (
          <div>
            <h4>Por favor escolha a sua forma de pagamento</h4>
            {isLoading ? (
              <p>Carregando opções de pagamento...</p>
            ) : (
              <select value={selectedPayment} onChange={handlePaymentSelection}>
                {paymentOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text}
                  </option>
                ))}
              </select>
            )}
            {selectedPayment && (
              <p>Você selecionou: {paymentOptions.find((option) => option.id === selectedPayment)?.text}</p>
            )}
          </div>
        ) : null}

        {order.totalValue > 0 ? (
          <div id="checkout">
            <p>Total: {priceFormat(order.totalValue)}</p>
            <Button variant="danger" size="small" onClick={handleOpen}>Alterar pedido</Button>
            <Button variant="info" size="small" onClick={handleFinalizeOrder}>Finalizar pedido</Button>
          </div>
        ) : (
          <span> O carrinho está vazio... Experimente adicionar algo &#128521;! </span>
        )}

      </CheckoutOrder>
      <ShoppingCart
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Layout>
  );
}
