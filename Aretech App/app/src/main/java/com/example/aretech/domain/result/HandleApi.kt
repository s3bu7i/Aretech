package com.example.aretech.domain.result

import okio.IOException
import retrofit2.HttpException
import retrofit2.Response


suspend  fun <T : Any,D:Any> handleApi(
    execute: suspend () -> Response<T>,
    onSuccess: suspend (T) -> Results<D, DataError.Network>,
    onError: suspend (DataError.Network) -> Results<D, DataError.Network>
): Results<D, DataError.Network> {
      return  try {
        val response = execute()
        val body = response.body()
        if (response.isSuccessful && body != null) {
            onSuccess(body)
        } else {
            val error = checkResponseCode(response.code())
            onError(error)
        }
    } catch (e: HttpException) {
         onError(checkResponseCode(e.code()))
    } catch (e: IOException) {
        onError(DataError.Network.NO_INTERNET)
    }
}

fun checkResponseCode(code: Int): DataError.Network {
    return when(code) {
        403 -> DataError.Network.FORBIDDEN
        408 -> DataError.Network.REQUEST_TIMEOUT
        413 -> DataError.Network.PAYLOAD_TOO_LARGE
        401 -> DataError.Network.AUTHORIZATION_FAILED
        in 500..600 -> DataError.Network.SERVER_ERROR
        else -> DataError.Network.UNKNOWN
    }
}

suspend  fun <T : Any> handleApi(execute: suspend () -> Response<T>) = handleApi(
    execute = execute,
    onSuccess = { Results.Success(it) },
    onError = { Results.Error(it) }
)

suspend  fun <T : Any,D:Any> handleApi(execute: suspend () -> Response<T>, mapper: (T) -> D) = handleApi(
    execute = execute,
    onSuccess = { Results.Success(mapper(it)) },
    onError = { Results.Error(it) }
)
