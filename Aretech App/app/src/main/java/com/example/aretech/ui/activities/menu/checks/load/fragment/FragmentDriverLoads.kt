package com.example.aretech.ui.activities.menu.checks.load.fragment

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.fragment.app.setFragmentResultListener
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.fragment.findNavController
import com.example.aretech.databinding.FragmentComposeViewBinding
import com.example.aretech.global.constants.Constants.Constants.FRAGMENT_KEY_BARCODE
import com.example.aretech.global.constants.Constants.Constants.FRAGMENT_RESULT_BARCODE_CODE
import com.example.aretech.ui.activities.menu.checks.load.model.CheckListHistory
import com.example.aretech.ui.activities.menu.checks.load.viewModel.DriverLoadFragmentViewModel
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.ui.fragments.bottom.report.error.checkErrorsScreen
import com.example.aretech.util.showActivityCloseDialog
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FragmentDriverLoads : BaseFragment<FragmentComposeViewBinding>() {

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentComposeViewBinding
        get() = FragmentComposeViewBinding::inflate

    override val bindViews: FragmentComposeViewBinding.() -> Unit = {
        binding.composeView.apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                val viewModel: DriverLoadFragmentViewModel = hiltViewModel()
                val state = viewModel.state

                LaunchedEffect(key1 = true) { onBarCodeScannerFragmentResult(viewModel::onEvent) }

                LaunchedEffect(key1 = state.errorMessage) {
                    state.errorMessage?.let { checkErrorsScreen(it.asString(context), context) { viewModel.onEvent(CheckListHistory.ResetErrorMessage) } }
                }

                LaunchedEffect(key1 = state.searchQuery) {
                    viewModel.onEvent(CheckListHistory.SearchFilterData)
                }

                CheckListHistoryScreen(
                    modifier = Modifier.fillMaxSize(), onEvent = viewModel::onEvent, state = state,
                    onBackPress = { showActivityCloseDialog(requireContext()) { findNavController().navigateUp() } },
                    launchBarCodeDialog = {  }
                )
            }
        }
    }


    private fun onBarCodeScannerFragmentResult(onEvent: (CheckListHistory) -> Unit) {
        setFragmentResultListener(FRAGMENT_KEY_BARCODE){ _, bundle->
            val barcode = bundle.getString(FRAGMENT_RESULT_BARCODE_CODE)
            if (!barcode.isNullOrBlank()) onEvent(CheckListHistory.OnSearch(barcode))
        }
    }


    override fun onResume() {
        super.onResume()
        onBackPressed()
    }

    private fun onBackPressed() {
        requireActivity().onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) { override fun handleOnBackPressed() { showActivityCloseDialog(requireContext()) { findNavController().navigateUp() } } })
    }
}