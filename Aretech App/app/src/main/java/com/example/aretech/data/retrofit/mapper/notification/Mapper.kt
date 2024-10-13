package com.example.aretech.data.retrofit.mapper.notification

import com.example.aretech.data.retrofit.retrofitmodels.notification.response.NotificationItemDto
import com.example.aretech.domain.notification.model.NotificationModel


fun NotificationItemDto.toNotificationModel() = NotificationModel(
    notificationId = notificationId ?: -1,
    isRead = isRead ?: false,
    dateDay = dateDay ?: "1/1/1800",
    dateTime = dateTime ?: "12:00:00",
    message = message ?: "",
    operationId = operationId ?: "",
    title = title ?: "",
    operation = operation ?: "",
    image = image ?: "",
)