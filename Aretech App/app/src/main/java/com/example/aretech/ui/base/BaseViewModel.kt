package com.example.aretech.ui.base

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavController
import com.example.aretech.R
import com.example.aretech.util.NetworkResult
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch

abstract class BaseViewModel : ViewModel() {

    private val _uiEventChannel = Channel<UIEvent>(Channel.BUFFERED)
    val uiEventChannel = _uiEventChannel.receiveAsFlow()

    private fun triggerEvent(event: UIEvent) = viewModelScope.launch {
        _uiEventChannel.send(event)
    }

    fun <T: Any> NetworkResult<T>.handleNetworkResult(
        onSuccess: (data: T) -> Unit,
        navController: NavController,
        isLoading : MutableLiveData<Boolean>
    ) {
        when(this){
            is NetworkResult.Empty -> {
                isLoading.value = false
                triggerEvent(UIEvent.Empty("Empty Result"))
            }
            is NetworkResult.Error -> {
                isLoading.value = false
                triggerEvent(UIEvent.Error("Error Result - ${this.message}",0))
            }
            is NetworkResult.Exception -> {
                isLoading.value = false
                triggerEvent(UIEvent.Exception("Exception Result - ${this.message}"))
            }
            is NetworkResult.InternetConnectivityState -> {
                isLoading.value = false
                triggerEvent(UIEvent.InternetConnectivityState("No Internet Result"))
            }
            is NetworkResult.Loading -> {
                isLoading.value = true
            }
            is NetworkResult.Unauthorized -> {
                isLoading.value = false
                triggerEvent(UIEvent.Unauthorized("Unauthorized Result"))
                navController.navigate(R.id.activityLogin)
            }
            is NetworkResult.Success -> {
                isLoading.value = false
                if (this.data != null) {
                    onSuccess(this.data)
                } else {
                    triggerEvent(UIEvent.Error("no data",0))
                }
            }
        }
    }
}
