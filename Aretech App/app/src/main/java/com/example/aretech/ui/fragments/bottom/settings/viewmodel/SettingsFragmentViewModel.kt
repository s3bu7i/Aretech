package com.example.aretech.ui.fragments.bottom.settings.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aretech.data.retrofit.retrofitmodels.ModelError
import com.example.aretech.data.retrofit.retrofitmodels.notification.response.SimpleSuccessResponseDto
import com.example.aretech.domain.result.DataError
import com.example.aretech.domain.result.Results
import com.example.aretech.domain.settings.usecase.RequestPasswordChangeUseCase
import com.example.aretech.global.SessionManager
import com.example.aretech.ui.fragments.bottom.settings.model.ServiceStopOrNot
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SettingsFragmentViewModel @Inject constructor(
    private val sessionManager: SessionManager,
    private val requestPasswordChangeUseCase: RequestPasswordChangeUseCase,
    ) : ViewModel() {
    val errorMessage = MutableLiveData<ModelError>()
    private var _dataSystemDate = Channel<ServiceStopOrNot?>()
    val dataSystemDate = _dataSystemDate.receiveAsFlow()
    var isPasswordChangePermit = false
    private val _passwordChangeState: Channel<Results<SimpleSuccessResponseDto, DataError>> = Channel()
    var passwordChangeState: Flow<Results<SimpleSuccessResponseDto, DataError>> = _passwordChangeState.receiveAsFlow()
    val exceptionHandler = CoroutineExceptionHandler { _, _ ->
    }


    fun requestChangePassword(oldPassword:String, newPassword:String) {
        viewModelScope.launch {
            requestPasswordChangeUseCase(oldPassword, newPassword).collectLatest {
                when (it) {
                    is Results.Loading -> { _passwordChangeState.send(Results.Loading()) }
                    is Results.Error ->{ _passwordChangeState.send(Results.Error(it.error)) }
                    is Results.Success -> {
                        if (it.data.code == 404) _passwordChangeState.send(Results.Error(DataError.LoginError.PASSWORD_INCORRECT))
                        else _passwordChangeState.send(Results.Success(it.data))
                    }
                }
            }
        }
    }

    fun removeToken() {
        sessionManager.removeToken()
    }
}