package com.example.aretech.ui.activities.menu.checks.load.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aretech.ui.activities.menu.checks.load.DriverLoadStatusState
import com.example.aretech.ui.activities.menu.checks.load.model.CheckListHistory
import com.example.aretech.ui.activities.menu.checks.load.model.CheckLoadFragmentState
import com.example.aretech.ui.activities.menu.checks.load.model.CheckItem
import com.example.aretech.util.DateStringFormat
import com.example.aretech.util.uppercaseAz
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class DriverLoadFragmentViewModel @Inject constructor(
    private val dateString: DateStringFormat,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    var state by mutableStateOf(CheckLoadFragmentState())
        private set

    val exceptionHandler = CoroutineExceptionHandler { coroutineContext, throwable ->
        Log.e("CoroutineException", "ON $coroutineContext EXCEPTION ${throwable.message} : ${throwable.localizedMessage}")
    }

    private var loadsData = emptyList<CheckItem>()

    init { onEvent(CheckListHistory.FetchData) }


    fun onEvent(event: CheckListHistory) {
        when (event) {
            is CheckListHistory.ResetErrorMessage -> state = state.copy(errorMessage = null)
            is CheckListHistory.FetchData -> fetchData()
            is CheckListHistory.OnError -> state = state.copy(errorMessage = event.message)
            is CheckListHistory.OnSearch -> state = state.copy(searchQuery = event.query)
            is CheckListHistory.OnLoadFinished -> onLoadStatusChange(DriverLoadStatusState.DRIVER_LOAD_STATUS_FINISHED)
            is CheckListHistory.OnLoadStarted -> onLoadStatusChange(DriverLoadStatusState.DRIVER_LOAD_STATUS_STARTED)
            is CheckListHistory.DisplayAlertDialog -> state = state.copy(displayingDialog = event.dialogType)
            is CheckListHistory.OnSetSelectedLoad -> state = state.copy(selectedLoad = event.load)
            is CheckListHistory.SearchFilterData -> filterData()
        }
    }

    private fun fetchData() {

    }

    private fun onLoadStatusChange(updatedStatus: Int) {
        viewModelScope.launch(exceptionHandler) {
            val load = state.loadList.find { it.price == state.selectedLoad?.price }
            load?.let {
                if (it.status + 1 != updatedStatus) return@launch
            }
        }
    }

    private fun filterData() {
        val q = state.searchQuery.uppercaseAz()
        state = state.copy(loadList = loadsData.filter { it.price.contains(q) || it.checkId.contains(q) || it.date.contains(q) || it.seller.contains(q) })
    }


    private fun barCodeScanned(barCode: String) {
        state = state.copy(searchQuery = barCode)
    }
}