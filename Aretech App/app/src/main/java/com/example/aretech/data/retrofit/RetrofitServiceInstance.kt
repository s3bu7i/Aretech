package com.example.aretech.data.retrofit

import com.example.aretech.data.retrofit.retrofitmodels.ModelCheckApiKey
import com.example.aretech.data.retrofit.retrofitmodels.ModelLogin
import com.example.aretech.data.retrofit.retrofitmodels.ModelLoginResponse
import com.example.aretech.data.retrofit.retrofitmodels.ModelStandardResponse
import com.example.aretech.data.retrofit.retrofitmodels.notification.response.NotificationItemDto
import com.example.aretech.data.retrofit.retrofitmodels.notification.response.SimpleSuccessResponseDto
import com.example.aretech.data.retrofit.retrofitmodels.settings.model.RequestChangePasswordRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Query


interface RetrofitServiceInstance {

    //Login begin
    @POST("/api/LoginAuth/Login")
    suspend fun postLoginAuthLoginInstance1(@Body dataModal: ModelLogin): Response<ModelLoginResponse>

    @POST("/api/LoginAuth/Login")
    suspend fun postLoginAuthLoginInstance(@Body dataModal: ModelLogin): Response<ModelLoginResponse>

    @POST("/api/LoginAuth/CheckApiKey")
    suspend fun postLoginAuthCheckApiKeyInstance(@Body dataModal: ModelCheckApiKey): Response<ModelStandardResponse>
    //task

    @GET("/api/Notification/GetNotifications")
    suspend fun getNotificationListOfUser(
        @Header("apiKey") apiKey: String
    ): Response<List<NotificationItemDto>>


    @POST("/api/Notification/UpdateNotification")
    suspend fun postNotificationHasBeenRead(
        @Header("apiKey") apiKey: String,
        @Query("notification_id") notificationId: Int
    )

    @GET("/api/Notification/GetUnreadNotificationsCount")
    suspend fun getUnreadNotificationCount(
        @Header("apiKey") apiKey: String
    ): Response<Int?>


    @POST("/api/Notification/SendNotification")
    suspend fun sendNotification(
        @Header("apiKey") apiKey: String,
        @Query("notification_code") code: String
    )

    @POST("/api/LoginAuth/ResetPassword")
    suspend fun requestChangePassword(
        @Header("apiKey") apiKey: String,
        @Body requestChangePasswordRequest: RequestChangePasswordRequest,
    ) : Response<SimpleSuccessResponseDto>
}