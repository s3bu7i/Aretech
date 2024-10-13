package com.example.aretech.domain.notification.usecase

import com.example.aretech.data.retrofit.repository.notification.NotificationRepository
import javax.inject.Inject


data class SendNotificationUseCase @Inject constructor (
    private val notificationRepository: NotificationRepository
) {
    suspend operator fun invoke(operationCode: String) {
        notificationRepository.sendAlertNotification(operationCode)
    }
}