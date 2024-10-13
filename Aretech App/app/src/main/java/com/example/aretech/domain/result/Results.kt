package com.example.aretech.domain.result

typealias RootError = Error

sealed interface Results<out D, out E: RootError> {
    data class Success<out D, out E: RootError>(val data: D): Results<D, E>
    data class Loading<out D,out E: RootError>(val isLoading: Boolean = true): Results<D, E>
    data class Error<out D, out E: RootError>(val error: E): Results<D, E>
}