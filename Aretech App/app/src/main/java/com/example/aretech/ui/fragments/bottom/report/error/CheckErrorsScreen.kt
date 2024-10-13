package com.example.aretech.ui.fragments.bottom.report.error

import android.content.Context
import com.example.aretech.R
import com.example.aretech.util.Alerts
import com.example.aretech.util.enums.Exceptions


fun checkErrorsScreen(
    error: String,
    context: Context,
    whenClosedErrorScreen:() -> Unit = {}
) {
        if (error.isNotEmpty()) {
            when (error) {
                Exceptions.IOEXCEPTION.message -> {
                    Alerts.errorIosAlert(
                        context,
                        R.drawable.no_internet_coonection,
                        error
                    ) {
                        whenClosedErrorScreen()
                    }
                }
                else -> {
                    Alerts.errorIosAlert(
                        context,
                        R.drawable.warning_icon,
                        error
                    ) {
                        whenClosedErrorScreen()
                    }
                }
            }

        }

}