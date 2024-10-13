package com.example.aretech.viewmodels

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aretech.data.retrofit.repository.RepositoryLogin
import com.example.aretech.data.retrofit.retrofitmodels.ModelCheckApiKey
import com.example.aretech.data.retrofit.retrofitmodels.ModelError
import com.example.aretech.data.retrofit.retrofitmodels.ModelStandardResponse
import com.example.aretech.domain.result.Results
import com.example.aretech.global.SessionManager
import com.example.aretech.ui.custom_ui_componenets.util.asUiText
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class WelcomePageViewModel @Inject constructor(
    private val repository: RepositoryLogin,
    private val sessionManager: SessionManager,
    @ApplicationContext private val context: Context
) :
    ViewModel() {
    var checkApiKeyRespons: MutableLiveData<ModelStandardResponse>
    var mutableLiveDataToken: MutableLiveData<String>
    var mutableLiveDataCheckToken: MutableLiveData<List<ModelCheckApiKey>>
    var job: Job? = null
    var errorMessage: MutableLiveData<ModelError> = MutableLiveData()

    private val exceptionHandler = CoroutineExceptionHandler { _, exception ->
        Log.e("CoroutineExceptionHandler", "Caught an exception: $exception")
    }

    init {
        mutableLiveDataToken = MutableLiveData()
        mutableLiveDataCheckToken = MutableLiveData()
        checkApiKeyRespons = MutableLiveData()
    }

    fun getObserverLiveDataTokenDao(): MutableLiveData<String> {
        return mutableLiveDataToken
    }

    fun getObserverLiveDataCheckToken(): MutableLiveData<ModelStandardResponse> {
        return checkApiKeyRespons
    }

    fun LoadingTokenData() {
        mutableLiveDataToken.postValue(sessionManager.fetchAuthToken())
    }

    /* fun CheckTokenData(modelCheckApiKey: ModelCheckApiKey) {
         repository.postCheckTokenRepository(modelCheckApiKey)
     }*/

    fun checkTokenData(modelCheckApiKey: ModelCheckApiKey) {
        viewModelScope.launch(exceptionHandler) {
            repository.postCheckTokenRepository(modelCheckApiKey).collectLatest {
                when (it) {
                    is Results.Error -> onErrorOrders(it.error.ordinal.toString(), it.error.name + " : ", it.error.asUiText().asString(context))
                    is Results.Loading -> {}
                    is Results.Success -> checkApiKeyRespons.postValue(it.data)
                }
            }
        }
    }

    private fun onErrorOrders(code: String, message: String, message_error: String) {
        val modelError = if (code == "unknown") {
            if (message.contains("after") || message.contains("timeout")) {
                ModelError("003", message, message_error)
            } else ModelError("002", message, message_error)
        } else {
            ModelError(code, message, message_error)
        }
        errorMessage.postValue(modelError)

    }

    fun saveApiUrl(ip: String, port: String) {
        sessionManager.saveBaseUrl(ip, port)
    }

    fun getIP(): String {
        return sessionManager.fetchBaseIP().toString()
    }

    fun getPORT(): String {
        return sessionManager.fetchBasePORT().toString()
    }


}