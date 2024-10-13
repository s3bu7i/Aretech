package com.example.aretech.ui.activities.menu.checks.module.model

data class ChecksModulesState(
    val isLoading: Boolean = true,
    val list: List<CheckModule> = emptyList()
)