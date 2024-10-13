package com.example.aretech.ui.activities.menu.check_result.model

import com.google.gson.annotations.SerializedName

data class ProductResponseItem(
    @SerializedName("id") val id: String? =  "",
    @SerializedName("name") val name: String? =  "",
    @SerializedName("price") val price: String? = "10 azn",
    @SerializedName("edv") val edv: String? = "10 azn",
)
