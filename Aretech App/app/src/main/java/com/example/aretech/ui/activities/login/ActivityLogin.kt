package com.example.aretech.ui.activities.login


import android.annotation.SuppressLint
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.example.aretech.BuildConfig
import com.example.aretech.R
import com.example.aretech.data.retrofit.retrofitmodels.ModelLogin
import com.example.aretech.databinding.ActivityLoginBinding
import com.example.aretech.global.RetrofitErrorOperation
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.viewmodels.LoginPageViewModel
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class ActivityLogin : BaseFragment<ActivityLoginBinding>() {
    val viewModel : LoginPageViewModel by viewModels()


    private lateinit var retrofitErrorOperation: RetrofitErrorOperation
    private var apiKey = ""

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> ActivityLoginBinding
        get() = ActivityLoginBinding::inflate

    override val bindViews: ActivityLoginBinding.() -> Unit = {
        onCreateComponents()
        onCreate()
        onClick()

    }

    override fun onResume() {
        super.onResume()
        onBackPressed()
    }
    private fun onBackPressed(){
        requireActivity().onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                activity?.moveTaskToBack(true)
                activity?.finish()
            }
        })
    }

    private fun onCreateComponents() {
        retrofitErrorOperation = RetrofitErrorOperation(requireContext())

    }

    @SuppressLint("SetTextI18n")
    private fun onCreate() {
        binding.versionText.text = "Version ${BuildConfig.VERSION_NAME} "
//        viewModel.loginResult.observe(this, Observer {
//            if (it.isSucces) {
//                startLocationService()
        viewModel.loginRespons.observe(this) {
            if (it != null) {
                apiKey = it.apikey
            }
        }
        viewModel.errorMessage.observe(this) {
            if (it != null) {
                Log.d("errorMessage",""+it)
                retrofitErrorOperation.loginErrorResult(it)
            }
        }
        viewModel.diffsl.observe(this) {

        }
        viewModel.getObserverLiveloading().observe(this) {
            if (!it) {
                binding.progressLogin.visibility = View.GONE
                binding.btnLogin.visibility = View.VISIBLE
            }
        }
    }

    private fun onClick() {
        binding.btnLogin.setOnClickListener {
            findNavController().navigate(R.id.action_activityLogin_to_homeFragment)
            binding.progressLogin.visibility = View.VISIBLE
            binding.btnLogin.visibility = View.GONE
            val dt = ModelLogin(
                binding.txtUsername.text.toString(),
                binding.txtPassword.text.toString()
            )
            viewModel.requestLoginData(dt,requireContext())
        }

    }
}