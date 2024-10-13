package com.example.aretech.ui.activities.menu.notification.views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.aretech.R
import com.example.aretech.domain.notification.model.NotificationModel


@Composable
fun NotificationCard(
    modifier: Modifier = Modifier,
    titleColor: Int,
    messageColor: Int,
    notification: NotificationModel,
    onNotificationClick: (NotificationModel) -> Unit,
    onNotificationImageClick: (String) -> Unit
) {




    Card(
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 3.dp),
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        colors = CardDefaults.cardColors(containerColor = colorResource(R.color.white)),
        border = BorderStroke(0.dp, colorResource(R.color.white))
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clickable(
                    onClick = { onNotificationClick(notification) },
                    interactionSource = remember { MutableInteractionSource() },
                    indication = rememberRipple(bounded = true),
                )
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                verticalAlignment = Alignment.Top
            ) {
                Column(
                    modifier = Modifier
                        .width(50.dp)
                        .height(55.dp),
                    verticalArrangement = Arrangement.Top, horizontalAlignment = Alignment.Start
                ) {
                    Card(
                        modifier = Modifier
                            .height(45.dp)
                            .width(40.dp),
                        colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.primary_50)),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Box(modifier = Modifier.fillMaxSize().clickable { if (notification.image.isNotBlank()) onNotificationImageClick(notification.image) }, contentAlignment = Alignment.Center) {
                            AsyncImage(
                                model = notification.image,
                                contentDescription = notification.title,
                                error = painterResource(R.drawable.app_logo),
                                modifier = Modifier.size(24.dp),
                                contentScale = ContentScale.FillBounds,)
                        }
                    }
                }

                Column(
                    modifier = Modifier
                        .fillMaxWidth(0.98f)
                        .wrapContentHeight(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .wrapContentHeight(),
                        horizontalArrangement = Arrangement.SpaceAround,
                        verticalAlignment = Alignment.Top
                    ) {

                        Text(
                            maxLines = 3,
                            overflow = TextOverflow.Ellipsis,
                            fontSize = 16.sp,
                            color = colorResource(id = titleColor),
                            fontFamily = FontFamily(
                                Font(
                                    R.font.sf_pro_medium,
                                    FontWeight.Medium
                                )
                            ),
                            text = notification.title,
                            modifier = Modifier
                                .weight(1f)
                                .padding(end = 5.dp),
                        )

                        Text(
                            maxLines = 1,
                            modifier = Modifier,
                            fontSize = 13.sp,
                            color = colorResource(id = messageColor),
                            fontFamily = FontFamily(
                                Font(
                                    R.font.sf_pro_display,
                                    FontWeight.SemiBold
                                )
                            ),
                            text = notification.dateTime
                        )
                    }

                    Text(
                        modifier = Modifier
                            .padding(end = 5.dp, top = 2.dp)
                            .fillMaxWidth(),
                        textAlign = TextAlign.Start,
                        fontSize = 13.sp,
                        color = colorResource(id = R.color.grey_scale_300),
                        fontFamily = FontFamily(Font(R.font.sf_pro_display, FontWeight.Medium)),
                        text = notification.message
                    )
                }
            }
        }
    }
}