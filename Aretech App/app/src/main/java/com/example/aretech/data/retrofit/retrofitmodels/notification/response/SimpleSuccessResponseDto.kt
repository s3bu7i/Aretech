package com.example.aretech.data.retrofit.retrofitmodels.notification.response

import com.google.gson.annotations.SerializedName

data class SimpleSuccessResponseDto(
    @field:SerializedName("code")
    val code: Int? = null,

    @field:SerializedName("message")
    val message: String? = null
)