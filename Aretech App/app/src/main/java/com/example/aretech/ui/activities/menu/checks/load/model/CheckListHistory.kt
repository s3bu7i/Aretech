package com.example.aretech.ui.activities.menu.checks.load.model

import com.example.aretech.ui.custom_ui_componenets.util.UiText

sealed class CheckListHistory{
    data class OnError(val message: UiText): CheckListHistory()
    data class OnSearch(val query: String): CheckListHistory()
    data class DisplayAlertDialog(val dialogType: DriverLoadFragmentDialogType?): CheckListHistory()
    data class OnSetSelectedLoad(val load: CheckItem): CheckListHistory()
    object FetchData : CheckListHistory()
    object OnLoadStarted: CheckListHistory()
    object OnLoadFinished: CheckListHistory()
    object ResetErrorMessage : CheckListHistory()
    object SearchFilterData: CheckListHistory()
}
