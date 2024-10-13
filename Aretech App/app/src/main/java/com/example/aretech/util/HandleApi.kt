package com.example.aretech.util

import android.util.Log
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import retrofit2.Response

inline fun <T : Any, reified D : Any> handleApi(
    crossinline mapper: (T?) -> D?,
    crossinline execute: suspend () -> Response<T>?
): Flow<NetworkResult<D?>> {
    return flow {
        val response = execute()

        val body = response?.body()
        emit(NetworkResult.Loading())

        if (response?.isSuccessful == true) {
            if (body == null) emit(NetworkResult.Empty())
            else
                emit(NetworkResult.Success(mapper(body)))
            Log.d("NetworkResult","response.isSuccessful")
        } else {
            Log.d("NetworkResult","response.notSuccessful")
            if(response?.code() in 500..600) emit(NetworkResult.Exception(response?.errorBody().toString()))
            if(response?.code() == 400 || response?.code() in 402..500) emit(NetworkResult.Error(response?.message(),response?.code()!!))
            if(response?.code() == 401) emit(NetworkResult.Unauthorized(message = response?.raw()?.message))
        }
    }.catch {
        when (it) {
            is HttpException -> {
                emit(
                    NetworkResult.Error(
                        message = it.stackTraceToString(),
                        code = it.code()
                    )
                )
                Log.d("NetworkResult","HttpException")

            }
            else -> emit(NetworkResult.Exception(exception = it.stackTraceToString()))
        }
    }

}