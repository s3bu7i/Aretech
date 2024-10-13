package com.example.aretech.ui.activities.menu.notification

import androidx.compose.runtime.Immutable
import com.example.aretech.domain.notification.model.NotificationModel

@Immutable
data class DateNotificationModel(
    val date: String,
    val notifications: List<NotificationModel>
)