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

    return (
        <Layout>
            <h1>Hamburgers</h1>
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

                                {/* <Button size={undefined} onClick={function (): void { } }
                                children={undefined}></Button> */}

                                <h2>{product.title
                                }</h2>
                                <p>{product.description}</p>
                                <Button onClick={() => { }}>Adicionar</Button>
                            </ProductCardContent>
                            <ProductCardPrice>
                                {priceFormat(product.values)}
                            </ProductCardPrice>
                            <img src={product.image} alt={product.title} />
                        </ProductCard>
                    ))
                )}
            </ProductWrapper>
        </Layout>
    );
}