package com.example.aretech.viewmodels

import android.content.Context
import android.provider.Settings
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aretech.data.retrofit.repository.RepositoryLogin
import com.example.aretech.data.retrofit.retrofitmodels.ModelError
import com.example.aretech.data.retrofit.retrofitmodels.ModelLogin
import com.example.aretech.data.retrofit.retrofitmodels.ModelLoginResponse
import com.example.aretech.domain.result.Results
import com.example.aretech.global.SessionManager
import com.example.aretech.ui.activities.login.LoginResult
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginPageViewModel @Inject constructor(
    private val repository: RepositoryLogin,
    private val sessionManager: SessionManager,
) :
    ViewModel() {
    var loginResult: MutableLiveData<LoginResult> = MutableLiveData()
    var loginRespons: MutableLiveData<ModelLoginResponse> = MutableLiveData()
    var diffsl: MutableLiveData<Boolean> = MutableLiveData()

    val errorMessage = MutableLiveData<ModelError>()
    private var job: Job? = null
    val loading = MutableLiveData<Boolean>()
    val exceptionHandler = CoroutineExceptionHandler { _, throwable ->
        onError("", "", "Exception handled: ${throwable.localizedMessage}")
    }

    fun getObserverLiveloading(): MutableLiveData<Boolean> {
        return loading
    }

    fun requestLoginData(modelLogin: ModelLogin, requireContext: Context) {
        loading.value = true
        loginResult.value = LoginResult(false,300)
        viewModelScope.launch(exceptionHandler) {
            val deviceId = Settings.Secure.getString(requireContext.contentResolver, Settings.Secure.ANDROID_ID)
            val modelLoginWithDeviceId = modelLogin.copy(deviceid = deviceId.toString())

            repository.postLoginRepository(modelLoginWithDeviceId).collectLatest {
                when (it) {
                    is Results.Success -> {
                        loading.value = false
                        loginRequestSuccess(it.data, modelLogin)
                    }
                    is Results.Error -> {
                        loading.value = false
                        onError(it.error.ordinal.toString(), it.error.name + " : ", it.error.name)
                    }
                    is Results.Loading -> loading.value = it.isLoading
                }
            }
        }
    }

    private fun loginRequestSuccess(responseBody: ModelLoginResponse, modelLogin: ModelLogin) {
        if (responseBody.code == "OK") {
            if (responseBody.apikey != "0") {
                loginRespons.postValue(responseBody)
                Log.i("FirebaseCrash"," Firebase Crashlytics Username -> ${modelLogin.username}")
                sessionManager.saveUsername(modelLogin.username ?: "")
            } else {
                onError("000", "Username or password incorrect", "Login Field")
            }
        } else {
            onError("000", "Username or password incorrect", "Login Field")
        }
    }

    fun onError(code: String, message: String, messageError: String) {
        val modelError = if (code == "unknown") {
            if (message.contains("Unable")) {
                ModelError("006", message, messageError)
            } else if (message.contains("after") || message.contains("timeout")) {
                ModelError("003", message, messageError)
            } else ModelError("002", message, messageError)
        } else {
            ModelError(code, message, messageError)
        }
        errorMessage.postValue(modelError)
        loading.value = false
    }

    override fun onCleared() {
        super.onCleared()
        job?.cancel()
    }


     fun deleteOldUserInfo() {
        deleteTokenData()
        resetDb()
    }


    private fun deleteTokenData() {
        sessionManager.saveAuthToken("0")
    }

    private fun resetDb(){
        viewModelScope.launch(Dispatchers.IO + exceptionHandler) {
        }
    }
}