package com.example.aretech.data.retrofit.retrofitmodels.settings.model

import com.google.gson.annotations.SerializedName

data class RequestChangePasswordRequest(
    @field:SerializedName("old_password")
    val oldPassword: String,
    @field:SerializedName("new_password")
    val newPassword: String
)
