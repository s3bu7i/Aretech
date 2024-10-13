package com.example.aretech.ui.activities.menu.check_result.state

import com.example.aretech.ui.activities.menu.check_result.model.CheckResultResponseModel

data class CheckResultFragmentState(
    val checkResult: CheckResultResponseModel? = null,
    val loading: Boolean? = false,
)
