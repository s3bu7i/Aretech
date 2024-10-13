package com.example.aretech.util

sealed class NetworkResult<T>(
    val data: T? = null, val message: String? = null
) {
    class Empty<T> : NetworkResult<T>()
    class Loading<T> : NetworkResult<T>()
    class Success<T>(data: T) : NetworkResult<T>(data)
    class Error<T>(message: String?, code: Int, data: T? = null) : NetworkResult<T>(data, message)
    class Exception<T>(exception: String) : NetworkResult<T>(message = exception)
    class Unauthorized<T>(message: String?) : NetworkResult<T>(message = message)
    class InternetConnectivityState<T>(exception: String) : NetworkResult<T>(message = exception)
}
