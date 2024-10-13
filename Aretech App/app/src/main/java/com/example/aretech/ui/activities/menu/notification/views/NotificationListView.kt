package com.example.aretech.ui.activities.menu.notification.views


import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R
import com.example.aretech.domain.notification.model.NotificationModel
import com.example.aretech.ui.activities.menu.notification.DateNotificationModel

@ExperimentalLayoutApi
@Composable
fun NotificationListView(
    notifications: List<DateNotificationModel>,
    titleColor: Int,
    messageColor: Int,
    currentDate: String,
    onNotificationClick: (NotificationModel) -> Unit = {},
    onNotificationImageClick: (String) -> Unit
) {

    LazyColumn(
            modifier = Modifier.padding(top = 10.dp)
        ){
            items(notifications){
                Column(modifier = Modifier.padding(horizontal = 10.dp)) {
                    Text(
                        modifier = Modifier.padding(start = 3.dp, bottom = 6.dp),
                        fontFamily = FontFamily(Font(R.font.sf_pro_display, FontWeight.ExtraLight)),
                        fontSize = 13.sp,
                        color = colorResource(id = R.color.grey_scale_500),
                        text = if (it.date == currentDate) stringResource(R.string.today) else it.date
                    )
                    NotificationCardList(
                        titleColor = titleColor,
                        messageColor = messageColor,
                        modifier = Modifier
                            .fillMaxWidth()
                            .wrapContentHeight().padding(bottom = 15.dp),
                        value= it.notifications,
                        onNotificationClick = onNotificationClick,
                        onNotificationImageClick = onNotificationImageClick
                    )
                }
            }

    }
}

