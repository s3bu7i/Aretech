package com.example.aretech.ui.fragments.bottom.settings.tablayout

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.viewModels
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import com.example.aretech.R
import com.example.aretech.databinding.FragmentSettingsGeneralBinding
import com.example.aretech.domain.result.Results
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.ui.custom_ui_componenets.util.asUiText
import com.example.aretech.ui.fragments.bottom.report.error.checkErrorsScreen
import com.example.aretech.ui.fragments.bottom.settings.dialog.ChangePasswordDialog
import com.example.aretech.ui.fragments.bottom.settings.viewmodel.SettingsFragmentViewModel
import com.example.aretech.util.Alerts
import com.example.aretech.util.Alerts.showSendLoadingAlert
import com.example.aretech.util.observerAsEvents
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class SettingsGeneralFragment : BaseFragment<FragmentSettingsGeneralBinding>() {

    private val viewModel: SettingsFragmentViewModel by viewModels()
    private lateinit var navController: NavController
    private var alertDialog: AlertDialog? = null
    private val changePasswordDialog: ChangePasswordDialog by lazy { ChangePasswordDialog() }

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSettingsGeneralBinding
        get() = FragmentSettingsGeneralBinding::inflate

    override val bindViews: FragmentSettingsGeneralBinding.() -> Unit
        get() = {
            navController = findNavController()

            cvLogout.setOnClickListener {
                alertDialog = Alerts.attentionDialog(requireContext(),
                    getString(R.string.are_you_sure_log_out),
                    getString(R.string.btn_yes),
                    getString(R.string.close), {
                        viewModel.removeToken()
                        navController.navigate(R.id.action_settingsFragment_to_activityLogin)
                    }, {
                        alertDialog?.dismiss()
                    })
            }

            cvRefresh.setOnClickListener {
                alertDialog = Alerts.attentionDialog(requireContext(),
                    getString(R.string.data_will_refresh),
                    getString(R.string.refresh),
                    getString(R.string.close), {

                    }, {
                        alertDialog?.dismiss()
                    })
            }

            cvChangePassword.setOnClickListener {
                if (viewModel.isPasswordChangePermit) changePasswordDialog.show(childFragmentManager, ChangePasswordDialog.TAG)
                else Toast.makeText(requireContext(), getString(R.string.permission_denied), Toast.LENGTH_SHORT).show()
            }


        observerAsEvents(viewModel.passwordChangeState, viewLifecycleOwner) {
            when (it) {
                is Results.Success -> {
                    alertDialog?.dismiss()
                    showToast(getString(R.string.password_changed_success))
                    viewModel.removeToken()
                    navController.navigate(R.id.action_settingsFragment_to_activityLogin)
                }
                is Results.Error -> {
                    alertDialog?.dismiss()
                    checkErrorsScreen(context = requireContext(), error = it.error.asUiText().asString(requireContext()))
                }
                is Results.Loading -> {
                    alertDialog?.dismiss()
                    alertDialog = showSendLoadingAlert(requireContext(), getString(R.string.change_password_loading)).apply { show() }
                    changePasswordDialog.dismiss()
                }
            }
        }
    }

    override fun onDestroyView() {
        alertDialog?.cancel()
        super.onDestroyView()
    }

}