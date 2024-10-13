package com.example.aretech.data.retrofit.repository.notification

import com.example.aretech.data.retrofit.RetrofitServiceInstance
import com.example.aretech.data.retrofit.mapper.notification.toNotificationModel
import com.example.aretech.domain.notification.model.NotificationModel
import com.example.aretech.domain.result.DataError
import com.example.aretech.domain.result.Results
import com.example.aretech.domain.result.handleApi
import com.example.aretech.global.SessionManager
import com.example.aretech.util.Resources
import com.example.aretech.util.enums.Exceptions
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import java.io.IOException
import javax.inject.Inject

class NotificationRepositoryImpl @Inject constructor(
    private val retrofitServiceInstance: RetrofitServiceInstance,
    private val sessionManager: SessionManager
) : NotificationRepository  {

    override fun getAllNotifications(): Flow<Results<List<NotificationModel>, DataError>> = flow {
        emit(Results.Loading(true))
        emit(handleApi(
            execute = { retrofitServiceInstance.getNotificationListOfUser(sessionManager.fetchAuthToken().toString()) },
            onSuccess = { Results.Success(it.map { l -> l.toNotificationModel() }) },
            onError = { Results.Error(it) }
        ))
    }


    override fun getUnreadNotificationCount(): Flow<Resources<Int>> = flow {
        emit(Resources.Loading(true))
        try {
            val response = retrofitServiceInstance.getUnreadNotificationCount(sessionManager.fetchAuthToken().toString())
            if (response.isSuccessful && response.body() != null) emit(Resources.Success(response.body() ?: 0))
            else emit(Resources.Error(null, Exceptions.HTTPEXCEPTION.message))
        } catch (e: HttpException) {
            emit(Resources.Error(null, Exceptions.HTTPEXCEPTION.message))
        } catch (e: IOException) {
            emit(Resources.Error(null, Exceptions.IOEXCEPTION.message))
        }
    }

    override suspend fun postNotificationReadUseCase(notificationId: Int) {
        try {
            retrofitServiceInstance.postNotificationHasBeenRead(sessionManager.fetchAuthToken().toString(), notificationId)
        }catch (_: Exception) {}
    }

    override suspend fun sendAlertNotification(code: String) {
        try {
            retrofitServiceInstance.sendNotification(sessionManager.fetchAuthToken().toString(), code)
        }catch (_: Exception) {}
    }
}