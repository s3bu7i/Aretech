package com.example.aretech.data.retrofit.retrofitmodels.home

import com.google.gson.annotations.SerializedName

data class CampaignImageDescResponseDto(

    @field:SerializedName("images")
    val images: List<String>? = null,

    @field:SerializedName("note")
    val description: String? = null
)