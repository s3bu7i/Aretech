package aretec.aretecproj.dao;

import aretec.aretecproj.model.ProductItem;

import java.util.Date;
import java.util.List;

public record CheckReponseModel(
        String seller,
        Date purchaseDate,
        String footPrint,
        List<ProductItem> productItem
) {
}
