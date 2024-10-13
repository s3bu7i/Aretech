package com.example.aretech.ui.activities.menu.notification.view_model

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.aretech.domain.notification.usecase.GetNotificationUseCase
import com.example.aretech.domain.notification.usecase.PostNotificationReadUseCase
import com.example.aretech.domain.result.Results
import com.example.aretech.ui.activities.menu.notification.DateNotificationModel
import com.example.aretech.ui.activities.menu.notification.state.NotificationPageEvent
import com.example.aretech.ui.activities.menu.notification.state.NotificationPageState
import com.example.aretech.ui.custom_ui_componenets.util.asUiText
import com.example.aretech.util.DateStringFormat
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FragmentNotificationPageViewModel @Inject constructor(
    private val getNotificationsUseCase: GetNotificationUseCase,
    private val postNotificationReadUseCase: PostNotificationReadUseCase,
    private val stringDateFormat: DateStringFormat
) : ViewModel() {

    var state by mutableStateOf(NotificationPageState())
        private set


    private val exceptionHandler = CoroutineExceptionHandler { _, _ -> }

    private fun launchGetNotificationList() {
        viewModelScope.launch(exceptionHandler) {
            getNotificationsUseCase().collect { res ->
                when (res) {
                    is Results.Loading -> state = state.copy(isLoading = true, errorMessage = null)
                    is Results.Error -> state = state.copy(errorMessage = res.error.asUiText(), isLoading = false)
                    is Results.Success -> {
                        var pairListRead = emptyList<DateNotificationModel>()
                        var pairListUnread = emptyList<DateNotificationModel>()
                        val filteredReadData = res.data.filter { it.isRead }
                        val filteredUnreadData = res.data.filter { !it.isRead }
                            filteredReadData.groupBy {
                                it.dateDay
                            }.entries.sortedByDescending { it.key }.forEach{
                                pairListRead += DateNotificationModel(it.key,it.value.sortedByDescending { value -> value.dateTime})
                            }
                            filteredUnreadData.groupBy {
                                it.dateDay
                            }.entries.sortedByDescending { it.key }.forEach{
                                pairListUnread += DateNotificationModel(it.key,it.value.sortedByDescending { value -> value.dateTime})
                            }

                        state = state.copy(
                            isLoading = false,
                            errorMessage = null,
                            notificationReadDateAndNotifications = pairListRead,
                            notificationUnreadDateAndNotifications = pairListUnread
                        )
                    }
                }
            }
        }
    }

    private fun notificationHasBeenRead(notificationId: Int) {
        viewModelScope.launch(Dispatchers.IO+exceptionHandler) {
            postNotificationReadUseCase(notificationId)
        }
    }

    fun onEvent(event: NotificationPageEvent) {
        when(event) {
            is NotificationPageEvent.NotificationReadEvent -> notificationHasBeenRead(notificationId = event.notificationId)
            is NotificationPageEvent.RefreshEvent -> launchGetNotificationList()
        }
    }

    fun getFormattedDate(): String {
        return stringDateFormat.getDateNow()
    }

}
