import { useEffect, useState } from "react";
import { Button, CategoryList, Layout, ProductCard } from "../../components";
import { ProductCategories, ProductWrapper } from "./Desserts.style";
import {
    ProductCardContent,
    ProductCardPrice,
} from "../../components/ProductCard/ProductCard.style";

export default function Desserts() {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

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

    const getDesserts = async () => {
        const url = "http://localhost:8000/desserts"

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
        getDesserts();
    }, []);

    return (
        <Layout>
            <h1>Sobremesas</h1>
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
                                <Button onClick={() => { }}>Adicionar</Button>
                            </ProductCardContent>
                            <ProductCardPrice>
                                {priceFormat(product.value)}
                            </ProductCardPrice>
                            <img src={product.image} alt={product.title} />
                        </ProductCard>
                    ))
                )}
            </ProductWrapper>
        </Layout>
    );
}