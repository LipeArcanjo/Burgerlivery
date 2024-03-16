import { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "./Appetizers.style";
import {
    ProductCardContent,
    ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";

export default function Appetizers() {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState("small");

    const priceFormat = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price);
    };

    const getCategories = async () => {
        const url = "http://localhost:8000/categories";

        setIsLoading(true)

        try {
            const response = await fetch(url);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const getAppetizers = async () => {
        const url = "http://localhost:8000/appetizers"

        setIsLoading(true)

        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getAppetizers();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            setSelectedPrices(Array(products.length).fill("small"));
        }
    }, [products]);

    const handlePriceChange = (index: number, price: string) => {
        let selectedPrice = price;
        if (price !== "small" && price !== "large") {
            selectedPrice = "small"; // Definir como padrão "small" se o tamanho não for válido
        }
        setSelectedPrices(prevSelectedPrices => ({
            ...prevSelectedPrices,
            [index]: selectedPrice,
        }));
    };

    return (
        <Layout>
            <h1>Entradinhas</h1>
            <ProductCategories>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    categories.map((item, index) => (
                        <CategoryList key={index} data={item} />
                    ))
                )}
            </ProductCategories>
            <ProductWrapper>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    products.map((product, index) => (
                        <ProductCard key={index}>
                            <ProductCardContent>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                {(product.values.large) === null ? (
                                    <span>Tamanho Único
                                        {Object.keys(product.values.small)}</span>
                                ) : (
                                    <>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`small_${index}`}
                                                value="small"
                                                checked={selectedPrices[index] === "small"}
                                                onChange={() => handlePriceChange(index, "small")} />
                                            <label htmlFor={`small_${index}`}>Pequeno</label>
                                        </div><div>
                                            <input
                                                type="radio"
                                                id={`large_${index}`}
                                                value="large"
                                                checked={selectedPrices[index] === "large"}
                                                onChange={() => handlePriceChange(index, "large")} />
                                            <label htmlFor={`large_${index}`}>Grande</label>
                                        </div>
                                    </>
                                )}
                                <Button onClick={() => { }}>Adicionar</Button>
                            </ProductCardContent>
                            <ProductCardPrice>
                                {(product.values.large) === null ? (
                                    priceFormat(product.values.small)
                                ) : (
                                    priceFormat(product.values[selectedPrices[index]])
                                )}
                            </ProductCardPrice>
                            <img src={product.image} alt={product.title} />
                        </ProductCard>
                    ))
                )}
            </ProductWrapper>
        </Layout>
    );
}