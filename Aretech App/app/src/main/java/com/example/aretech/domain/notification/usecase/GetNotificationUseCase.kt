package com.example.aretech.domain.notification.usecase

import com.example.aretech.data.retrofit.repository.notification.NotificationRepository
import com.example.aretech.domain.notification.model.NotificationModel
import com.example.aretech.domain.result.DataError
import com.example.aretech.domain.result.Results
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetNotificationUseCase @Inject constructor(
    private val repositoryNotification: NotificationRepository
) {

    operator fun invoke(): Flow<Results<List<NotificationModel>, DataError>> {
        return repositoryNotification.getAllNotifications()
    }
}
