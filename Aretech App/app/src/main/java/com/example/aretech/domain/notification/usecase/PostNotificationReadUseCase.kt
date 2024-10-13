package com.example.aretech.domain.notification.usecase

import com.example.aretech.data.retrofit.repository.notification.NotificationRepository
import javax.inject.Inject

class PostNotificationReadUseCase @Inject constructor(
    private val repositoryNotification: NotificationRepository
) {

    suspend operator fun invoke(notificationId: Int) {
        repositoryNotification.postNotificationReadUseCase(notificationId)
    }
}