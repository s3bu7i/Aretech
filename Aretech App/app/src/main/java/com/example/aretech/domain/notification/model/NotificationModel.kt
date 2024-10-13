package com.example.aretech.domain.notification.model


data class NotificationModel(
    val notificationId: Int,
    val isRead: Boolean,
    val image: String,
    val message: String,
    val dateDay: String,
    val dateTime: String,
    val operationId: String,
    val operation: String,
    val title: String,
)