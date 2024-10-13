package com.example.aretech.data.retrofit.repository.notification

import com.example.aretech.domain.notification.model.NotificationModel
import com.example.aretech.domain.result.DataError
import com.example.aretech.domain.result.Results
import com.example.aretech.util.Resources
import kotlinx.coroutines.flow.Flow

interface NotificationRepository {
    fun getAllNotifications(): Flow<Results<List<NotificationModel>, DataError>>
    suspend fun postNotificationReadUseCase(notificationId: Int)
    fun getUnreadNotificationCount(): Flow<Resources<Int>>
    suspend fun sendAlertNotification(code: String)
}