package com.example.aretech.ui.activities.menu.check_result.viewModel

import androidx.lifecycle.ViewModel
import com.example.aretech.ui.activities.menu.check_result.state.CheckResultFragmentState
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class CheckResultViewModel @Inject constructor(): ViewModel() {

    val state: CheckResultFragmentState = CheckResultFragmentState()


    fun getData() {

    }
}
