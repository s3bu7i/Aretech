package com.example.aretech.ui.activities.menu.task.views.common

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R

@Composable
fun ToolbarForTask(
    title: String,
    isRightButtonHas: List<Int>,
    backPress: () -> Unit,
    rightButtonClick: (Int) -> Unit,
) {
    Card(
        modifier = Modifier
            .wrapContentHeight()
            .fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = colorResource(id = R.color.primary_50)
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        border = BorderStroke(
            0.dp,
            color = colorResource(id = R.color.primary_50),
        ),
        shape = RoundedCornerShape(bottomEnd = 20.dp, bottomStart = 20.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 10.dp)
                .padding(horizontal = 15.dp)
        ) {
            ImageInRoundShapeCard(image = R.drawable.ic_back_24, description = "Task Add") {
                backPress()
            }
            Text(
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 10.dp),
                text = title,
                fontSize = 22.sp,
                fontFamily = FontFamily(Font(R.font.sf_pro_medium, FontWeight.Medium)),
                color = colorResource(id = R.color.grey_scale_900),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                textAlign = TextAlign.Center
            )
            isRightButtonHas.forEachIndexed { index,item->
                ImageInRoundShapeCard(image = item, description = "Tasks Tight Button") {
                    rightButtonClick(index)
                }
            }

        }
    }
}

@Composable
fun ImageInRoundShapeCard(
    size:Int = 36,
    image: Int,
    description: String = "",
    tint: Int = R.color.grey_scale_900,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .padding(start = 5.dp)
            .size(size.dp)
            .clickable {
                onClick()
            },
        colors = CardDefaults.cardColors(
            Color.Transparent
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        border = BorderStroke(
            1.dp,
            color = colorResource(id = R.color.grey_scale_50),
        ),
        shape = RoundedCornerShape(10.dp),
    ) {
        Box(
            Modifier
                .fillMaxSize()
                .clickable {
                    onClick()
                }, contentAlignment = Alignment.Center) {
            Image(
                painter = painterResource(id = image),
                contentDescription = description,
                modifier = Modifier.size(24.dp),
                colorFilter = ColorFilter.tint(color = colorResource(id = tint))
            )
        }
    }
}