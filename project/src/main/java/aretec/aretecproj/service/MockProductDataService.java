package aretec.aretecproj.service;

import aretec.aretecproj.dao.CheckReponseModel;
import aretec.aretecproj.model.ProductItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MockProductDataService {

    public CheckReponseModel getMockData() {
        List<ProductItem> products = new ArrayList<>();

        ProductItem item1 = new ProductItem();
        item1.setId("1");
        item1.setProductName("Apple iPhone 14");
        item1.setEdvPercent(18.0);
        item1.setPrice(999.99);
        item1.setEcoLevel(3);
        products.add(item1);

        ProductItem item2 = new ProductItem();
        item2.setId("2");
        item2.setProductName("Samsung Galaxy S21");
        item2.setEdvPercent(18.0);
        item2.setPrice(849.99);
        item2.setEcoLevel(2);
        products.add(item2);

        ProductItem item3 = new ProductItem();
        item3.setId("3");
        item3.setProductName("Sony WH-1000XM4 Headphones");
        item3.setEdvPercent(5.0);
        item3.setPrice(299.99);
        item3.setEcoLevel(4);
        products.add(item3);

        ProductItem item4 = new ProductItem();
        item4.setId("4");
        item4.setProductName("MacBook Pro 14\"");
        item4.setEdvPercent(20.0);
        item4.setPrice(1999.00);
        item4.setEcoLevel(3);
        products.add(item4);

        ProductItem item5 = new ProductItem();
        item5.setId("5");
        item5.setProductName("Dell XPS 13 Laptop");
        item5.setEdvPercent(20.0);
        item5.setPrice(1499.00);
        item5.setEcoLevel(3);
        products.add(item5);

        ProductItem item6 = new ProductItem();
        item6.setId("6");
        item6.setProductName("Apple Watch Series 8");
        item6.setEdvPercent(12.0);
        item6.setPrice(399.99);
        item6.setEcoLevel(2);
        products.add(item6);

        ProductItem item7 = new ProductItem();
        item7.setId("7");
        item7.setProductName("Logitech MX Master 3 Mouse");
        item7.setEdvPercent(5.0);
        item7.setPrice(99.99);
        item7.setEcoLevel(4);
        products.add(item7);

        ProductItem item8 = new ProductItem();
        item8.setId("8");
        item8.setProductName("Sony PlayStation 5");
        item8.setEdvPercent(10.0);
        item8.setPrice(499.99);
        item8.setEcoLevel(3);
        products.add(item8);

        ProductItem item9 = new ProductItem();
        item9.setId("9");
        item9.setProductName("Amazon Echo Dot");
        item9.setEdvPercent(8.0);
        item9.setPrice(49.99);
        item9.setEcoLevel(1);
        products.add(item9);

        ProductItem item10 = new ProductItem();
        item10.setId("10");
        item10.setProductName("QuietComfort Earbuds");
        item10.setEdvPercent(5.0);
        item10.setPrice(279.99);
        item10.setEcoLevel(4);
        products.add(item10);

        return new CheckReponseModel(
                "Tech Superstore",
                new Date(),
                "Footprint Data Sample",
                products
        );
    }
}
