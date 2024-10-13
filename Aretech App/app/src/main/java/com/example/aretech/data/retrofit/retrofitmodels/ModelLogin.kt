package com.example.aretech.data.retrofit.retrofitmodels

import com.google.gson.annotations.SerializedName

data class ModelLogin(
    @SerializedName("username") var username: String?,
    @SerializedName("password") var password: String?,
    @SerializedName("deviceid") var deviceid: String = ""
)