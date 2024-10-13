package com.example.aretech.ui.compose.dialogs

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.task.views.common.ImageInRoundShapeCard


@Composable
fun ToolbarAretech(
    title: String,
    isRightButtonHas: List<Int>,
    isShowClientBar: Boolean = false,
    backPress: (() -> Unit)?,
    rightButtonClick: (Int) -> Unit,
    tintColor: Int = R.color.grey_scale_900
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
        shape = if (!isShowClientBar)RoundedCornerShape(bottomEnd = 20.dp, bottomStart = 20.dp) else RectangleShape
    ) {

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 10.dp)
                .padding(horizontal = 15.dp)
        ) {
            backPress?.let { ImageInRoundShapeCard(image = R.drawable.ic_back_24, description = "Task Add") { it() } }
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
                ImageInRoundShapeCard(image = item, description = "Tasks Tight Button", tint = tintColor) {
                    rightButtonClick(index)
                }
            }

        }
    }
}