package com.example.aretech.ui.activities.menu.notification.state

import com.example.aretech.ui.activities.menu.notification.DateNotificationModel
import com.example.aretech.ui.custom_ui_componenets.util.UiText

data class NotificationPageState(
    var isLoading: Boolean = true,
    val notificationReadDateAndNotifications :List<DateNotificationModel> = emptyList(),
    val notificationUnreadDateAndNotifications :List<DateNotificationModel> = emptyList(),
    var errorMessage: UiText? = null
)
