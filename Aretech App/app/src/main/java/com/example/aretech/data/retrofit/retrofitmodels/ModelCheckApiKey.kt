package com.example.aretech.data.retrofit.retrofitmodels

import com.google.gson.annotations.SerializedName

data class ModelCheckApiKey(
    @SerializedName("apiKey") var apiKey: String?
)