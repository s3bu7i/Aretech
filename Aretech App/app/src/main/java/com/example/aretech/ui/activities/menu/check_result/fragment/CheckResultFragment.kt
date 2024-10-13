package com.example.aretech.ui.activities.menu.check_result.fragment

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import com.example.aretech.databinding.FragmentComposeViewBinding
import com.example.aretech.ui.activities.menu.check_result.viewModel.CheckResultViewModel
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.util.showActivityCloseDialog

class CheckResultFragment : BaseFragment<FragmentComposeViewBinding>() {

    private lateinit var navController: NavController

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentComposeViewBinding
        get() = FragmentComposeViewBinding::inflate

    override val bindViews: FragmentComposeViewBinding.() -> Unit = {
        navController = findNavController()
        binding.composeView.apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                val viewModel: CheckResultViewModel = hiltViewModel()
                val state = viewModel.state

                CheckResultFragmentScreen(state, onBackPress = { showActivityCloseDialog(requireContext()) { findNavController().navigateUp() } })
            }
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