package com.example.aretech.data.retrofit.retrofitmodels.notification.response

import com.google.gson.annotations.SerializedName

data class NotificationItemDto(

    @field:SerializedName("notification_id")
    val notificationId: Int? = null,

    @field:SerializedName("is_read")
    val isRead: Boolean? = null,

    @field:SerializedName("operation")
    val operation: String? = null,

    @field:SerializedName("image")
    val image: String? = null,

    @field:SerializedName("body")
    val message: String? = null,

    @field:SerializedName("date_time")
    val dateTime: String? = null,

    @field:SerializedName("date_day")
    val dateDay: String? = null,

    @field:SerializedName("title")
    val title: String? = null,

    @field:SerializedName("operation_id")
    val operationId: String? = null,
)