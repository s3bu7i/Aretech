package com.example.aretech.ui.activities.menu.checks.module.viewModel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.checks.module.model.CheckModule
import com.example.aretech.ui.activities.menu.checks.module.model.ChecksModulesState
import com.example.aretech.ui.fragments.bottom.home.HomeFragmentDirections
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ChecksFragmentModuleViewModel @Inject constructor() : ViewModel() {

    var checksModuleState by mutableStateOf(ChecksModulesState())
        private set

    init {
        addDriverDocumentList()
    }
    private fun addDriverDocumentList() {
        viewModelScope.launch {
            val orderDocument = CheckModule(
                name = R.string.check_scan,
                icon = R.drawable.ic_doc_scan,
                action = HomeFragmentDirections.actionHomeFragmentToCheckScannerFragment(),
                isPermitted = true,
            )
            val saleReturnDocument = CheckModule(
                name = R.string.qr_scan,
                icon = R.drawable.ic_qr_scan,
                action = HomeFragmentDirections.actionHomeFragmentToQrCodeScannerFragment(),
                isPermitted = true,
            )
            val listOfDocuments = listOf(orderDocument, saleReturnDocument)
            checksModuleState = checksModuleState.copy(isLoading = false, list = listOfDocuments)
        }
    }
}