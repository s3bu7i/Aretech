package com.example.aretech.domain.notification.usecase

import com.example.aretech.data.retrofit.repository.notification.NotificationRepository
import com.example.aretech.util.Resources
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetUnreadNotificationCountUseCase @Inject constructor(
    private val repositoryNotification: NotificationRepository
) {
    operator fun invoke(): Flow<Resources<Int>> {
        return repositoryNotification.getUnreadNotificationCount()
    }
}