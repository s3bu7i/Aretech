package com.example.aretech.ui.fragments.bottom.report.report_views

import android.content.Context
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R
import com.example.aretech.util.showActivityCloseDialog

@Composable
fun ToolBar(
    context: Context,
    title: String,
    searchIcon:Int,
    popBackStack: () -> Boolean,
    rightButtonClick: () -> Unit,
    searchViewHide: () -> Unit,
    rightIcon: Int = R.drawable.ic_filter,
    cardRound:Dp = 0.dp,
    titleSize: Int = 16
) {
    Card(
        modifier = Modifier
            .height(80.dp)
            .fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = colorResource(id = R.color.primary_50)
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        border = BorderStroke(
            0.dp,
            color = colorResource(id = R.color.primary_50),
        ),
        shape = RoundedCornerShape(bottomEnd = cardRound, bottomStart = cardRound)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(),
            verticalArrangement = Arrangement.Bottom
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 20.dp, end = 25.dp, start = 25.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Card(
                    modifier = Modifier
                        .size(35.dp)
                        .border(
                            width = 1.dp,
                            shape = RoundedCornerShape(10.dp),
                            color = colorResource(id = R.color.grey_scale_50)
                        ),
                    colors = CardDefaults.cardColors(containerColor = Color.Transparent),
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clickable {
                                showActivityCloseDialog(context) {
                                    popBackStack()
                                }
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            painter = painterResource(id = R.drawable.ic_back_24),
                            contentDescription = "Return back",
                            modifier = Modifier
                                .size(24.dp, 24.dp)

                        )
                    }

                }

                Text(
                    modifier = Modifier
                        .weight(1f)
                        .padding(horizontal = 10.dp),
                    text = title,
                    fontSize = titleSize.sp,
                    fontFamily = FontFamily(Font(R.font.sf_pro_medium, FontWeight.Medium)),
                    color = colorResource(id = R.color.grey_scale_900),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    textAlign = TextAlign.Center

                )
                Card(
                    modifier = Modifier
                        .padding(end = 10.dp)
                        .size(35.dp)
                        .border(
                            width = 1.dp,
                            shape = RoundedCornerShape(10.dp),
                            color = colorResource(id = R.color.grey_scale_50)
                        ),
                    colors = CardDefaults.cardColors(containerColor = Color.Transparent),
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clickable {
                                searchViewHide()
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            painter = painterResource(id = searchIcon),
                            contentDescription = "Search Hide",
                            tint = colorResource(id = R.color.grey_scale),
                            modifier = Modifier
                                .size(24.dp, 24.dp)
                        )
                    }

                }
                Card(
                    modifier = Modifier
                        .size(35.dp)
                        .border(
                            width = 1.dp,
                            shape = RoundedCornerShape(10.dp),
                            color = colorResource(id = R.color.grey_scale_50)
                        ),
                    colors = CardDefaults.cardColors(containerColor = Color.Transparent),
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clickable {
                                rightButtonClick()
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            painter = painterResource(id = rightIcon),
                            contentDescription = "Filter",
                            tint = colorResource(id = R.color.grey_scale),
                            modifier = Modifier
                                .size(24.dp, 24.dp)
                        )
                    }

                }
            }


        }
    }

}


