package com.example.aretech.ui.activities.menu.notification.views

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.Scaffold
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.aretech.R
import com.example.aretech.domain.notification.model.NotificationModel
import com.example.aretech.ui.activities.menu.notification.state.NotificationPageEvent
import com.example.aretech.ui.activities.menu.notification.state.NotificationPageState
import com.example.aretech.ui.activities.menu.notification.util.PAGER
import com.example.aretech.ui.compose.dialogs.CircularProgressBar
import com.example.aretech.ui.compose.dialogs.ToolbarAretech

@OptIn(ExperimentalFoundationApi::class, ExperimentalLayoutApi::class)
@Composable
fun FragmentParentNotificationView(
    state: NotificationPageState,
    backPress: () -> Unit,
    onEvent: (NotificationPageEvent) -> Unit,
    currentDate: String,
    onNotificationClick: (NotificationModel) -> Unit,
    onNotificationImageClick: (String) -> Unit
) {
    val scaffoldState = rememberScaffoldState()
    val scope = rememberCoroutineScope()
    val pagerState = rememberPagerState(
        initialPage = 0
    ) { 2 }


    val titles = listOf(
        stringResource(id = R.string.unread),
        stringResource(id = R.string.read)
    )

    Scaffold(scaffoldState = scaffoldState, topBar = {
        ToolbarAretech(
            stringResource(id = R.string.notifications),
            isRightButtonHas = emptyList(),
            rightButtonClick = { },
            backPress = { backPress() }
        )
    }
    ) { paddingValues ->
        Column(modifier = Modifier
            .fillMaxSize()
            .padding(paddingValues)) {
            if (state.isLoading){
                Column(modifier = Modifier.fillMaxSize(),horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                    CircularProgressBar()
                }
            }
            HorizontalPager(
                state = pagerState,
                beyondBoundsPageCount = 1,
            ) {
                when(pagerState.currentPage){
                    PAGER.NOTIFICATION_UNREAD.ordinal -> {
                        NotificationListView(
                            notifications = state.notificationUnreadDateAndNotifications,
                            titleColor = R.color.grey_scale_900,
                            messageColor = R.color.grey_scale_300,
                            currentDate = currentDate,
                            onNotificationClick = { not ->
                                onEvent(NotificationPageEvent.NotificationReadEvent(not.notificationId))
                                onNotificationClick(not)
                            },
                            onNotificationImageClick = {
                                if (pagerState.currentPage == PAGER.NOTIFICATION_UNREAD.ordinal){
                                    onNotificationImageClick(it)
                                }
                            },
                        )
                    }
                    PAGER.NOTIFICATION_READ.ordinal -> {
                        NotificationListView(
                            notifications = state.notificationReadDateAndNotifications,
                            titleColor = R.color.grey_scale_300,
                            messageColor = R.color.grey_scale_200,
                            currentDate = currentDate,
                            onNotificationClick = { not ->
                                onEvent(NotificationPageEvent.NotificationReadEvent(not.notificationId))
                                onNotificationClick(not)
                            },
                            onNotificationImageClick = {},
                        )
                    }
                }


            }
        }

    }
}

@Preview
@Composable
fun AllTaskViewPreview() {
    FragmentParentNotificationView(
        state = NotificationPageState(),
        backPress = {},
        onEvent = {},
        currentDate = "",
        {},
        {}
    )
}