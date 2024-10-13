package com.example.aretech.ui.activities.menu.checks.module.model

import androidx.navigation.NavDirections

data class CheckModule(
    val name:Int = 0,
    val icon:Int = 0,
    val action: NavDirections,
    val isPermitted:Boolean = false
)