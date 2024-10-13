package com.example.aretech.ui.custom_ui_componenets.util

import com.example.aretech.R
import com.example.aretech.domain.result.DataError

fun DataError.asUiText(): UiText {
    return when (this) {
        DataError.Network.REQUEST_TIMEOUT -> UiText.StringResource(
            R.string.the_request_timed_out
        )
        DataError.Network.NO_INTERNET -> UiText.StringResource(
            R.string.no_internet
        )
        DataError.Network.USERNAME_INCORRECT -> UiText.StringResource(
            R.string.login_user_incorrect
        )

        DataError.Network.PAYLOAD_TOO_LARGE -> UiText.StringResource(
            R.string.file_too_large
        )

        DataError.Network.UNKNOWN -> UiText.StringResource(
            R.string.unkown_error
        )

        DataError.Local.DISK_FULL -> UiText.DynamicString("Disk is full")

        DataError.Network.AUTHORIZATION_FAILED ->UiText.StringResource(
            R.string.authorization_failed
        )

        DataError.Network.SERVER_ERROR -> UiText.StringResource(
            R.string.server_error
        )
        DataError.Network.FORBIDDEN -> UiText.StringResource(
            R.string.forbidden
        )
        DataError.LoginError.PASSWORD_INCORRECT -> UiText.StringResource(R.string.wrong_password)
    }
}