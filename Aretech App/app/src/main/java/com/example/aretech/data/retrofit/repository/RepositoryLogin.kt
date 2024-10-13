package com.example.aretech.data.retrofit.repository

import com.example.aretech.data.retrofit.RetrofitServiceInstance
import com.example.aretech.data.retrofit.retrofitmodels.ModelCheckApiKey
import com.example.aretech.data.retrofit.retrofitmodels.ModelLogin
import com.example.aretech.data.retrofit.retrofitmodels.ModelLoginResponse
import com.example.aretech.data.retrofit.retrofitmodels.ModelStandardResponse
import com.example.aretech.data.retrofit.retrofitmodels.notification.response.SimpleSuccessResponseDto
import com.example.aretech.data.retrofit.retrofitmodels.settings.model.RequestChangePasswordRequest
import com.example.aretech.domain.result.DataError
import com.example.aretech.domain.result.Results
import com.example.aretech.domain.result.handleApi
import com.example.aretech.global.SessionManager
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject

class RepositoryLogin @Inject constructor(
    private val retrofitServiceInstance: RetrofitServiceInstance,
    private val sessionManager: SessionManager
) {

    fun postLoginRepository(modelLogin: ModelLogin): Flow<Results<ModelLoginResponse, DataError.Network>> = flow {
            emit(Results.Loading(true))
            emit(handleApi(
                execute = { retrofitServiceInstance.postLoginAuthLoginInstance(modelLogin) },
                onSuccess = { Results.Success(it) },
                onError = { Results.Error(it) }
            ))
        }


    fun postCheckTokenRepository(modelCheckApiKey: ModelCheckApiKey): Flow<Results<ModelStandardResponse, DataError.Network>> = flow {
                emit(Results.Loading(true))
                emit(handleApi(
                    execute = { retrofitServiceInstance.postLoginAuthCheckApiKeyInstance(modelCheckApiKey) },
                    onSuccess = { Results.Success(it) },
                    onError = { Results.Error(it) }
                ))
            }



    fun requestChangePassword(oldPassword: String, newPassword: String): Flow<Results<SimpleSuccessResponseDto, DataError.Network>> = flow {
        emit(Results.Loading(true))
        emit(handleApi(
            execute = {
                retrofitServiceInstance.requestChangePassword(
                    sessionManager.fetchAuthToken().toString(),
                    RequestChangePasswordRequest(oldPassword = oldPassword, newPassword = newPassword)
                ) },
            onSuccess = { Results.Success(it) },
            onError = { Results.Error(it) }
        ))
    }
}