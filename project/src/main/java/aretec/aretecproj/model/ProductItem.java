package aretec.aretecproj.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductItem implements Serializable {
    @JsonProperty("id")
    private String id;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("edvPercent")
    private Double edvPercent;

    @JsonProperty("price")
    private Double price;

    @JsonProperty("ecoLevel")
    private Integer ecoLevel;
}