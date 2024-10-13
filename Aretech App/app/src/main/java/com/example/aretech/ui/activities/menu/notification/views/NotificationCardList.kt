package com.example.aretech.ui.activities.menu.notification.views

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.aretech.domain.notification.model.NotificationModel


@Composable
fun NotificationCardList(
    modifier: Modifier = Modifier,
    titleColor: Int,
    messageColor: Int,
    value: List<NotificationModel>,
    onNotificationClick: (NotificationModel) -> Unit,
    onNotificationImageClick: (String) -> Unit,
) {
    Column(modifier = modifier, verticalArrangement = Arrangement.spacedBy(15.dp)) {
        value.forEach { not ->
            NotificationCard(
                titleColor = titleColor,
                messageColor = messageColor,
                modifier = Modifier
                    .fillMaxWidth()
                    .wrapContentHeight(),
                notification = not,
                onNotificationClick = onNotificationClick,
                onNotificationImageClick = onNotificationImageClick
            )
        }
    }
}