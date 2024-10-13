package com.example.aretech.ui.activities.menu.notification.state

sealed class NotificationPageEvent {
    data class NotificationReadEvent(val notificationId: Int) : NotificationPageEvent()
    object RefreshEvent: NotificationPageEvent()
}
