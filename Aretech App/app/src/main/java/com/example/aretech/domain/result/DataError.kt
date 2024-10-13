package com.example.aretech.domain.result

sealed interface DataError: Error {
    enum class Network: DataError {
        REQUEST_TIMEOUT,
        AUTHORIZATION_FAILED,
        NO_INTERNET,
        USERNAME_INCORRECT,
        PAYLOAD_TOO_LARGE,
        SERVER_ERROR,
        UNKNOWN,
        FORBIDDEN
    }
    enum class Local: DataError {
        DISK_FULL
    }
    enum class LoginError: DataError {
        PASSWORD_INCORRECT
    }
}