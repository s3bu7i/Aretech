package com.example.aretech.ui.fragments.bottom.home.visit_status

import com.example.aretech.global.constants.Constants.Constants.TIME_LEFT_VISIT_STATUS_VIEW


data class VisitStatusProgress(
    var timeLeft:Int = TIME_LEFT_VISIT_STATUS_VIEW,
    var progress:Float = 0.0f
)