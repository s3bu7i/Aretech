package com.example.aretech.ui.activities.menu.check_result.model

import com.google.gson.annotations.SerializedName

data class CheckResultResponseModel(
    @SerializedName("seller") val seller: String,
    @SerializedName("products") val products: List<ProductResponseItem>,
    @SerializedName("footprint") val result: String,
)
