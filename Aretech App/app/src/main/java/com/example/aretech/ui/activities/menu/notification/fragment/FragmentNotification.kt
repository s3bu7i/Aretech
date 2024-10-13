package com.example.aretech.ui.activities.menu.notification.fragment

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import com.example.aretech.databinding.FragmentComposeViewBinding
import com.example.aretech.domain.notification.model.NotificationModel
import com.example.aretech.ui.activities.menu.notification.state.NotificationPageEvent
import com.example.aretech.ui.activities.menu.notification.view_model.FragmentNotificationPageViewModel
import com.example.aretech.ui.activities.menu.notification.views.FragmentParentNotificationView
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.ui.dialogs.PictureViewFragment
import com.example.aretech.ui.fragments.bottom.report.error.checkErrorsScreen
import com.example.aretech.util.showActivityCloseDialog
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FragmentNotification : BaseFragment<FragmentComposeViewBinding>() {
    private lateinit var navController: NavController

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentComposeViewBinding
        get() = FragmentComposeViewBinding::inflate


    override val bindViews: FragmentComposeViewBinding.() -> Unit = {
        navController = findNavController()

        binding.composeView.apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                val viewModel: FragmentNotificationPageViewModel = hiltViewModel()
                val state = viewModel.state

                LaunchedEffect(key1 = true) { viewModel.onEvent(NotificationPageEvent.RefreshEvent) }
                LaunchedEffect(key1 = state.errorMessage) {
                    if (state.errorMessage != null) checkErrorsScreen(error = state.errorMessage?.asString(context) ?: "", context = context)
                }

                FragmentParentNotificationView(state, backPress = { navController.navigateUp() }, viewModel::onEvent, viewModel.getFormattedDate(), { onNotificationClick(it) }, { onNotificationImageClick(it) })
            }
        }
    }

    private fun onNotificationImageClick(image: String) {
        PictureViewFragment.newInstance(arrayOf(image), 0).also { it.show(parentFragmentManager, PictureViewFragment.TAG) }
    }

    private fun onNotificationClick(notification: NotificationModel) {
    }

    override fun onResume() {
        super.onResume()
        onBackPressed()
    }

    fun onBackPressed() {
        requireActivity().onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    showActivityCloseDialog(requireContext()) {
                        navController.navigateUp()
                    }
                }
            })
    }
}