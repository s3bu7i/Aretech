package com.example.aretech.ui.activities.menu.checks.load.model

import com.example.aretech.ui.custom_ui_componenets.util.UiText

data class CheckLoadFragmentState(
    val loadList: List<CheckItem> = emptyList(),
    val searchQuery: String = "",
    val isLoading: Boolean = false,
    val errorMessage: UiText? = null,
    val isAnyLoadStarted: Boolean = false,
    val displayingDialog: DriverLoadFragmentDialogType? = null,
    val selectedLoad: CheckItem? = null,
)
